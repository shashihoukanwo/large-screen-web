import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'ls-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
	public timePeriod = 30;
	constructor(
        private route: ActivatedRoute){

    }

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
            let times = params['timePeriod'];
            if (times) {
                this.timePeriod = +times;
            }
        });
	}
	
}