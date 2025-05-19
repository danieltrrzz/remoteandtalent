import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryScrollComponent } from './components/country-scroll/country-scroll.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CountryScrollComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CountryScrollComponent
  ]
})
export class SharedModule { }
