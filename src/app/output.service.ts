import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Output } from './output.model';

@Injectable({
  providedIn: 'root'
})
export class OutputService {

  // The initial output content
  public output: Output[] = [
    { id: "", human: false, pwdString: "", plain: true, text: '<pre style="margin:0px;"> </pre>'},
    { id: "", human: false, pwdString: "", plain: true, text: '<pre> </pre>'},
    { id: "", human: false, pwdString: "", plain: true, text: '<pre> </pre>'},
    { id: "", human: false, pwdString: "", plain: true, text: '<pre> </pre>'},
    { id: "", human: false, pwdString: "", plain: true, text: '<pre> </pre>'},
    { id: "", human: false, pwdString: "", plain: true, text: '<pre>   _  __          _    _____ _       _ _                         _     _ </pre>'},
    { id: "", human: false, pwdString: "", plain: true, text: '<pre>  | |/ /         | |  / ____| |     | | |                       | |   | |</pre>'},
    { id: "", human: false, pwdString: "", plain: true, text: "<pre>  | ' / __ _ _ __| | | (___ | |_ ___| | |_ ___ _ __  _ __   ___ | |__ | |</pre>"},
    { id: "", human: false, pwdString: "", plain: true, text: "<pre>  |  < / _` | '__| |  \\___ \\| __/ _ \\ | __/ _ \\ '_ \\| '_ \\ / _ \\| '_ \\| |  </pre>"},
    { id: "", human: false, pwdString: "", plain: true, text: "<pre>  | . \\ (_| | |  | |  ____) | ||  __/ | ||  __/ | | | |_) | (_) | | | | |</pre>"},
    { id: "", human: false, pwdString: "", plain: true, text: "<pre>  |_|\\_\\__,_|_|  |_| |_____/ \\__\\___|_|\\__\\___|_| |_| .__/ \\___/|_| |_|_|</pre>"},
    { id: "", human: false, pwdString: "", plain: true, text: '<pre>                                                    | |   TERMINAL v2.0.1</pre>'},
    { id: "", human: false, pwdString: "", plain: true, text: '<pre>                                                    |_|</pre>'},
    { id: "", human: false, pwdString: "", plain: true, text: '<pre> </pre>'},
    { id: "", human: false, pwdString: "", plain: true, text: '<pre> </pre>'},
    { id: "", human: false, pwdString: "", plain: true, text: '<pre> </pre>'},
  ];

  constructor() { }

  public getOutput(): any {
    const outputObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.output);
      }, 1000);
    });

    return outputObservable;
  }

  private isArray(data): any {
      return (Object.prototype.toString.call(data) === "[object Array]");  
  }

  public addOutput(item): any {
    //console.log('isArray',this.isArray(item));
    if(this.isArray(item)) {
      item.forEach(element => {
        this.output.push(element);
      });
    } else {
      this.output.push(item);
    }
  }

  // TODO... make the observable handle clearing out.
  public clearOutput(): any {
    //console.log('CLEAR OUTPUT');
    this.output = [];
  }
  
}
