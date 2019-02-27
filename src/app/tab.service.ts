import { Injectable } from '@angular/core';
import { OutputService } from './output.service';
import { PwdService } from './pwd.service';
import { LsService } from './ls.service';
import { DirectoryStructureService } from './directory-structure.service';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  text: any = "";
  input: string = "";
  command: string = "";
  target: string = "";
  targetArray: any = [];
  combinedTarget: any = [];
  combinedTargetLength: any;
  current: any = [];

  constructor(
    private outputService: OutputService,
    private pwdService: PwdService,
    private lsService: LsService,
    private directoryStructureService: DirectoryStructureService
    ) { }

  public tab(text): any {
    this.text = text;
    
    console.log('tab()', this.text);

    // return "" if there is not text or if it is empty
    if(!this.text || this.text == "") {
      return "";
    }

    // If there is a target then we are looking for a target
    if (this.text.indexOf(" ") > -1) {
      
      // split up the text
      this.input = this.text.split(" ");

      // get the command
      this.command = this.input[0];

      // if there is a target
      if(this.input[1]) {

        this.target = this.input[1];
        
        this.target = this.target.replace(/^\/+/g, '');

        console.log('cat()', this.target);

        // break the target up into array
        this.targetArray = this.target.split("/");

        this.current = this.pwdService.current;
        
        this.combinedTarget = this.current.concat(this.targetArray);

        // handle ../
        this.transverseUp();

        this.combinedTargetLength = this.combinedTarget.length-1;

        console.log('tab()', this.combinedTarget, this.combinedTargetLength);
        
        // Transverse down the tree
        return this.transverseDown(this.directoryStructureService.directoryStructure, 0);
      } 
      // Else handle if there is no target after a command
      else {

        // if no target return original text
        return this.text;
      }
    } 
    // If there is no target then we are looking for a command
    else {
      // TODO tab out of commands...
      console.log('tab command');

      // for now return the original text 
      return this.text;
    }

    //this.input = text;
  }

  private transverseUp(): any {
      var count = 0;
      for(var i=0; i<this.combinedTarget.length; i++) {
          if(this.combinedTarget[i] == '..') {
              this.combinedTarget.splice(i-1,1);
              this.combinedTarget.splice(i-1,1);
              i=i-1;
              i=i-1;
          }
      }
  }

  private transverseDown(obj, pathKey): any {

    var count           = 0;
    var cacheOutput     = [];
    var cacheName       = "";
    var cacheIndex      = 0;
    var cacheType       = "file";

    // loop the the tree
    for(var j=0; j<obj.length; j++) {

      // if were at the right level
      if(pathKey == this.combinedTargetLength) {

        // create the search pattern
        let searchPattern = new RegExp('^' + this.combinedTarget[this.combinedTargetLength]);
        
        console.log('regex target ', this.combinedTarget[this.combinedTargetLength]);
        
        // if it matchess
        if (searchPattern.test(obj[j].name)) {
            console.log('regex match', obj[j].name);
            
            if(obj[j].directory) { cacheType = "directory"; }
            cacheName = obj[j].name;
            cacheIndex = j;
            cacheOutput.push({ id: Date.now(), plain: true, text: "<span class='khaki'>" + obj[j].name + " </span>" });
            count++;
            //break;
        }
      } 
      
      // If the object has children and it matches the name of the item in the combined target at this level
      else if(obj[j].children && obj[j].children.length && (this.combinedTarget[pathKey] == obj[j].name)) {

        return this.transverseDown(obj[j].children,pathKey+1);  
        break;

      }
    }

    console.log('count',count);
    if(count == 1) {

      console.log('tab() combinedTarget', this.combinedTarget, this.combinedTargetLength);

      // remove the last portion of the target after any slashes from the combinedTarget
      this.combinedTarget.splice(this.combinedTargetLength,1);
      
      console.log('tab() new combinedTarget', this.combinedTarget);

      // create a string from the new combined target
      let combinedTargetString = this.combinedTarget.join("/");
      
      // if there is a string from the new combined target then add a slash at the end
      if (combinedTargetString !== "") { combinedTargetString += "/"; }

      console.log('cd(), combinedTargetString', combinedTargetString);

      // add the name of the matched obj to the combinedTargetString
      let output =  this.command + " /" + combinedTargetString + cacheName;

      // add a slash at the end of ttring if it is a directory match
      if(cacheType == "directory") {
        output = output + "/";
      }

      return output;
    } 
    
    else if(count > 1) {
      // TODO
      // handle more than one match  
      // ...

      // for now just return original text until the string gets longer
      return this.text;
      
      //if(pathKey == 1) { 
      //    output.output.push({ human: true, pwdString: pwd.current.join("/"), text: $sce.trustAsHtml(this.text)}); 
      //}
      //output.output = output.output.concat(cacheOutput);
      //this.output = this.text;
    } 
    // if count 0
    else {
      return this.text;
    }
  }
}
