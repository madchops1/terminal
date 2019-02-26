import { Injectable } from '@angular/core';
import { InputService } from './input.service';
import { OutputService } from './output.service';
import { PwdService } from './pwd.service';

@Injectable({
  providedIn: 'root'
})
export class CdService {
  
  constructor(
    private inputService:InputService,
    private outputService:OutputService,
    private pwdService:PwdService
  ) { }

  public cd(): any {

    let match = this.inputService.handleTarget();

    console.log('cd()', match);

    if(match) {
      if(match.children) {
        // on a match set the pwd
        this.pwdService.current = this.inputService.combinedTarget;
      } else {
        // not a directory warning
        this.outputService.addOutput({ id: Date.now(), plain: true, text: "<span class='pink'>Not a directory.</span>" });  
      }     
    } 

    return false; // return false because there is no explicit output from the cd command
  }
}
