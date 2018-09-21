import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {HandsonTableService} from '../service/handsontable.service';
import Handsontable from 'handsontable';
import {ShapeEngineService} from '../service/shape-engine.service';

@Component({
	selector: 'app-cables-table',
	templateUrl: './cables-table.component.html',
	styleUrls: ['./cables-table.component.css']
})
export class CablesTableComponent implements OnInit, AfterViewChecked {

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
			{data: 'cb_code', title: 'cb_code'},
			{data: 'cb_codeext', title: 'cb_codeext'},
			{data: 'cb_etiquet', title: 'cb_etiquet'},
			{data: 'cb_nd1', title: 'cb_nd1'},
			{data: 'cb_nd2', title: 'cb_nd2'},
			{data: 'cb_r1_code', title: 'cb_r1_code'},
			{data: 'cb_r2_code', title: 'cb_r2_code'},
			{data: 'cb_r3_code', title: 'cb_r3_code'},
			{data: 'cb_r4_code', title: 'cb_r4_code'},
			{data: 'cb_prop', title: 'cb_prop'},
			{data: 'cb_gest', title: 'cb_gest'},
			{data: 'cb_user', title: 'cb_user'},
			{data: 'cb_proptyp', title: 'cb_proptyp'},
			{data: 'cb_statut', title: 'cb_statut'},
			{data: 'cb_etat', title: 'cb_etat'},
			{data: 'cb_dateins', title: 'cb_dateins'},
			{data: 'cb_datemes', title: 'cb_datemes'},
			{data: 'cb_avct', title: 'cb_avct'},
			{data: 'cb_tech', title: 'cb_tech'},
			{data: 'cb_typephy', title: 'cb_typephy'},
			{data: 'cb_typelog', title: 'cb_typelog'},
			{data: 'cb_rf_code', title: 'cb_rf_code'},
			{data: 'cb_capafo', title: 'cb_capafo'},
			{data: 'cb_fo_disp', title: 'cb_fo_disp'},
			{data: 'cb_fo_util', title: 'cb_fo_util'},
			{data: 'cb_modulo', title: 'cb_modulo'},
			{data: 'cb_diam', title: 'cb_diam'},
			{data: 'cb_color', title: 'cb_color'},
			{data: 'cb_lgreel', title: 'cb_lgreel'},
			{data: 'cb_localis', title: 'cb_localis'},
			{data: 'cb_comment', title: 'cb_comment'},
			{data: 'cb_creadat', title: 'cb_creadat'},
			{data: 'cb_majdate', title: 'cb_majdate'},
			{data: 'cb_majsrc', title: 'cb_majsrc'},
			{data: 'cb_abddate', title: 'cb_abddate'},
		]
	};
	isLoading = false;
	data: any[];


	constructor(private shapeEngine: ShapeEngineService, private handsonTableService: HandsonTableService) {
	}

	ngOnInit() {
		this.shapeEngine.result.asObservable().subscribe(x => {
			this.data = x.cables;
			if (this.data !== undefined && this.handsonTableService.cablesTable !== undefined) {
				this.handsonTableService.cablesTable.loadData(this.data);
			}
		});
	}

	ngAfterViewChecked() {
		const hotElement = document.querySelector('#hotTable-cables');
		if (hotElement !== null) {
			if (this.handsonTableService.cablesTable === undefined) {
				this.handsonTableService.cablesTable = new Handsontable(hotElement, this.settings);
				if (this.data !== undefined && this.handsonTableService.cablesTable !== undefined) {
					this.handsonTableService.cablesTable.loadData(this.data);
				}
			}
		}
	}
}
