/**
 * Permet de lier une méthode de la directive à un évènement qui aura lieu sur un element HTML
 * 
 * @param eventName l'évènement auquel on souhaite réagir et lier la méthode
 * @param params Un tableau des paramètres dont on a besoin
 * Exemple:
 * @Hostlistener('click',["event.target"])
 * onclick(target){}
 * 
 * @returns 
 */
export function HostListener(eventName: string, params: (string | number)[] = []) {
    return function (decoratedClass, methodName: string) {
        const originalInitFunction: Function = decoratedClass["init"] || function () { }

        decoratedClass["init"] = function () {
            originalInitFunction.call(this);

            this.element.addEventListener(eventName, (event) => {
                const paramsToSend = params.map(param => eval(param.toString()))

                this[methodName](...paramsToSend);
            });
        }
    }
}