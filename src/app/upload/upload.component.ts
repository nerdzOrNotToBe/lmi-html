import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from 'app/reducer';
import * as fromUpload from 'app/reducer/upload';

// const URL = '/api/';
const URL = 'http://localhost:8080/upload';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

	@Input() public title: String;
	@Input() public path: String;
	public value = 1;

	constructor(private store: Store<fromRoot.RootState>) {
	}

	ngOnInit() {

	}

	public fileChanged(e: Event) {
		const target: HTMLInputElement = e.target as HTMLInputElement;
		for (let i = 0; i < target.files.length; i++) {
			this.upload(target.files[i]);
		}
	}

	upload(zip: File) {
		const formData: FormData = new FormData();
		formData.append('file', zip, zip.name);

		const xhr = new XMLHttpRequest();
		xhr.upload.addEventListener('progress', (ev: ProgressEvent) => {
			this.value = ev.loaded;
			if (ev.loaded === ev.total) {
				if (this.path === 'noeud') {
					this.store.dispatch(new fromUpload.UploadNoeud());
				} else {
					this.store.dispatch(new fromUpload.UploadCheminement());
				}
			}
		});
		xhr.open('POST', URL + '/' + this.path, true);
		xhr.send(formData);
	}
}
