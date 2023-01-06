import { ChronoDirective } from "./directives/chrono.directive";
import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { UserProfileDirective } from "./directives/user-profile.directive";
import { Angular } from "./framework/framework";
import { Formatter } from "./services/formatter";
import { Verifier } from "./services/verifier";


// Framework

Angular.boostrapApplication({
    declarations: [PhoneNumberDirective, CreditCardDirective, ChronoDirective, UserProfileDirective],
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

