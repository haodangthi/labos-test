import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { CoreModule } from "./core/core.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppRootComponent } from "./app-root/app-root.component";
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,
    EffectsModule
  ],
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent]
})
export class MainModule {}
