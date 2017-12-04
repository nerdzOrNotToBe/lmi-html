import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {
	MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule,
	MatTabsModule,
	MatToolbarModule
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {UploadComponent} from './upload/upload.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SelectShapeComponent} from './select-shape/select-shape.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducer';
import { MapComponent } from './map/map.component';
import {NguiMapModule} from '@ngui/map';
import {ShapeEngineService} from './service/shape-engine.service';
import { NoeudsTableComponent } from './noeuds-table/noeuds-table.component';
import { CheminementsTableComponent } from './cheminements-table/cheminements-table.component';
import { PointTechTableComponent } from './point-tech-table/point-tech-table.component';
import { SiteTechTableComponent } from './site-tech-table/site-tech-table.component';
import { AdressesTableComponent } from './adresses-table/adresses-table.component';
import { EbpTableComponent } from './ebp-table/ebp-table.component';
import {HandsonTableService} from './service/handsontable.service';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { ConduitesTableComponent } from './conduites-table/conduites-table.component';
import { CondChemsTableComponent } from './cond-chems-table/cond-chems-table.component';
import { CablesTableComponent } from './cables-table/cables-table.component';
import { CablelinesTableComponent } from './cablelines-table/cablelines-table.component';
import { CabCondsTableComponent } from './cab-conds-table/cab-conds-table.component';

@NgModule({
	declarations: [
		AppComponent,
		UploadComponent,
		SelectShapeComponent,
		MapComponent,
		NoeudsTableComponent,
		CheminementsTableComponent,
		PointTechTableComponent,
		SiteTechTableComponent,
		AdressesTableComponent,
		EbpTableComponent,
		WarningDialogComponent,
		ConduitesTableComponent,
		CondChemsTableComponent,
		CablesTableComponent,
		CablelinesTableComponent,
		CabCondsTableComponent
	],
	imports: [
		BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule,
		StoreModule.forRoot(reducers),
		AsyncLocalStorageModule,
		FlexLayoutModule,
		MatToolbarModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatTabsModule, MatDialogModule,
		NoopAnimationsModule,
		NguiMapModule.forRoot({
			apiUrl: 'https://maps.google.com/maps/api/js?libraries=visualization,places,drawing'
		})
	],
	entryComponents: [WarningDialogComponent],
	providers: [
		ShapeEngineService, HandsonTableService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
