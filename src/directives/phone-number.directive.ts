import { Formatter } from "../services/formatter";

export class PhoneNumberDirective {
    static selector = "[phone-number]";
    static provider = [
        {
            provide: "formatter",
            construct: () => new Formatter("spécifique"),
        }
    ];

    willHaveSpaces = true;
    borderColor = "red";

    constructor(public element: HTMLElement, private formatter: Formatter) { }

    formatPhoneNumber(element: HTMLInputElement) {
        element.value = this.formatter.formatNumber(element.value, 10, 2, this.willHaveSpaces)
    }

    init() {

        if (this.element.hasAttribute('with-spaces')) {
            this.willHaveSpaces = this.element.getAttribute('with-spaces') === "true";
        }
        if (this.element.hasAttribute('border-color')) {
            this.borderColor = this.element.getAttribute('border-color')!;
        }

        this.element.style.borderColor = this.borderColor;

        this.element.addEventListener('input', (event) => {
            this.formatPhoneNumber(event.target as HTMLInputElement)
        })
    }
}