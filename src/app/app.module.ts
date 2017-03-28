import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material'
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { rootRouterConfig } from './app.routes';
import { RallyQueryComponent } from './rally-query/rally-query.component';
import { RallySettings } from './settings/settings.component';
import { Api } from './shared/api';
import { RallyData } from './shared/rally-data';
import { ExportTable } from './shared/export-table.helper';

@NgModule({
  declarations: [
    AppComponent,
    RallyQueryComponent,
    RallySettings
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    NgxDatatableModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [Api, ExportTable, RallyData],
  bootstrap: [AppComponent]
})
export class AppModule { }
