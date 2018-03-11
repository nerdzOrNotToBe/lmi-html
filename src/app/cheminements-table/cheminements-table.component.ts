import {
	AfterViewChecked, ChangeDetectionStrategy, Component, OnInit
} from '@angular/core';
import {ShapeEngineService} from '../service/shape-engine.service';
import Handsontable from 'handsontable';
import {HandsonTableService} from '../service/handsontable.service';

@Component({
	selector: 'app-cheminements-table',
	templateUrl: './cheminements-table.component.html',
	styleUrls: ['./cheminements-table.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheminementsTableComponent implements OnInit, AfterViewChecked {

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
			{data: 'cm_code', title: 'cm_code'},
			{data: 'cm_codeext', title: 'cm_codeext'},
			{data: 'cm_ndcode1', title: 'cm_ndcode1'},
			{data: 'cm_ndcode2', title: 'cm_ndcode2'},
			{data: 'cm_cm1', title: 'cm_cm1'},
			{data: 'cm_cm2', title: 'cm_cm2'},
			{data: 'cm_r1_code', title: 'cm_r1_code'},
			{data: 'cm_r2_code', title: 'cm_r2_code'},
			{data: 'cm_r3_code', title: 'cm_r3_code'},
			{data: 'cm_r4_code', title: 'cm_r4_code'},
			{data: 'cm_voie', title: 'cm_voie'},
			{data: 'cm_prop_do', title: 'cm_prop_do'},
			{data: 'cm_statut', title: 'cm_statut'},
			{data: 'cm_etat', title: 'cm_etat'},
			{data: 'cm_avct', title: 'cm_avct'},
			{data: 'cm_typelog', title: 'cm_typelog'},
			{data: 'cm_typ_imp', title: 'cm_typ_imp'},
			{data: 'cm_nature', title: 'cm_nature'},
			{data: 'cm_cddispo', title: 'cm_cddispo'},
			{data: 'cm_fo_util', title: 'cm_fo_util'},
			{
				data: 'cm_mod_pos', title: 'cm_mod_pos', type: 'autocomplete',
				strict: false,
				source: ['TRA', 'STU', 'NC', 'MIC', 'MEC', 'FOR', 'FON', 'ENS', 'ENC']
			},
			{
				data: 'cm_passage',
				title: 'cm_passage',
				type: 'autocomplete',
				strict: false,
				source: ['ACC', 'AQU', 'BAL', 'CAN', 'CHAU', 'CYCL', 'EMP', 'NC', 'PAV', 'PON', 'SNC', 'TER', 'TROT']
			},
			{data: 'cm_revet', title: 'cm_revet'},
			{data: 'cm_remblai', title: 'cm_remblai'},
			{data: 'cm_charge', title: 'cm_charge'},
			{data: 'cm_larg', title: 'cm_larg'},
			{data: 'cm_fildtec', title: 'cm_fildtec'},
			{data: 'cm_long', type: 'numeric', numericFormat: {pattern: '0.00'}, title: 'cm_long'},
			{data: 'cm_lgreel', title: 'cm_lgreel'},
			{data: 'cm_comment', title: 'cm_comment'},
			{data: 'cm_dtclass', title: 'cm_dtclass'},
			{data: 'cm_geolqlt', title: 'cm_geolqlt'},
			{data: 'cm_geolmod', title: 'cm_geolmod'},
			{data: 'cm_geolsrc', title: 'cm_geolsrc'},
			{data: 'geom', title: 'geom'},
			{data: 'fx_lmicode', title: 'fx_lmicode'},
			{data: 's_nominale', title: 's_nominale'},
			{data: 'infra_type', title: 'infra_type',
				type: 'autocomplete',
				strict: false,
				source: ['4.7', '8.1', '8.2', '8.3', '8.4', '9.0', '6.0', '5.2', '5.1']
			},
			{data: 'infra_lib', title: 'infra_lib'},
		],
		cells: function (row, col, prop) {
			const cellProperties = {};
            cellProperties['renderer'] = cellNeedValue;

			return cellProperties;
		}
	};
	isLoading = false;
	data: any[];

	constructor(private shapeEngine: ShapeEngineService, private handsonTableService: HandsonTableService) {
	}

	ngOnInit() {
		this.shapeEngine.result.asObservable().subscribe(x => {
			this.data = x.cheminements;
			if (this.data !== undefined  && this.handsonTableService.cheminementsTable !== undefined) {
				this.handsonTableService.cheminementsTable.loadData(this.data);
			}
		});
	}

	ngAfterViewChecked() {
		const hotElement = document.querySelector('#hotTable-chem');
		if (hotElement !== null) {
			if (this.handsonTableService.cheminementsTable === undefined) {
				this.handsonTableService.cheminementsTable = new Handsontable(hotElement, this.settings);
				if (this.data !== undefined  && this.handsonTableService.cheminementsTable !== undefined) {
					this.handsonTableService.cheminementsTable.loadData(this.data);
				}
			}

		}
	}


}

export function cellNeedValue(instance, td, row, col, prop, value, cellProperties) {
	Handsontable.renderers.TextRenderer.apply(this, arguments);

	if (prop === 'cm_mod_pos' || prop === 'cm_passage' || prop === 'cm_revet' || prop === 'cm_remblai' || prop === 'infra_type') {
		td.style.backgroundColor = '#CEC';
	}

}
