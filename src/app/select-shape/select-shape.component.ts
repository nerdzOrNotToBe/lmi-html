import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducer';
import * as fromUpload from '../reducer/upload';
import {ShapeEngineService} from '../service/shape-engine.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
	selector: 'app-select-shape',
	templateUrl: './select-shape.component.html',
	styleUrls: ['./select-shape.component.css']
})
export class SelectShapeComponent implements OnInit {
	public noeudSelected = '';
	public cheminementSelected = '';
	public cheminements: Observable<any>;
	public noeuds: Observable<any>;
	public isProcess: BehaviorSubject<Boolean>;
	public form: FormGroup;

	constructor(private http: HttpClient, private store: Store<fromRoot.RootState>, private shapeEngine: ShapeEngineService) {
		this.store.select(fromUpload.getUpload).subscribe(msg => {
			if (msg === 'noeud') {
				this.noeuds = this.http.get('http://localhost:8080/shapes/noeud');
			} else {
				this.cheminements = this.http.get('http://localhost:8080/shapes/cheminement');
			}
		});
		this.isProcess = this.shapeEngine.isProcess;
	}

	ngOnInit() {
		this.noeuds = this.http.get('http://localhost:8080/shapes/noeud');
		this.cheminements = this.http.get('http://localhost:8080/shapes/cheminement');
		this.form = new FormGroup({
			'noeud': new FormControl('', Validators.required),
			'cheminement': new FormControl('', Validators.required),
		});
	}

	process() {
		this.shapeEngine.firstStep( this.noeudSelected, this.cheminementSelected);
	}

}
