import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {HandsonTableService} from '../service/handsontable.service';
import Handsontable from 'handsontable';
import {ShapeEngineService} from '../service/shape-engine.service';

@Component({
  selector: 'app-cond-chems-table',
  templateUrl: './cond-chems-table.component.html',
  styleUrls: ['./cond-chems-table.component.css']
})
export class CondChemsTableComponent implements OnInit, AfterViewChecked {

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
			{data: 'dm_cd_code', title: 'dm_cd_code'},
			{data: 'dm_cm_code', title: 'dm_cm_code'},
			{data: 'dm_creadat', title: 'dm_creadat'},
			{data: 'dm_majdate', title: 'dm_majdate'},
			{data: 'dm_majsrc', title: 'dm_majsrc'},
			{data: 'dm_abddate', title: 'dm_abddate'},
			{data: 'dm_abdsrc', title: 'dm_abdsrc'},
		]
	};
	isLoading = false;
	data: any[];


	constructor(private shapeEngine: ShapeEngineService, private handsonTableService: HandsonTableService) {
	}

	ngOnInit() {
		this.shapeEngine.result.asObservable().subscribe(x => {
			this.data = x.cond_chems;
			if (this.data !== undefined && this.handsonTableService.cond_chemsTable !== undefined) {
				this.handsonTableService.cond_chemsTable.loadData(this.data);
			}
		});
	}

	ngAfterViewChecked() {
		const hotElement = document.querySelector('#hotTable-condchems');
		if (hotElement !== null) {
			if (this.handsonTableService.cond_chemsTable === undefined) {
				this.handsonTableService.cond_chemsTable = new Handsontable(hotElement, this.settings);
				if (this.data !== undefined && this.handsonTableService.cond_chemsTable !== undefined) {
					this.handsonTableService.cond_chemsTable.loadData(this.data);
				}
			}
		}
	}
}

