import { Injectable } from '@angular/core';
import { PwdService } from './pwd.service';
import { OutputService } from './output.service';
import { DirectoryStructureService } from './directory-structure.service';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  public input: any = [];  
  public target: string = "";
  private targetArray: any = [];
  public combinedTarget: any = []; // public because this is used by other services such as cd and pwd to set the current directory position
  private combinedTargetLength: any;
  private current: any = [];
  
  constructor(
    private pwdService: PwdService, 
    private outputService: OutputService,
    private directoryStructureService: DirectoryStructureService
    ) { }
  
  public handleTarget(): any {
    this.target = this.input[1].replace(/\/+$/, ""); // replace last slash

    // start at the base dir, handle root
    if(this.target.substring(0,1) == '/') {
      this.pwdService.current = [];
      this.target = this.target.substring(1,this.target.length);
    }

    this.targetArray = this.target.split("/");

    this.current = this.pwdService.current;

    this.combinedTarget = this.current.concat(this.targetArray);

    this.transverseUp();

    console.log('handleTarget combinedTarget', this.combinedTarget);

    this.combinedTargetLength = this.combinedTarget.length-1;

    return this.transverseDown(this.directoryStructureService.directoryStructure, 0);
    
  }

  // handle ../
  private transverseUp(): any {
    for(var i=0; i<this.combinedTarget.length; i++) {
      if(this.combinedTarget[i] == '..') {
        this.combinedTarget.splice(i-1,1);
        this.combinedTarget.splice(i-1,1);
        i=i-1;
        i=i-1;
      }
    }
  }

  private transverseDown(obj, depth): any {
    //console.log('transverseDown()', depth, obj);

    // handle going back to root
    if(this.combinedTargetLength < 0 || this.combinedTarget[this.combinedTargetLength] == "") { 
      this.pwdService.current = [];
      return false; 
    }

    for(var j=0; j<obj.length; j++) {

      if(depth == this.combinedTargetLength && (obj[j].name == this.target || obj[j].name == this.combinedTarget[this.combinedTargetLength])) {
        // return the matching object
        // if the depth == the combinedTargetLength which tells us we're at the right level in the directoryStructure/Tree
        // && if the name matchs.
        //console.log('transverseDown() match', obj[j]);
        return obj[j];
        break;
      } 
      else if(obj[j].children && obj[j].children.length && (this.combinedTarget[depth] == obj[j].name)) {
        // Go into next directory
        return this.transverseDown(obj[j].children, depth+1);
        break;
      } 
      else if (j == obj.length-1) {
        // Target doesn't exist warning
        this.outputService.addOutput({ id: Date.now(), plain: true, text: "<span class='pink'>Target does not exist.</span>" });  
        return false;
        break;
      }
    }
  }
}
