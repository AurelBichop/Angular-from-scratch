import { ChronoDirective } from "./directives/chrono.directive";
import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Angular } from "./framework/framework";
import { ProvidersMetadata } from "./framework/type";
import { NgZone } from "./framework/zone";
import { Formatter } from "./services/formatter";
import { Verifier } from "./services/verifier";


// Framework
NgZone.run(() => {
    Angular.boostrapApplication({
        declarations: [PhoneNumberDirective, CreditCardDirective, ChronoDirective],
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
})
