import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { GifsListComponent } from './components/gifs-list/gifs-list.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { GifCardComponent } from './components/gif-card/gif-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    GifsListComponent,
    SearchBoxComponent,
    GifCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class GifsModule { }
