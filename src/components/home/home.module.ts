import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HomeComponent } from './index';
import { HeaderModule } from '../header/index';

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		HeaderModule
	]
})
export class HomeModule {}
