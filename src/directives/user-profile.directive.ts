import { initial } from "lodash";
import { Directive } from "../decorators/directive";
import { Input } from "../decorators/input";

@Directive({
    selector: '[user-profile]'
})
export class UserProfileDirective {

    @Input('first-name')
    firstName: string;

    @Input('last-name')
    lastName: string;

    @Input('job')
    job: string;

    template = `
            <h3>{{ firstName }} {{ lastName }}</h3>
            <strong>Poste : </strong> {{ job }}
            <button>Changer le prénom</button>
        `;

    constructor(public element: HTMLElement) { }

    init() {
        this.render()

        this.element.querySelector("button").addEventListener('click', () => {
            this.firstName = "Raph";
            this.render();
        })
    }

    render() {
        let renderedTemplate = this.template;

        this.template.match(/{{.*?}}/g).forEach(interpolation => {
            const propName = interpolation.replace(/{{|}}/g, '').trim();
            renderedTemplate = renderedTemplate.replace(interpolation, this[propName])
        });

        this.element.innerHTML = renderedTemplate;
    }
}