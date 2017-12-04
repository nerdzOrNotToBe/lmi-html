import {AfterViewChecked, Component, OnInit} from '@angular/core';
import Handsontable from 'handsontable';
import {ShapeEngineService} from '../service/shape-engine.service';
import {HandsonTableService} from '../service/handsontable.service';

@Component({
	selector: 'app-adresses-table',
	templateUrl: './adresses-table.component.html',
	styleUrls: ['./adresses-table.component.css']
})
export class AdressesTableComponent implements OnInit, AfterViewChecked {

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
			{data: 'ad_code', title: 'ad_code'},
			{data: 'ad_ban_id', title: 'ad_ban_id'},
			{data: 'ad_nomvoie', title: 'ad_nomvoie'},
			{data: 'ad_fantoir', title: 'ad_fantoir'},
			{data: 'ad_numero', title: 'ad_numero'},
			{data: 'ad_rep', title: 'ad_rep'},
			{data: 'ad_insee', title: 'ad_insee'},
			{data: 'ad_postal', title: 'ad_postal'},
			{data: 'ad_alias', title: 'ad_alias'},
			{data: 'ad_nom_ld', title: 'ad_nom_ld'},
			{data: 'ad_x_ban', title: 'ad_x_ban'},
			{data: 'ad_y_ban', title: 'ad_y_ban'},
			{data: 'ad_commune', title: 'ad_commune'},
			{data: 'ad_section', title: 'ad_section'},
			{data: 'ad_idpar', title: 'ad_idpar'},
			{data: 'ad_x_parc', title: 'ad_x_parc'},
			{data: 'ad_y_parc', title: 'ad_y_parc'},
			{data: 'ad_nat', title: 'ad_nat',
				type: 'autocomplete',
				strict: false,
				source: [true, false]},
			{data: 'ad_nblhab', title: 'ad_nblhab'},
			{data: 'ad_nblpro', title: 'ad_nblpro'},
			{data: 'ad_nbprhab', title: 'ad_nbprhab'},
			{data: 'ad_nbprpro', title: 'ad_nbprpro'},
			{data: 'ad_rivoli', title: 'ad_rivoli'},
			{data: 'ad_hexacle', title: 'ad_hexacle'},
			{data: 'ad_hexaclv', title: 'ad_hexaclv'},
			{data: 'ad_distinf', title: 'ad_distinf'},
			{data: 'ad_isole', title: 'ad_isole'},
			{data: 'ad_prio', title: 'ad_prio'},
			{data: 'ad_racc', title: 'ad_racc'},
			{data: 'ad_batcode', title: 'ad_batcode'},
			{data: 'ad_nombat', title: 'ad_nombat'},
			{data: 'ad_ietat', title: 'ad_ietat'},
			{data: 'ad_itypeim', title: 'ad_itypeim'},
			{data: 'ad_imneuf', title: 'ad_imneuf'},
			{data: 'ad_idatimn', title: 'ad_idatimn'},
			{data: 'ad_prop', title: 'ad_prop'},
			{data: 'ad_gest', title: 'ad_gest'},
			{data: 'ad_idatsgn', title: 'ad_idatsgn'},
			{data: 'ad_iaccgst', title: 'ad_iaccgst'},
			{data: 'ad_idatcab', title: 'ad_idatcab'},
			{data: 'ad_idatcom', title: 'ad_idatcom'},
			{data: 'ad_typzone', title: 'ad_typzone'},
			{data: 'ad_comment', title: 'ad_comment'},
			{data: 'ad_geolqlt', title: 'ad_geolqlt'},
			{data: 'ad_geolmod', title: 'ad_geolmod'},
			{data: 'ad_geolsrc', title: 'ad_geolsrc'},
			{data: 'ad_creadat', title: 'ad_creadat'},
			{data: 'ad_majdate', title: 'ad_majdate'},
			{data: 'ad_majsrc', title: 'ad_majsrc'},
			{data: 'ad_abddate', title: 'ad_abddate'},
			{data: 'ad_abdsrc', title: 'ad_abdsrc'},
			{data: 'geom', title: 'geom'}
		]
	};
	isLoading = false;
	data: any[];

	constructor(private shapeEngine: ShapeEngineService, private handsonTableService: HandsonTableService) {
	}

	ngOnInit() {
		this.shapeEngine.result.asObservable().subscribe(x => {
			this.data = x.adresses;
			if (this.data !== undefined && this.handsonTableService.adressesTable !== undefined) {
				this.handsonTableService.adressesTable.loadData(this.data);
			}
		});
	}

	ngAfterViewChecked() {
		const hotElement = document.querySelector('#hotTable-adresse');
		if (hotElement !== null) {
			if (this.handsonTableService.adressesTable === undefined) {
				this.handsonTableService.adressesTable = new Handsontable(hotElement, this.settings);
				if (this.data !== undefined && this.handsonTableService.adressesTable !== undefined) {
					this.handsonTableService.adressesTable.loadData(this.data);
				}
			}

		}
	}
}
