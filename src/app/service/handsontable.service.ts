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
		// cheminements validation
		const allValid = this.checkFirstProcess(data);
		if (!allValid) {
			this.dialog.open(WarningDialogComponent, {
				data: data
			});
		} else {
			const tmp = {
				cheminements: this.cheminementsTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				noeuds: this.noeudsTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				pts: this.ptsTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				sts: this.stsTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				adresses: this.adressesTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				ebps: this.ebpsTable.getSourceData().filter(obj => !this.isEmpty(obj)),
			};
			this.shapeEngine.secondStep(tmp);
		}
	}

	private checkFirstProcess(data): boolean {
		let allValid = true;
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
		}
		// pt validation
		if (this.ptsTable === undefined) {
			data.pts = 'Vous devez controler les points techniques';
			allValid = false;
		}
		// st validation
		if (this.stsTable === undefined) {
			data.sts = 'Vous devez controler les sites techniques';
			allValid = false;
		}
		// adresses validation
		if (this.adressesTable === undefined) {
			data.adresses = 'Vous devez controler les adresses';
			allValid = false;
		}
		// ebp validation
		if (this.ebpsTable === undefined) {
			data.ebps = 'Vous devez controler les EBPs';
			allValid = false;
		}
		return allValid;
	}

	private checkSecondProcess(data): boolean {
		let allValid = true;
		if (this.conduitesTable === undefined) {
			data.conduites = 'Vous devez controler les conduites';
			allValid = false;
		}
		// noeud validation
		if (this.cond_chemsTable === undefined) {
			data.cond_chems = 'Vous devez controler les cond_chems';
			allValid = false;
		}
		// pt validation
		if (this.cablesTable === undefined) {
			data.cables = 'Vous devez controler les points cables';
			allValid = false;
		}
		// st validation
		if (this.cablelinesTable === undefined) {
			data.cablelines = 'Vous devez controler les cablelines';
			allValid = false;
		}
		// adresses validation
		if (this.cabcondsable === undefined) {
			data.cab_conds = 'Vous devez controler les cables conduites';
			allValid = false;
		}
		return allValid;
	}

	isEmpty(obj): boolean {
		for (const key in obj) {
			if (obj.hasOwnProperty(key) && (obj[key] !== undefined || obj[key] !== null)) {
				return false;
			}
		}
		return true;
	}

	insertInDb() {
		const data = {
			cheminements: '',
			pts: '',
			sts: '',
			adresses: '',
			ebps: '',
			noeuds: '',
			conduites: '',
			cond_chems: '',
			cables: '',
			cablelines: '',
			cab_conds: ''
		};

		let allValid = this.checkFirstProcess(data);
		allValid = this.checkSecondProcess(data);
		if (!allValid) {
			this.dialog.open(WarningDialogComponent, {
				data: data
			});
		} else {
			const tmp = {
				cheminements: this.cheminementsTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				noeuds: this.noeudsTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				pts: this.ptsTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				sts: this.stsTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				adresses: this.adressesTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				ebps: this.ebpsTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				conduites: this.conduitesTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				cond_chems: this.cond_chemsTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				cables: this.cablesTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				cablelines: this.cablelinesTable.getSourceData().filter(obj => !this.isEmpty(obj)),
				cab_conds: this.cabcondsable.getSourceData().filter(obj => !this.isEmpty(obj)),
			};
			this.shapeEngine.insert(tmp);
		}
	}
}
