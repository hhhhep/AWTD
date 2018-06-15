/*
import { Component, Input, OnInit } from '@angular/core';

@Component({
    templateUrl : 'app/components/stars/stars.component.html',
    styles : ['.starrating { color: #d17581; }'],
    selector : 'auction-stars'
})
export default class StarsComponent implements OnInit {
    @Input() count : number = 5;
    @Input() rating : number = 0;
    stars : boolean[] = [];

    ngOnInit() {
        for (let i = 1; i <= this.count; i++) {
            this.stars.push(i > this.rating);
        }
    }
}
*/

import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
    selector : 'auction-stars',
    styles : [`.starrating { color : #d17581; }`],
    templateUrl : 'app/components/stars/stars.component.html'
})
export default class StarsComponent {
    private _rating : number;
    private stars : boolean[];
    private maxStars : number = 5;

    @Input()
    readonly : boolean = true;

    @Input()
    get rating() : number {
        return this._rating;
    }
    set rating(value : number) {
        this._rating = value || 0;
        this.stars = Array(this.maxStars).fill(true, 0, this.rating);
    }

    @Output()
    ratingChange : EventEmitter<number> = new EventEmitter();

    fillStarsWithColor(index) {
        if (!this.readonly) {
            this.rating = index + 1;
            this.ratingChange.emit(this.rating);
        }
    }

}