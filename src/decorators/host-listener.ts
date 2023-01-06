export function HostListener(eventName: string, params: (string | number)[] = []) {
    return function (decoratedClass, methodName: string) {
        const originalInitFunction: Function = decoratedClass["init"] || function () { }

        decoratedClass["init"] = function () {
            originalInitFunction.call(this);

            this.element.addEventListener(eventName, (event) => {
                const paramsToSend = params.map(param => eval(param.toString()))
                
                this[methodName](... paramsToSend);
            });
        }
    }
}