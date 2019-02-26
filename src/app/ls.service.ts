import { Injectable } from '@angular/core';
import { InputService } from './input.service';
import { PwdService } from './pwd.service';
import { DirectoryStructureService } from './directory-structure.service';

@Injectable({
  providedIn: 'root'
})
export class LsService {

  output: any = [];
  target: string = '';
  targetArray: any = [];
  current: any = [];
  combinedTarget: any = [];
  combinedTargetLength: number;

  constructor(private inputService: InputService, private pwdService: PwdService, private directoryStructureService: DirectoryStructureService) { }

  private isArray(data): any {
    return (Object.prototype.toString.call(data) === "[object Array]");  
  }

  private reverseLoop(): any {
    let count = 0;
    for(var i=0; i<this.combinedTarget.length; i++) {
      if(this.combinedTarget[i] == '..') {
        this.combinedTarget.splice(i-1,1);
        this.combinedTarget.splice(i-1,1);
        i=i-1;
        i=i-1;
      }
    }
  };  

  public ls(): any {
    this.output = [];
    
    this.target = "";
    this.targetArray = [];

    if(this.isArray(this.inputService.input)) {
      this.target = this.inputService.input[1].replace(/\/+$/, "");
      this.targetArray = this.target.split("/");
    }

    this.current = this.pwdService.current;
    this.combinedTarget = this.current.concat(this.targetArray);
    
    
    this.reverseLoop();
    this.combinedTargetLength = this.combinedTarget.length;
    this.loop(this.directoryStructureService.directoryStructure, 0);
    return this.output;
  }
  
  private loop(obj, pathKey): any {

    console.log('LOOP', pathKey, this.combinedTarget, this.combinedTargetLength);

    for(var j=0; j<obj.length; j++) {
      if(pathKey == this.combinedTargetLength) {
        
        var output = obj[j].name;
        
        console.log('OBJECT NAME', obj[j].name);
        
        if(obj[j].url) {
          output = "<a href='" + obj[j].url + "' target='_blank'>" + obj[j].name + " -> " + obj[j].url.slice(0,20) + "...</a>";
        } 
        // directory
        else if(obj[j].directory == true) {
          output = "<span class='white'>" + output + "</span>";
        } 
        // file
        else {
          output = "<span class='khaki'>" + output + "</span>";
        }

        if(j==0) {
          this.output.push({ id: Date.now(), plain: true, text: "<span class='orange'>dr-x </span>." });
          this.output.push({ id: Date.now(), plain: true, text: "<span class='orange'>dr-x </span>.." });
        }

        this.output.push({ id: Date.now(), plain: true, text: "<span class='orange'>" + this.permissionString(obj[j]) + "</span>" + output });
      } 
      else if(obj[j].children && obj[j].children.length && (this.combinedTarget[pathKey] == obj[j].name)) {
        this.loop(obj[j].children,pathKey+1);
        break;
      }
    }
  }

  // builds the faux permission string facade
  private permissionString(item): any {

    var permString = "r-";

    if(item.directory == true) {
      permString = "d" + permString;
    } else {
      permString = "-" + permString;
    }

    if(item.path || item.directory) {
      permString = permString + "x ";
    } else {
      permString = permString + "- ";
    }

    return permString;
  }

}
