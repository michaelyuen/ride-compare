import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {
	Geolocation,
	GoogleMap,
	GoogleMapsEvent,
	GoogleMapsLatLng,
	CameraPosition,
	GoogleMapsMarker,
	GoogleMapsMarkerOptions
} from 'ionic-native';

@Component({
	selector: 'home',
	templateUrl: 'home.html',
	animations: [
		trigger('flyInOut', [
			state('in0, in1, in2', style({
				transform: 'translateX(0)'
			})),
			transition('void => in0', [
				style({transform: 'translateX(-200%)'}),
				animate('300ms ease-in')
			]),
			transition('void => in1', [
				style({transform: 'translateX(-200%)'}),
				animate('300ms 200ms ease-in')
			]),
			transition('void => in2', [
				style({transform: 'translateX(-200%)'}),
				animate('300ms 400ms ease-in')
			]),
			transition('in0 => void', [
				animate('300ms 400ms ease-out', style({transform: 'translateX(200%)'}))
			]),
			transition('in1 => void', [
				animate('300ms 200ms ease-out', style({transform: 'translateX(200%)'}))
			]),
			transition('in2 => void', [
				animate('300ms ease-out', style({transform: 'translateX(200%)'}))
			])
		])
	]
})
export class HomeComponent {

	inputFrom = <HTMLInputElement> document.getElementById('autocomplete');

	options = {
		types: [],
		componentRestrictions: {country: 'us'}
	};

	//googlePlaces = new google.maps.places.Autocomplete(this.inputFrom, this.options);
	cards: Array<Object> = [
		{name: 'Uber'},
		{name: 'Lyft'},
		{name: 'Via'}
	];
	uiCards: Array<Object>;

	constructor(
		public navCtrl: NavController,
		public platform: Platform
	) {
		platform.ready().then(() => {

			let map = new GoogleMap('map');

			// listen to MAP_READY event
			map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

			Geolocation.getCurrentPosition()
				.then( (resp) => {

					// create LatLng object
					let michael: GoogleMapsLatLng = new GoogleMapsLatLng( resp.coords.latitude, resp.coords.longitude );

					// create CameraPosition
					let position: CameraPosition = {
						target: michael,
						zoom: 13,
						tilt: 30
					};

					// move the map's camera to position
					map.moveCamera(position);

					// create new marker
					let markerOptions: GoogleMapsMarkerOptions = {
						position: michael,
						icon: 'www/assets/icon/ios7-circle-filled.png'
					};

					map.addMarker(markerOptions)
						.then((marker: GoogleMapsMarker) => {
							marker.setIcon({
								url: 'www/assets/icon/ios7-circle-filled.png',
								size: {
									width: 20,
									height: 20
								}
							})
						});

				})
				.catch( error => console.error(error) );

			// let watch = Geolocation.watchPosition();
			// watch.subscribe(
			//   data => {
			//     this.location.lat = data.coords.latitude;
			//     this.location.long = data.coords.longitude;
			//   },
			//   error => console.error(error)
			// );
		});
	}


	search( event ){

		let value = event.target.value;

		// let place = this.googlePlaces.getPlace();
		// console.log(place);

		this.showCards();
	}


	showCards(){
		this.uiCards = this.cards;
	}

	clearCards(){
		this.uiCards = null;
	}
}
