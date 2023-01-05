import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Angular } from "./framework/framework";
import { Formatter } from "./services/formatter";
import { Verifier } from "./services/verifier";

// Framework
Angular.boostrapApplication({
    declarations: [PhoneNumberDirective, CreditCardDirective],
    providers: [
        {
            provide: "formatter",
            construct: () => new Formatter('global')
        },
        {
            provide: "verifier",
            construct: () => new Verifier()
        },
    ],
})
