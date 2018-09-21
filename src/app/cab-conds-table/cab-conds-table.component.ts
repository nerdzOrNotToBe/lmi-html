import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {HandsonTableService} from '../service/handsontable.service';
import Handsontable from 'handsontable';
import {ShapeEngineService} from '../service/shape-engine.service';

@Component({
	selector: 'app-cab-conds-table',
	templateUrl: './cab-conds-table.component.html',
	styleUrls: ['./cab-conds-table.component.css']
})
export class CabCondsTableComponent implements OnInit, AfterViewChecked {

	settings = {
		afterLoadData: (firstLoad) => {
			if (!firstLoad) {
				this.isLoading = false;
			}
		},
		rowHeaders: true,
		colHeaders: true,
		contextMenu: true,
		fixedColumnsLeft: 1,
		columns: [
			{data: 'cc_cb_code', title: 'cc_cb_code'},
			{data: 'cc_cd_code', title: 'cc_cd_code'},
			{data: 'cc_creadat', title: 'cc_creadat'},
			{data: 'cc_majdate', title: 'cc_majdate'},
			{data: 'cc_majsrc', title: 'cc_majsrc'},
			{data: 'cc_abddate', title: 'cc_abddate'},
			{data: 'cc_abdsrc', title: 'cc_abdsrc'},
		]
	};
	isLoading = false;
	data: any[];


	constructor(private shapeEngine: ShapeEngineService, private handsonTableService: HandsonTableService) {
	}

	ngOnInit() {
		this.shapeEngine.result.asObservable().subscribe(x => {
			this.data = x.cabconds;
			if (this.data !== undefined && this.handsonTableService.cabcondsable !== undefined) {
				this.handsonTableService.cabcondsable.loadData(this.data);
			}
		});
	}

	ngAfterViewChecked() {
		const hotElement = document.querySelector('#hotTable-cabcond');
		if (hotElement !== null) {
			if (this.handsonTableService.cabcondsable === undefined) {
				this.handsonTableService.cabcondsable = new Handsontable(hotElement, this.settings);
				if (this.data !== undefined && this.handsonTableService.cabcondsable !== undefined) {
					this.handsonTableService.cabcondsable.loadData(this.data);
				}
			}
		}
	}
}

