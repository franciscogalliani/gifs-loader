import { Component, Input } from '@angular/core';
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
  public gifs: Gif[] = []

  

}
