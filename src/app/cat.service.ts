import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from  "@angular/common/http";
import { InputService } from './input.service';
import { OutputService } from './output.service';
import { ClearService } from './clear.service';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  
  constructor(
    private inputService:InputService,
    private outputService:OutputService,
    private httpClient:HttpClient,
    private clearService:ClearService
  ) { }
  
  
  private nl2br(txt): any { 
    if(txt) {
      return txt.replace(/\n/g, "<br />");
    }
  }

  public cat(): any {
    let match = this.inputService.handleTarget();
    if(match) {
      if(match.path) {

        // add loading to output
        this.outputService.addOutput({ id: Date.now(), plain: true, text: "<span class='orange'>&nbsp;LOADING...</span>" });

        let fileObservable = this.httpClient
          .get('/assets' + match.path, {responseType: 'text'})
          
          .subscribe(data => {

            // call the clear function 
            this.outputService.addOutput(this.clearService.clear());

            //console.log('response', data);
            this.outputService.addOutput({ id: Date.now(), plain: true, text: "<span class='white'>&nbsp;</span>" });
            this.outputService.addOutput({ id: Date.now(), plain: true, text: "<span class='white'>" + this.nl2br(data) + "</span>" });
            this.outputService.addOutput({ id: Date.now(), plain: true, text: "<span class='white'>&nbsp;</span>" });
          });
      } 
      else {
        this.outputService.addOutput({ id: Date.now(), plain: true, text: "<span class='pink'>Not a readable file.</span>" });  
        //output.output.push({ id: Date.now(), plain: true, text: $sce.trustAsHtml("<span class='pink'>Not a file.</span>") });
      }
    } 
    return false; // return false because there is no explicit output from the cd command
  };
}
