import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/host-listener";
import { Formatter } from "../services/formatter";
import { Verifier } from "../services/verifier";

@Directive({
    selector: "[card-number]",
})
export class CreditCardDirective {
    @HostBinding("style.borderColor")
    borderColor = 'blue'

    constructor(
        public element: HTMLElement,
        private formatter: Formatter,
        private verifier: Verifier
    ) { }

    @HostListener('input', ["event.target"])
    formatCardNumber(element: HTMLInputElement) {
        element.value = this.formatter.formatNumber(element.value, 16, 4, true)
    }
}