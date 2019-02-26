import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PwdService {

  public current: any = [];

  public pwd(): any {
      let output = [];
      output.push({ id: Date.now(), plain: true, text: "/" + this.current.join("/") });
      return output;
  }
  
  constructor() { }
}
