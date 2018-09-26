import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ShapeEngineService} from '../service/shape-engine.service';
import Handsontable from 'handsontable';
import {HandsonTableService} from '../service/handsontable.service';

@Component({
	selector: 'app-noeuds-table',
	templateUrl: './noeuds-table.component.html',
	styleUrls: ['./noeuds-table.component.css']
})
export class NoeudsTableComponent implements OnInit, AfterViewChecked {

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
			{data: 'nd_code', title: 'nd_code'},
			{data: 'nd_codeext', title: 'nd_codeext'},
			{data: 'nd_nom', title: 'nd_nom'},
			{data: 'nd_coderat', title: 'nd_coderat'},
			{data: 'nd_r1_code', title: 'nd_r1_code'},
			{data: 'nd_r2_code', title: 'nd_r2_code'},
			{data: 'nd_r3_code', title: 'nd_r3_code'},
			{data: 'nd_r4_code', title: 'nd_r4_code'},
			{data: 'nd_voie', title: 'nd_voie'},
			{data: 'nd_type', title: 'nd_type'},
			{data: 'nd_type_ep', title: 'nd_type_ep'},
			{data: 'nd_comment', title: 'nd_comment'},
			{data: 'nd_dtclass', title: 'nd_dtclass'},
			{data: 'nd_geolqlt', title: 'nd_geolqlt'},
			{data: 'nd_geolmod', title: 'nd_geolmod'},
			{data: 'nd_geolsrc', title: 'nd_geolsrc'},
			{data: 'nd_abdsrc', title: 'nd_abdsrc'},
			{data: 'geom', title: 'geom'},
			{data: 'pointBranchement', title: 'pointBranchement'},
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
			this.data = x.noeuds;
			if (this.data !== undefined && this.handsonTableService.noeudsTable !== undefined) {
				this.handsonTableService.noeudsTable.loadData(this.data);
			}
		});
	}
	ngAfterViewChecked() {
		const hotElement = document.querySelector('#hotTable-noeud');
		if (hotElement !== null) {
			if (this.handsonTableService.noeudsTable === undefined) {
				this.handsonTableService.noeudsTable = new Handsontable(hotElement, this.settings);
				if (this.data !== undefined  && this.handsonTableService.noeudsTable !== undefined) {
					this.handsonTableService.noeudsTable.loadData(this.data);
				}
			}
		}
	}
}

export function cellNeedValue(instance, td, row, col, prop, value, cellProperties) {
	Handsontable.renderers.TextRenderer.apply(this, arguments);

	if (prop === 'nd_r4_code' || prop === 'nd_codeext') {
		td.style.backgroundColor = '#CEC';
	}

}
