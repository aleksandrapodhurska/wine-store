import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  constructor() { }

  // set items to localStorage
  set(key: string, data: any):void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch(e) {
      console.log("Error saving to local storage ", e)
    }
  }

  // get items from localStorage

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch(e) {
      console.log("Error getting data from local storage ", e);
      return null;
    }
  }

  // remove items from localStorage

  remove(key: string):void {
    try {
      localStorage.removeItem(key);
    } catch(e) {
      console.log("Error removing data from local storage ", e);
    }
  }
  // clear localStorage

  clear():void {
    try {
      localStorage.clear();
    } catch(e) {
      console.log("Error clearing local storage ", e);
    }
  }
}

