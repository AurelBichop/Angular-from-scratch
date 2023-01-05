import { CreditCardDirective } from "../directives/credit-card.directive";
import { PhoneNumberDirective } from "../directives/phone-number.directive";


export class FrameWork {
    /** 
     * Array listing all the directives
    */
    directives: any[] = [];
    services: { name: string, instance: any }[] = [];
    providers: { provide: string, construct: Function }[] = [];

    /**
     * Processing to instantiate the directive and attach them 
     * to the html elements
     */
    boostrapApplication(metadata: { providers?: any[], declarations: any[] }) {
        this.providers = metadata.providers || [];
        this.directives = metadata.declarations;

        this.directives.forEach(directive => {
            const elements = document.querySelectorAll<HTMLElement>(directive.selector);

            elements.forEach(element => {
                const params = this.analyseDirectiveConstructor(directive, element)
                const directiveInstance: any = Reflect.construct(directive, params);
                directiveInstance.init();
            });
        })

    }

    /**
     * @param directive 
     * @param element 
     * @returns array parameters 
     */
    private analyseDirectiveConstructor(directive, element: HTMLElement) {
        const hasConstructor = /constructor\(.*\)/g.test(directive.toString());

        if (!hasConstructor) {
            return [];
        }

        const paramsNames = this.extractParmasNamesFromDirective(directive)

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

            const service = this.services.find((s) => s.name === name);

            if (service) {
                return service.instance;
            }

            const provider = this.providers.find((p) => p.provide === name);

            if (!provider) {
                throw new Error("Aucun fournisseur pour le service " + name)
            }

            const instance = provider.construct();

            this.services.push({
                name: name,
                instance: instance,
            });

            return instance;
        })

        return params;
    }

    /**
     * 
     * @param directive 
     * @returns 
     */
    private extractParmasNamesFromDirective(directive) {
        const params = /constructor\((.*)\)/g.exec(directive.toString());

        if (!params) {
            return [];
        }

        return params[1].split(', ');
    }
}

export const Angular = new FrameWork();