import {Component, OnInit} from '@angular/core';
import {ShapeEngineService} from '../service/shape-engine.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	mapOptions = {
		center: {lat:  44.839055845830345, lng: 6.4763527855550755},
		zoom: 15,
		mapTypeId: 'satellite',
		tilt: 45
	};
	public data: BehaviorSubject<any>;
	infoWindow = {
		display: true,
		lat: null,
		lng: null,
		id: ''
	};
	show = new BehaviorSubject(true);
	showIcon = new BehaviorSubject('remove');
	constructor(private shapeEngine: ShapeEngineService) {
	}
	ngOnInit() {
		this.data = this.shapeEngine.result;
		this.shapeEngine.result.asObservable().subscribe(x => console.log(x));
		this.data.subscribe(x => console.log(x));
	}

	clicked({target: infoWindow}, object) {

		this.infoWindow.lat = infoWindow.getPosition().lat();
		this.infoWindow.lng = infoWindow.getPosition().lng();
		this.infoWindow.id = object.id;
		infoWindow.nguiMapComponent.openInfoWindow('iw', infoWindow);
	}
	clickedLine($event, object) {

		this.infoWindow.lat = $event.latLng.lat();
		this.infoWindow.lng = $event.latLng.lng();
		this.infoWindow.id = object.id;
		const infowindow = new google.maps.InfoWindow({
			position: new google.maps.LatLng($event.latLng.lat(), $event.latLng.lng())
		});
		$event.target.nguiMapComponent.openInfoWindow('iw', infowindow);
	}
	toggle() {
		this.show.next(!this.show.getValue());
		if (this.showIcon.getValue() === 'remove') {
			this.showIcon.next('add');
		}else {
			this.showIcon.next('remove');
		}
	}
}


