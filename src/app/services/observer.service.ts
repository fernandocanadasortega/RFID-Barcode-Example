import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObserverService {

  public anyEmitter = new EventEmitter<any>();

  constructor() { }

}
