import { ListServiceService } from './list-service.service';
import { ItemService } from './item.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FilterPipeModule } from 'ngx-filter-pipe';
import './rxjs-operators';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    FilterPipeModule
  ],
  providers: [ItemService, ListServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
