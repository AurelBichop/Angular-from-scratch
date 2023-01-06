import { CreditCardDirective } from "../directives/credit-card.directive";
import { PhoneNumberDirective } from "../directives/phone-number.directive";
import { Detector } from "./change-detector";
import { Module, ProvidersMetadata, ServicesInstances } from "./type";
import set from "lodash/set";

export class FrameWork {
    /** 
     * Array listing all the directives
    */
    directives: any[] = [];
    services: ServicesInstances = [];
    providers: ProvidersMetadata = [];

    /**
     * Processing to instantiate the directive and attach them 
     * to the html elements
     */
    boostrapApplication(metadata: Module) {
        this.providers = metadata.providers || [];
        this.directives = metadata.declarations;

        this.directives.forEach(directive => {
            const elements = document.querySelectorAll<HTMLElement>(directive.selector);

            elements.forEach(element => {
                const params = this.analyseDirectiveConstructor(directive, element)
                const directiveInstance: any = Reflect.construct(directive, params);

                const proxy = new Proxy(directiveInstance, {
                    set(target, propName: string, value, proxy) {
                        target[propName] = value;

                        if (!target.bindings) {
                            return true;
                        }

                        const bindings = target.bindings.find(b => b.propName === propName);

                        if (!bindings) {
                            return true;
                        }
                        Detector.addBinding(element,bindings.attrName,value)
/* 
                        console.log("on met à jour " + propName.toString() + " avec la valeur " + value);

                        set(target.element, bindings.attrName, value) */
                        return true;
                    }
                })
                proxy.init();
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