import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import {AsyncLocalStorage} from 'angular-async-local-storage';

@Injectable()
export class ShapeEngineService {

	public isProcess = new BehaviorSubject<Boolean>(false);
	public result = new BehaviorSubject<any>({});
	public isSecondStep = new BehaviorSubject<Boolean>(false);
	public isSaving = new BehaviorSubject<Boolean>(false);

	private token: String;

	constructor(private http: HttpClient, private localStorage: AsyncLocalStorage) {
		this.localStorage.getItem('token').subscribe((token) => {
			if (token === null) {
				this.localStorage.setItem('token', this.uuidv4() ).subscribe(() => {});
			}else {
				this.token = token;
			}

		});
	}

	public firstStep(noeudSelected, cheminementSelected) {
		this.isProcess.next(true);
		this.http.post('http://localhost:8080/shapes/firstStep', {
			'noeud': noeudSelected,
			'cheminement': cheminementSelected,
			'token': this.token
		}).subscribe(result => {
			this.isProcess.next(false);

			this.result.next(result);
		});

	}

	public secondStep(data) {
		this.http.post('http://localhost:8080/shapes/secondStep', {
			'data': data,
			'token': this.token
		}).subscribe(result => {
			this.isProcess.next(false);
			const tmp = this.result.getValue();
			tmp['conduites'] = result['conduites'];
			tmp['cond_chems'] = result['cond_chems'];
			tmp['cables'] = result['cables'];
			tmp['cablelines'] = result['cablelines'];
			tmp['cabconds'] = result['cabconds'];
			this.result.next(tmp);
			this.isSecondStep.next(true);
		});
	}


	uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	insert(data: { cheminements: any[]; noeuds: any[]; pts: any[]; sts: any[]; adresses: any[]; ebps: any[]; conduites: any[]; cond_chems: any[]; cables: any[]; cablelines: any[]; cab_conds: any[] }) {
		this.isSaving.next(true);
		this.http.post('http://localhost:8080/shapes/save', data).subscribe(result => {
			this.isSaving.next(false);
		});

	}
}
