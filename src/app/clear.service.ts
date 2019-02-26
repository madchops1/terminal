import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClearService {

  constructor() { }

  // The clear function is pretty basic for now it just clears the view of the terminal out with static blank lines.
  public clear: any = function() {
    let clear = [
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"},
      {plain: true, text: "<pre> </pre>"}
    ];
    return clear;
  };
}
