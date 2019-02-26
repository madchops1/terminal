import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor() { }

  // The help function is very basic as it is just static text output.
  public help: any = function() {
    var help = [
      {plain: true, text: '<pre> </pre>'},
      {plain: true, text: '<pre class="white">  These are some of the commands available to you:</pre>'},
      {plain: true, text: '<pre> </pre>'},
      {plain: true, text: '<pre class="white">  cat [target]           Print file contents to screen.</pre>'},
      {plain: true, text: '<pre class="white">  cd [target]            Change to target directory.</pre>'},
      {plain: true, text: '<pre class="white">  clear                  Clear the terminal.</pre>'},
      {plain: true, text: '<pre class="white">  help                   Help for you ;)</pre>'},
      {plain: true, text: '<pre class="white">  ls [optional target]   List current directory contents.</pre>'},
      {plain: true, text: '<pre class="white">  pwd                    Print working directory.</pre>'},
      {plain: true, text: '<pre> </pre>'}
    ];
    return help;
  }

}
