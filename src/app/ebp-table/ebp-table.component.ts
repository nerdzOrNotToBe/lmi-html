import {AfterViewChecked, Component, OnInit} from '@angular/core';
import Handsontable from 'handsontable';
import {ShapeEngineService} from '../service/shape-engine.service';
import {HandsonTableService} from '../service/handsontable.service';

@Component({
	selector: 'app-ebp-table',
	templateUrl: './ebp-table.component.html',
	styleUrls: ['./ebp-table.component.css']
})
export class EbpTableComponent implements OnInit, AfterViewChecked {

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
			{data: 'bp_code', title: 'bp_code'},
			{data: 'bp_etiquet', title: 'bp_etiquet'},
			{data: 'bp_codeext', title: 'bp_codeext'},
			{data: 'bp_pt_code', title: 'bp_pt_code'},
			{data: 'bp_lt_code', title: 'bp_lt_code'},
			{data: 'bp_sf_code', title: 'bp_sf_code'},
			{data: 'bp_prop', title: 'bp_prop'},
			{data: 'bp_gest', title: 'bp_gest'},
			{data: 'bp_user', title: 'bp_user'},
			{data: 'bp_proptyp', title: 'bp_proptyp'},
			{data: 'bp_statut', title: 'bp_statut'},
			{data: 'bp_etat', title: 'bp_etat'},
			{data: 'bp_occp', title: 'bp_occp'},
			{data: 'bp_datemes', title: 'bp_datemes'},
			{data: 'bp_avct', title: 'bp_avct'},
			{data: 'bp_typephy', title: 'bp_typephy'},
			{data: 'bp_typelog', title: 'bp_typelog'},
			{data: 'bp_rf_code', title: 'bp_rf_code'},
			{data: 'bp_entrees', title: 'bp_entrees'},
			{data: 'bp_ref_kit', title: 'bp_ref_kit'},
			{data: 'bp_nb_pas', title: 'bp_nb_pas'},
			{data: 'bp_linecod', title: 'bp_linecod'},
			{data: 'bp_oc_code', title: 'bp_oc_code'},
			{data: 'bp_racco', title: 'bp_racco'},
			{data: 'bp_comment', title: 'bp_comment'},
			{data: 'bp_creadat', title: 'bp_creadat'},
			{data: 'bp_majdate', title: 'bp_majdate'},
			{data: 'bp_majsrc', title: 'bp_majsrc'},
			{data: 'bp_abddate', title: 'bp_abddate'},
			{data: 'bp_abdsrc', title: 'bp_abdsrc'},
		]
	};
	isLoading = false;
	data: any[];


	constructor(private shapeEngine: ShapeEngineService,  private handsonTableService: HandsonTableService) {
	}

	ngOnInit() {
		this.shapeEngine.result.asObservable().subscribe(x => {
			this.data = x.ebps;
			if (this.data !== undefined && this.handsonTableService.ebpsTable !== undefined) {
				this.handsonTableService.ebpsTable.loadData(this.data);
			}
		});
	}

	ngAfterViewChecked() {
		const hotElement = document.querySelector('#hotTable-ebp');
		if (hotElement !== null) {
			if (this.handsonTableService.ebpsTable === undefined) {
				this.handsonTableService.ebpsTable = new Handsontable(hotElement, this.settings);
				if (this.data !== undefined && this.handsonTableService.ebpsTable !== undefined) {
					this.handsonTableService.ebpsTable.loadData(this.data);
				}
			}
		}
	}
}
