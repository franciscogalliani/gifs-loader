import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  @Input()
  public width: string = '';

  @Input()
  public height: string = '';

  private hasLoaded: boolean = false;

  ngOnInit(): void {
    if( !this.url ) throw new Error('URL property is rquired');
  }

  onLoad() {
    console.log('Image loaded');
    this.hasLoaded = true;
  }

  get _hasLoaded(): boolean {
    return this.hasLoaded;
  }
}
