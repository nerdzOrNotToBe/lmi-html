import {Injectable} from '@angular/core';
import Handsontable from 'handsontable';
import {MatDialog} from '@angular/material';
import {WarningDialogComponent} from '../warning-dialog/warning-dialog.component';
import {ShapeEngineService} from './shape-engine.service';

@Injectable()
export class HandsonTableService {

	public cheminementsTable: Handsontable;
	public noeudsTable: Handsontable;
	public ebpsTable: Handsontable;
	public ptsTable: Handsontable;
	public stsTable: Handsontable;
	public adressesTable: Handsontable;
	public conduitesTable: Handsontable;
	public cond_chemsTable: Handsontable;
	public cablesTable: Handsontable;
	public cablelinesTable: Handsontable;
	public cabcondsable: Handsontable;

	constructor(public dialog: MatDialog, private shapeEngine: ShapeEngineService) {
	}

	public processSecondStep() {
		const data = {
			cheminements: '',
			pts: '',
			sts: '',
			adresses: '',
			ebps: '',
			conduites: '',
			noeuds: ''
		};
		let allValid = true;
		// cheminements validation
		if (this.cheminementsTable === undefined) {
			data.cheminements = 'Vous devez controler les cheminements';
			allValid = false;
		} else {
			const chems = this.cheminementsTable.getSourceData();
			for (const c of chems) {
				if (c.cm_code !== undefined && c.cm_code !== null) {
					if (!c.cm_avct || (c.cm_avct === 'C' && !c.cm_mod_pos)) {
						data.cheminements = 'Vous devez saisir cm_mod_pos pour ' + c.cm_code;
						allValid = false;
						break;
					}
					if (!c.cm_avct || (c.cm_avct === 'C' && !c.cm_passage)) {
						data.cheminements = 'Vous devez saisir cm_passage pour ' + c.cm_code;
						allValid = false;
						break;
					}
				}
			}
		}
		// noeud validation
		if (this.noeudsTable === undefined) {
			data.noeuds = 'Vous devez controler les noeuds';
			allValid = false;
		} else {
			const noeuds = this.noeudsTable.getSourceData();
			for (const n of noeuds) {
				if (n.cm_code !== undefined && n.cm_code !== null) {
					if (!n.cm_avct || (n.cm_avct === 'C' && !n.cm_mod_pos)) {
						data.noeuds = 'Vous devez saisir cm_mod_pos pour ' + n.cm_code;
						allValid = false;
						break;
					}
					if (!n.cm_avct || (n.cm_avct === 'C' && !n.cm_passage)) {
						data.noeuds = 'Vous devez saisir cm_passage pour ' + n.cm_code;
						allValid = false;
						break;
					}
				}
			}
		}
		// pt validation
		if (this.ptsTable === undefined) {
			data.pts = 'Vous devez controler les points techniques';
			allValid = false;
		} else {
			const pts = this.ptsTable.getSourceData();
			for (const pt of pts) {
				if (pt.cm_code !== undefined && pt.cm_code !== null) {
					if (!pt.cm_avct || (pt.cm_avct === 'C' && !pt.cm_mod_pos)) {
						data.pts = 'Vous devez saisir cm_mod_pos pour ' + pt.cm_code;
						allValid = false;
						break;
					}
					if (!pt.cm_avct || (pt.cm_avct === 'C' && !pt.cm_passage)) {
						data.pts = 'Vous devez saisir cm_passage pour ' + pt.cm_code;
						allValid = false;
						break;
					}
				}
			}
		}
		// st validation
		if (this.stsTable === undefined) {
			data.sts = 'Vous devez controler les sites techniques';
			allValid = false;
		} else {
			const sts = this.stsTable.getSourceData();
			for (const st of sts) {
				if (st.cm_code !== undefined && st.cm_code !== null) {
					if (!st.cm_avct || (st.cm_avct === 'C' && !st.cm_mod_pos)) {
						data.sts = 'Vous devez saisir cm_mod_pos pour ' + st.cm_code;
						allValid = false;
						break;
					}
					if (!st.cm_avct || (st.cm_avct === 'C' && !st.cm_passage)) {
						data.sts = 'Vous devez saisir cm_passage pour ' + st.cm_code;
						allValid = false;
						break;
					}
				}
			}
		}
		// adresses validation
		if (this.adressesTable === undefined) {
			data.adresses = 'Vous devez controler les adresses';
			allValid = false;
		} else {
			const adresses = this.adressesTable.getSourceData();
			for (const a of adresses) {
				if (a.cm_code !== undefined && a.cm_code !== null) {
					if (!a.cm_avct || (a.cm_avct === 'C' && !a.cm_mod_pos)) {
						data.adresses = 'Vous devez saisir cm_mod_pos pour ' + a.cm_code;
						allValid = false;
						break;
					}
					if (!a.cm_avct || (a.cm_avct === 'C' && !a.cm_passage)) {
						data.adresses = 'Vous devez saisir cm_passage pour ' + a.cm_code;
						allValid = false;
						break;
					}
				}
			}
		}
		// ebp validation
		if (this.ebpsTable === undefined) {
			data.ebps = 'Vous devez controler les EBPs';
			allValid = false;
		} else {
			const ebps = this.ebpsTable.getSourceData();
			for (const ebp of ebps) {
				if (ebp.cm_code !== undefined && ebp.cm_code !== null) {
					if (!ebp.cm_avct || (ebp.cm_avct === 'C' && !ebp.cm_mod_pos)) {
						data.ebps = 'Vous devez saisir cm_mod_pos pour ' + ebp.cm_code;
						allValid = false;
						break;
					}
					if (!ebp.cm_avct || (ebp.cm_avct === 'C' && !ebp.cm_passage)) {
						data.ebps = 'Vous devez saisir cm_passage pour ' + ebp.cm_code;
						allValid = false;
						break;
					}
				}
			}
		}
		// ebp validation
		// if (this.conduitesTable === undefined) {
		// 	data.conduites = 'Vous devez controler les conduites';
		// 	allValid = false;
		// } else {
		// 	const conduites = this.conduitesTable.getSourceData();
		// 	for (const c of conduites) {
		// 		if (c.cm_code !== undefined && c.cm_code !== null) {
		// 			if (!c.cm_avct || (c.cm_avct === 'C' && !c.cm_mod_pos)) {
		// 				data.conduites = 'Vous devez saisir cm_mod_pos pour ' + c.cm_code;
		// 				allValid = false;
		// 				break;
		// 			}
		// 			if (!c.cm_avct || (c.cm_avct === 'C' && !c.cm_passage)) {
		// 				data.conduites = 'Vous devez saisir cm_passage pour ' + c.cm_code;
		// 				allValid = false;
		// 				break;
		// 			}
		// 		}
		// 	}
		// }
		if (!allValid) {
			this.dialog.open(WarningDialogComponent, {
				data: data
			});
		} else {
			const tmp =  {
				cheminements: this.cheminementsTable.getSourceData().filter(obj => !this.isEmpty(obj) ),
				noeuds: this.noeudsTable.getSourceData().filter(obj => !this.isEmpty(obj) ),
				pts: this.ptsTable.getSourceData().filter(obj => !this.isEmpty(obj) ),
				sts: this.stsTable.getSourceData().filter(obj => !this.isEmpty(obj) ),
				adresses: this.adressesTable.getSourceData().filter(obj => !this.isEmpty(obj) ),
				ebps: this.ebpsTable.getSourceData().filter(obj => !this.isEmpty(obj) ),
			};
			this.shapeEngine.secondStep( tmp);
		}
	}
	isEmpty(obj): boolean {
		for ( const key in obj) {
			if (obj.hasOwnProperty(key) && (obj[key] !== undefined || obj[key] !== null) ) {
				return false;
			}
		}
		return true;
	}
}
