import { DirectiveMetadata } from "../framework/type";

export function Directive(metadata: DirectiveMetadata) {
    return function (decoratedClass) {
        decoratedClass["selector"] = metadata.selector;
        decoratedClass["providers"] = metadata.providers || [];
        //console.log(decoratedClass);
        return decoratedClass;
    }
}