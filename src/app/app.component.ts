import {Component} from '@angular/core';
import {ShapeEngineService} from './service/shape-engine.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HandsonTableService} from './service/handsontable.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	public isProcess: BehaviorSubject<Boolean>;
	constructor(public shapeEngine: ShapeEngineService, private handsonTableService: HandsonTableService) {
	}


	process() {
		this.handsonTableService.processSecondStep();
	}
	insert() {
		this.handsonTableService.insertInDb();
	}
}
