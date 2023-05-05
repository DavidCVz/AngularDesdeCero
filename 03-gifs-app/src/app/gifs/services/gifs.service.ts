import { Gifs } from './../interfaces/gifs.interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  // Lista que almacenara los gifs modelados de la interfaz 'Gifs'
  public gifsList: Gifs[] = [];

  // Valores de busqueda del usuario
  private _tagsHistory: string[] = [];
  // API key del servicio GIPHY
  private apiKey: string = 'tOMQ3NR1uHmrv7kiPTkbO8bcfo5JLs3P';
  // URL del servicio GIPHY
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    // Carga el almacenamiento del historial del navegador en caso de que haya
    this.loadLocalStorage();
  }

  // Retorna el historial de busquedas o inputs del usuario
  get tagsHistory(){
    return [...this._tagsHistory];
  }


  // Mueve la busqueda entrante al inicio del historial
  private organizeHistory(tag: string): void{
    // Convierte a minusculas para determinar si el texto entrante ya ha sido introducido
    tag = tag.toLowerCase();

    // Si la busqueda entrante coincide con una busqueda ya registrada en el historial
    if(this.tagsHistory.includes(tag)){
      // Solo aquellos elementos que no coincidan con la busqueda entrante se incluiran en el historial
      this._tagsHistory = this._tagsHistory.filter( (currentTag) => currentTag !== tag );
    }

    // Inserta busqueda entrante al inicio del historial
    this._tagsHistory.unshift(tag);
    // Se limita unicamente a 10 elementos en el historial para evitar un desbordamiento en la vista
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    // Guarda el historial de busquedas en el almacenamiento local del navegador
    this.saveLocalStorage();
  }

  // Agregar el valor capturado al inicio del historial de busquedas del usuario
  public searchTag(tag: string): void{

    this.organizeHistory(tag);

    // Parametros de tipo HTTP
    const params = new HttpParams()
      .set('api_key', this.apiKey) // Pares de valores: [NombreParametro, Valor]
      .set('limit', '10')
      .set('q', tag);

    // Observable que emite una respuesta de tipo 'SearchResponse'
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe( resp => {

        this.gifsList =  resp.data
        console.log({ gifs: this.gifsList });

      }); // 'subscribe' escucha la respuesta 'resp'

  }

  // Metodo para guardar el historial de busquedas en el almacenamiento local del navegador
  private saveLocalStorage(): void{
    // El objeto con el historial debe de ser serializado a un string
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void{
    if(!localStorage.getItem('history')) { return; }

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if (this._tagsHistory.length === 0) { return }

    this.searchTag(this._tagsHistory[0]);
  }
}
