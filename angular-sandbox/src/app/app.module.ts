import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { PanelOneComponent } from './components/panel-one/panel-one.component';
import { PanelTwoComponent } from './components/panel-two/panel-two.component';
import { MortgageCalculatorComponent } from './components/mortgage-calculator/mortgage-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelOneComponent,
    PanelTwoComponent,
    MortgageCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
