import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {HandsonTableService} from '../service/handsontable.service';
import Handsontable from 'handsontable';
import {ShapeEngineService} from '../service/shape-engine.service';

@Component({
	selector: 'app-conduites-table',
	templateUrl: './conduites-table.component.html',
	styleUrls: ['./conduites-table.component.css']
})
export class ConduitesTableComponent implements OnInit, AfterViewChecked {

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
			{data: 'cd_code', title: 'cd_code'},
			{data: 'cd_codeext', title: 'cd_codeext'},
			{data: 'cd_etiquet', title: 'cd_etiquet'},
			{data: 'cd_cd_code', title: 'cd_cd_code'},
			{data: 'cd_r1_code', title: 'cd_r1_code'},
			{data: 'cd_r2_code', title: 'cd_r2_code'},
			{data: 'cd_r3_code', title: 'cd_r3_code'},
			{data: 'cd_r4_code', title: 'cd_r4_code'},
			{data: 'cd_prop', title: 'cd_prop'},
			{data: 'cd_gest', title: 'cd_gest'},
			{data: 'cd_user', title: 'cd_user'},
			{data: 'cd_proptyp', title: 'cd_proptyp'},
			{data: 'cd_statut', title: 'cd_statut'},
			{data: 'cd_etat', title: 'cd_etat'},
			{data: 'cd_dateaig', title: 'cd_dateaig'},
			{data: 'cd_dateman', title: 'cd_dateman'},
			{data: 'cd_datemes', title: 'cd_datemes'},
			{data: 'cd_avct', title: 'cd_avct'},
			{data: 'cd_type', title: 'cd_type'},
			{data: 'cd_dia_int', title: 'cd_dia_int'},
			{data: 'cd_dia_ext', title: 'cd_dia_ext'},
			{data: 'cd_color', title: 'cd_color'},
			{data: 'cd_long', title: 'cd_long'},
			{data: 'cd_nbcable', title: 'cd_nbcable'},
			{data: 'cd_occup', title: 'cd_occup'},
			{data: 'cd_comment', title: 'cd_comment'},
			{data: 'cd_creadat', title: 'cd_creadat'},
			{data: 'cd_majdate', title: 'cd_majdate'},
			{data: 'cd_majsrc', title: 'cd_majsrc'},
			{data: 'cd_abddate', title: 'cd_abddate'},
			{data: 'cd_abdsrc', title: 'cd_abdsrc'},
		]
	};
	isLoading = false;
	data: any[];


	constructor(private shapeEngine: ShapeEngineService, private handsonTableService: HandsonTableService) {
	}

	ngOnInit() {
		this.shapeEngine.result.asObservable().subscribe(x => {
			this.data = x.conduites;
			if (this.data !== undefined && this.handsonTableService.conduitesTable !== undefined) {
				this.handsonTableService.conduitesTable.loadData(this.data);
			}
		});
	}

	ngAfterViewChecked() {
		const hotElement = document.querySelector('#hotTable-conduites');
		if (hotElement !== null) {
			if (this.handsonTableService.conduitesTable === undefined) {
				this.handsonTableService.conduitesTable = new Handsontable(hotElement, this.settings);
				if (this.data !== undefined && this.handsonTableService.conduitesTable !== undefined) {
					this.handsonTableService.conduitesTable.loadData(this.data);
				}
			}
		}
	}
}
