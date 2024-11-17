import { Component, HostListener, Input } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-list',
  templateUrl: './gifs-list.component.html',
  styleUrl: './gifs-list.component.css'
})
export class GifsListComponent {

  constructor( private gifsService:GifsService ) {
    this.gifsService.loadLocalStorage();
  }

  @Input()
  public gifs: Gif[][] = [];

  private isLoading: boolean = false;
  private page: number = 0;
  private scrollTimeout: any;
  
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout); 
    }
  
    this.scrollTimeout = setTimeout(() => {
      const threshold = 100;
      const position = window.innerHeight + window.scrollY;
      const height = document.documentElement.scrollHeight;
  
      if (position >= height - threshold && !this.isLoading) {
        this.isLoading = true;
        this.page++;
        this.gifsService.searchTag(this.gifsService.tagsHistory[0], this.page).finally(() => {
          this.isLoading = false;
        });
      }
    }, 200); 
  }
  

}
