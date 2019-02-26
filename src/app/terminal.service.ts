import { Injectable } from '@angular/core';
import { InputService } from './input.service';
import { PwdService } from './pwd.service';
import { OutputService } from './output.service';
import { LsService } from './ls.service';
import { CdService } from './cd.service';
import { CatService } from './cat.service';
import { ClearService } from './clear.service';
import { HelpService } from './help.service';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  command: string = '';
  flags: any = [];
  target: any = '';
  originalText = '';

  constructor(
    private inputService: InputService, 
    private pwdService: PwdService, 
    private outputService: OutputService,
    private lsService: LsService,
    private cdService: CdService,
    private catService: CatService,
    private clearService: ClearService,
    private helpService: HelpService) { }

  // splits the initial input into command and target, target goes to the input service
  public handle(text): any {
    this.originalText = text;
    
    if (text.indexOf(' ') > -1) {
      let splitStr = text.split(" ");
      this.inputService.input = splitStr;
      this.command = splitStr[0];
    }
    else {
      this.inputService.input = text;
      this.command = text;
    }

    // call the command router
    return this.router();
  }

  // The router routes the available terminal commands to their specific functionality and/or services
  router: any = function() {

    switch(this.command) {
      case "help":
        return this.helpService.help();
        break;

      case "clear":
        return this.clearService.clear();
        break;

      case "ls":
        return this.lsService.ls();
        break; 

      case "cd":
        return this.cdService.cd();
        break;

      case "pwd":
        return this.pwdService.pwd();
        break;

      case "cat":
        return this.catService.cat();
        break;

      default: 
        // Default returns command not found 
        return  [
                  { id: '', human: false, plain: true, text: '<span class="pink">' + this.command + ': command not found</span>' }
                ];
        break;
    }
  }
}
