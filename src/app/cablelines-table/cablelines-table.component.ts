import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {HandsonTableService} from '../service/handsontable.service';
import Handsontable from 'handsontable';
import {ShapeEngineService} from '../service/shape-engine.service';

@Component({
	selector: 'app-cablelines-table',
	templateUrl: './cablelines-table.component.html',
	styleUrls: ['./cablelines-table.component.css']
})
export class CablelinesTableComponent implements OnInit, AfterViewChecked {

	settings = {
		afterLoadData: (firstLoad) => {
			if (!firstLoad) {
				this.isLoading = false;
			}
		},
		rowHeaders: true,
		colHeaders: true,
		fixedColumnsLeft: 1,
		columns: [
			{data: 'cl_code', title: 'cl_code'},
			{data: 'cl_cb_code', title: 'cl_cb_code'},
			{data: 'cl_long', type: 'numeric', title: 'cl_long'},
			{data: 'cl_comment', title: 'cl_comment'},
			{data: 'cl_dtclass', title: 'cl_dtclass'},
			{data: 'cl_geolqlt', title: 'cl_geolqlt'},
			{data: 'cl_geolmod', title: 'cl_geolmod'},
			{data: 'cl_geolsrc', title: 'cl_geolsrc'},
			{data: 'cl_creadat', title: 'cl_creadat'},
			{data: 'cl_majdate', title: 'cl_majdate'},
			{data: 'cl_majsrc', title: 'cl_majsrc'},
			{data: 'cl_abddate', title: 'cl_abddate'},
			{data: 'cl_abdsrc', title: 'cl_abdsrc'},
			{data: 'geom', title: 'geom'},
		]
	};
	isLoading = false;
	data: any[];


	constructor(private shapeEngine: ShapeEngineService, private handsonTableService: HandsonTableService) {
	}

	ngOnInit() {
		this.shapeEngine.result.asObservable().subscribe(x => {
			this.data = x.cablelines;
			if (this.data !== undefined && this.handsonTableService.cablelinesTable !== undefined) {
				this.handsonTableService.cablelinesTable.loadData(this.data);
			}
		});
	}

	ngAfterViewChecked() {
		const hotElement = document.querySelector('#hotTable-cablelines');
		if (hotElement !== null) {
			if (this.handsonTableService.cablelinesTable === undefined) {
				this.handsonTableService.cablelinesTable = new Handsontable(hotElement, this.settings);
				if (this.data !== undefined && this.handsonTableService.cablelinesTable !== undefined) {
					this.handsonTableService.cablelinesTable.loadData(this.data);
				}
			}
		}
	}
}

