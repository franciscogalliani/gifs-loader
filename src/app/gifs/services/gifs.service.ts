import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList: Gif[] = []

  private _tagsHistory:string[] = [];
  private serviceUrl: string = "https://api.giphy.com/v1/gifs";
  private apiKey: string = environment.giphy_api;

  constructor( private http: HttpClient ) { }

  get tagsHistory():string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag:string ):void{
   if(!this.validateTag(tag) && tag) this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  public loadLocalStorage():void {
    let history = localStorage.getItem('history');
    if(history){
      console.log('localstorage')
      let parsedHistory:string[] = JSON.parse(history);
      this._tagsHistory = parsedHistory;
      this.searchTag(parsedHistory[0])
    }
  }

  async searchTag(tag:string):Promise<void> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 12)
      .set('q', tag);

    this.organizeHistory(tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
    .subscribe( resp => {
      this.gifsList = resp.data;
    })
  }

  private validateTag( tag:string ):boolean {
    let index = this._tagsHistory.indexOf(tag);
    if(index !== -1){
      this._tagsHistory.splice(index, 1);
      this._tagsHistory.unshift(tag);
      return true
    }
    return false
  }
}
