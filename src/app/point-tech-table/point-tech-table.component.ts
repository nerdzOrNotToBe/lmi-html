import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ShapeEngineService} from '../service/shape-engine.service';
import Handsontable from 'handsontable';
import {HandsonTableService} from '../service/handsontable.service';

@Component({
	selector: 'app-point-tech-table',
	templateUrl: './point-tech-table.component.html',
	styleUrls: ['./point-tech-table.component.css']
})
export class PointTechTableComponent implements OnInit, AfterViewChecked {

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
			{data: 'pt_code', title: 'pt_code'},
			{data: 'pt_codeext', title: 'pt_codeext'},
			{data: 'pt_etiquet', title: 'pt_etiquet'},
			{data: 'pt_nd_code', title: 'pt_nd_code'},
			{data: 'pt_ad_code', title: 'pt_ad_code'},
			{data: 'pt_gest_do', title: 'pt_gest_do'},
			{data: 'pt_prop_do', title: 'pt_prop_do'},
			{data: 'pt_prop', title: 'pt_prop'},
			{data: 'pt_gest', title: 'pt_gest'},
			{data: 'pt_user', title: 'pt_user'},
			{data: 'pt_proptyp', title: 'pt_proptyp'},
			{data: 'pt_statut', title: 'pt_statut'},
			{data: 'pt_etat', title: 'pt_etat'},
			{data: 'pt_avct', title: 'pt_avct'},
			{data: 'pt_typephy', title: 'pt_typephy'},
			{data: 'pt_typelog', title: 'pt_typelog'},
			{data: 'pt_rf_code', title: 'pt_rf_code'},
			{data: 'pt_nature', title: 'pt_nature'},
			{data: 'pt_secu', title: 'pt_secu'},
			{data: 'pt_occp', title: 'pt_occp'},
			{data: 'pt_a_dan', title: 'pt_a_dan'},
			{data: 'pt_a_dtetu', title: 'pt_a_dtetu'},
			{data: 'pt_a_struc', title: 'pt_a_struc'},
			{data: 'pt_a_haut', title: 'pt_a_haut'},
			{data: 'pt_a_passa', title: 'pt_a_passa'},
			{data: 'pt_a_strat', title: 'pt_a_strat'},
			{data: 'pt_rotatio', title: 'pt_rotatio'},
			{data: 'pt_detec', title: 'pt_detec'},
			{data: 'pt_comment', title: 'pt_comment'},
		]
	};
	isLoading = false;
	data: any[];
	table: Handsontable;


	constructor(private shapeEngine: ShapeEngineService, private handsonTableService: HandsonTableService) {
	}

	ngOnInit() {
		this.shapeEngine.result.asObservable().subscribe(x => {
			this.data = x.pointsTech;
			if (this.data !== undefined  && this.handsonTableService.ptsTable !== undefined) {
				this.handsonTableService.ptsTable.loadData(this.data);
			}
		});
	}

	ngAfterViewChecked() {
		const hotElement = document.querySelector('#hotTable-pointtech');
		if (hotElement !== null) {
			if (this.handsonTableService.ptsTable === undefined) {
				this.handsonTableService.ptsTable = new Handsontable(hotElement, this.settings);
				if (this.data !== undefined  && this.handsonTableService.ptsTable !== undefined) {
					this.handsonTableService.ptsTable.loadData(this.data);
				}
			}
		}
	}
}
