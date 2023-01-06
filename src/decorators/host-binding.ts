export function HostBinding(attrName: string) {
    return function (decoratedClass, propName: string) {
        const originalInitFunction: Function = decoratedClass["init"] || function () { };
        decoratedClass['init'] = function () {
            originalInitFunction.call(this);

            this.element[attrName] = this[propName];
        }
    }
}
