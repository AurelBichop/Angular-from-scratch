import { ChronoDirective } from "./directives/chrono.directive";
import { CounterComponent } from "./directives/counter.component";
import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { UserProfileComponent } from "./directives/user-profile.component";
import { Angular } from "./framework/framework";
import { Formatter } from "./services/formatter";
import { Verifier } from "./services/verifier";


// Framework

Angular.boostrapApplication({
    declarations: [PhoneNumberDirective, CreditCardDirective, ChronoDirective, UserProfileComponent, CounterComponent],
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

