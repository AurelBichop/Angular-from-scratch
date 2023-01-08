/**
 * Permet de récupérer une information dans un attribut de l'élement auquel est rattachée ma directive
 * 
 * @param attrName Attribut dans lequel nous souhaitons récuperer l'information 
 * @returns 
 */
export function Input(attrName: string) {
    return function (decoratedClass, propName: string) {
        const originalInitFunction: Function = decoratedClass["init"] || function () { };

        decoratedClass["init"] = function () {
            console.log(this.element);
            if (this.element.hasAttribute(`[${attrName}]`)) {
                this[propName] = this.element.getAttribute(`[${attrName}]`) === "true";
            }

            if (this.element.hasAttribute(attrName)) {
                this[propName] = this.element.getAttribute(attrName)!;
            }

            originalInitFunction.call(this);
        }
    }
}