import { Formatter } from "../services/formatter";
import { Verifier } from "../services/verifier";

export class CreditCardDirective {
    static selector = "[card-number]";

    constructor(public element: HTMLElement, private formatter: Formatter, private verifier: Verifier) { }

    formatCardNumber(element: HTMLInputElement) {
        element.value = this.formatter.formatNumber(element.value, 16, 4, true)
    }

    init() {
        this.element.style.borderColor = "blue";

        this.element.addEventListener('input', (event) => {
            this.formatCardNumber(event.target as HTMLInputElement)
        })
    }
}