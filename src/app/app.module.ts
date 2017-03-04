import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomeComponent } from '../components/home/home.component';

@NgModule({
	declarations: [
		MyApp,
		HomeComponent
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomeComponent
	],
	providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
