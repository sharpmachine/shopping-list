import { ListServiceService } from './list-service.service';
import { ItemService } from './item.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import './rxjs-operators';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [ItemService, ListServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
