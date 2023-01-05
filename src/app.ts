import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Formatter } from "./services/formatter";
import { Verifier } from "./services/verifier";

// FrameWork
const directives = [PhoneNumberDirective, CreditCardDirective];

const services: { name: string; instance: any }[] = [];

const providers = [
    {
        provide: "formatter",
        construct: () => new Formatter('global')
    },
    {
        provide: "verifier",
        construct: () => new Verifier()
    },
];

directives.forEach(directive => {
    const elements = document.querySelectorAll<HTMLElement>(directive.selector);

    elements.forEach(element => {
        const params = analyseDirectiveConstructor(directive, element)
        const directiveInstance = Reflect.construct(directive, params);
        directiveInstance.init();
    });
})

function analyseDirectiveConstructor(directive, element: HTMLElement) {
    const hasConstructor = /constructor\(.*\)/g.test(directive.toString());

    if (!hasConstructor) {
        return [];
    }

    const paramsNames = extractParmasNamesFromDirective(directive)

    const params = paramsNames.map((name) => {
        if (name === "element") {
            return element;
        }

        const directiveProviders = directive.provider || [];

        const directiveProvider = directiveProviders.find((p: { provide: string; }) => p.provide === name)

        if (directiveProvider) {
            const instance = directiveProvider.construct();
            return instance;
        }

        const service = services.find((s) => s.name === name);

        if (service) {
            return service.instance;
        }

        const provider = providers.find((p) => p.provide === name);

        if (!provider) {
            throw new Error("Aucun fournisseur pour le service " + name)
        }

        const instance = provider.construct();

        services.push({
            name: name,
            instance: instance,
        });

        return instance;
    })

    return params;
}

function extractParmasNamesFromDirective(directive) {
    const params = /constructor\((.*)\)/g.exec(directive.toString());

    if (!params) {
        return [];
    }

    return params[1].split(', ');
}