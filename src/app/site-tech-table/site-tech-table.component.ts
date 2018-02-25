import {AfterViewChecked, Component, OnInit} from '@angular/core';
import Handsontable from 'handsontable';
import {ShapeEngineService} from '../service/shape-engine.service';
import {HandsonTableService} from '../service/handsontable.service';

@Component({
	selector: 'app-site-tech-table',
	templateUrl: './site-tech-table.component.html',
	styleUrls: ['./site-tech-table.component.css']
})
export class SiteTechTableComponent implements OnInit, AfterViewChecked {

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
			{data: 'st_code', title: 'st_code'},
			{data: 'st_nd_code', title: 'st_nd_code'},
			{data: 'st_codeext', title: 'st_codeext'},
			{data: 'st_nom', title: 'st_nom'},
			{data: 'st_prop', title: 'st_prop'},
			{data: 'st_gest', title: 'st_gest'},
			{data: 'st_user', title: 'st_user'},
			{data: 'st_proptyp', title: 'st_proptyp'},
			{data: 'st_statut', title: 'st_statut'},
			{data: 'st_etat', title: 'st_etat'},
			{data: 'st_dateins', title: 'st_dateins'},
			{data: 'st_datemes', title: 'st_datemes'},
			{data: 'st_avct', title: 'st_avct'},
			{data: 'st_typephy', title: 'st_typephy'},
			{data: 'st_typelog', title: 'st_typelog'},
			{data: 'st_nblines', title: 'st_nblines'},
			{data: 'st_ad_code', title: 'st_ad_code'},
			{data: 'st_comment', title: 'st_comment'},
			{data: 'st_creadat', title: 'st_creadat'},
			{data: 'st_majdate', title: 'st_majdate'},
			{data: 'st_majsrc', title: 'st_majsrc'},
			{data: 'st_abddate', title: 'st_abddate'},
			{data: 'st_abdsrc', title: 'st_abdsrc'},
			{data: 'fx_lmicode', title: 'fx_lmicode'},
		],
		cells: function (row, col, prop) {
			const cellProperties = {};
			cellProperties['renderer'] = cellNeedValue;

			return cellProperties;
		}
	};
	isLoading = false;
	data: any[];
	table: Handsontable;


	constructor(private shapeEngine: ShapeEngineService, private handsonTableService: HandsonTableService) {
	}

	ngOnInit() {
		this.shapeEngine.result.asObservable().subscribe(x => {
			this.data = x.sitesTech;
			if (this.data !== undefined && this.handsonTableService.stsTable !== undefined) {
				this.handsonTableService.stsTable.loadData(this.data);
			}
		});
	}

	ngAfterViewChecked() {
		const hotElement = document.querySelector('#hotTable-sitetech');
		if (hotElement !== null) {
			if (this.handsonTableService.stsTable === undefined) {
				this.handsonTableService.stsTable = new Handsontable(hotElement, this.settings);
				if (this.data !== undefined  && this.handsonTableService.stsTable !== undefined) {
					this.handsonTableService.stsTable.loadData(this.data);
				}
			}
		}
	}
}


export function cellNeedValue(instance, td, row, col, prop, value, cellProperties) {
	Handsontable.renderers.TextRenderer.apply(this, arguments);

	if (prop === 'st_nblines') {
		td.style.backgroundColor = '#CEC';
	}

}
