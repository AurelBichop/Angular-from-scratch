import { initial } from "lodash";
import { Directive } from "../decorators/directive";
import { Input } from "../decorators/input";
import { Component } from "../decorators/component";

@Component({
    selector: 'user-profile',
    template: `
            <h3 (click)="onClickH3">{{ firstName }} {{ lastName }}</h3>
            <strong>Poste : </strong> {{ job }}
            <button (click)="onClickButton" (dblclick)="onDblClickButton">Changer le Prénom</button>
        `,
})
export class UserProfileComponent {

    @Input('first-name')
    firstName: string;

    @Input('last-name')
    lastName: string;

    @Input('job')
    job: string;

    constructor(public element: HTMLElement) { }

    onClickH3() {
        console.log("Click sur le H3");
    }


    onDblClickButton() {
        this.firstName = "ABY";
    }

    onClickButton() {
        this.firstName = "Raph";
    }

}