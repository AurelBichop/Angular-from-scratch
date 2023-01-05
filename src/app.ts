import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Formatter } from "./services/formatter";
import { Verifier } from "./services/verifier";

// FrameWork
const directives = [PhoneNumberDirective, CreditCardDirective];

const formatter = new Formatter;
const verifier = new Verifier;

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

    const params = paramsNames.map(name => {
        if (name === "element") {
            return element;
        }

        if (name === "formatter") {
            return formatter;
        }

        if (name === "verifier") {
            return verifier;
        }
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