import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Output } from '../output.model';
import { OutputService } from '../output.service';
import { timeout } from 'q';
import { PwdService } from '../pwd.service';
import { TerminalService } from '../terminal.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TerminalComponent implements OnInit {

  @ViewChild('setter') setterElement: ElementRef;
  @ViewChild('terminalwrapper') terminalElement: ElementRef;
  @ViewChild('terminallist') terminalList: ElementRef;

  output: Output[] = [];            // model for the output
  hideCarrot: boolean = true;       // toggles visibility of the cursor/carrot
  originalText: string = '';        // hidden original input txt
  public cloneText: string = '';    // model for the cloned facade txt
  cursorStyle: any = { left: 0 };   // handles carrot position
  terminal: boolean = false;        // ... maybe can delete
  location: string = '';            // ... maybe can delete
  pwdString: string = '';           // used for the current pwd on the input line
  outputObservable: any = false;    // observable for the output
  lastKeyCode: any = 0;             // track last keycode for history interaction

  constructor(
    private outputService: OutputService, 
    private pwdService: PwdService, 
    private terminalService: TerminalService,
    private historyService: HistoryService) {}

  public focus(): any {
    //console.log('FOCUS');
    this.setterElement.nativeElement.focus();
    this.hideCarrot = false;
  }

  public tabFocus(): any {
    
    /*
    vm.originalText = tab.tab(vm.originalText);
    $timeout(function() {
      var a = vm.originalText;
      vm.originalText = '';
      $timeout(function() {
        vm.originalText = a;
        vm.focusTerminal();
      },10); 
    },10);
    */
  }
  
  public blur(): any {
    this.hideCarrot = true;
    this.focus();
  };
  
  updateScroll(): any {
    //console.log('UPDATE SCROLL');
    this.terminalList.nativeElement.scrollTop = this.terminalList.nativeElement.scrollHeight;
  }

  nl2br(txt): any { 
    if(txt) {
      return txt.replace(/\n/g, "<br />");
    }
  }

  // move the text from the actual hidden input field to the model for the faux input line.
  writeIt(e): any {
    this.cloneText = this.nl2br(this.originalText);
  }
  
  // if moving the carrot left and right
  moveIt(e): any { 
    e = e || window.event;
    let keycode = e.keyCode || e.which;
    let count = this.originalText.length;
    let c = 8;
    //console.log('keycode', keycode);

    // if the key pressed by the user is left 
    // and the position of the cursor is greater than 
    // or equal to 0 - the number of words in the textarea - 1 * 10 then ...
    if(keycode == 37 && parseInt(this.cursorStyle.left) >= (0-((count-1)*c))) { 
      this.cursorStyle.left = parseInt(this.cursorStyle.left) - c + "px";
    } 

    else if(keycode == 38) {
      // go to the beginning TODO
    }

    // otherwise, if the key pressed by the user 
    // if right then check if the position 
    // of the cursor + 10 is smaller than or equal to zero if it is then ...
    else if(keycode == 39 && (parseInt(this.cursorStyle.left) + c) <= 0) { 
      this.cursorStyle.left = parseInt(this.cursorStyle.left) + c + "px"; // move the "fake caret" to the right
    }

    else if(keycode == 40) {
      // go to the end TODO
    }
  }

  submitIt(e): any {
    
    // event handling for IE, bug
    e = e || window.event; 
    let keycode = e.keyCode || e.which; 
    
    // Handle hitting the enter key
    if(keycode == 13 && this.originalText != '') {

      // Push the input into the output
      this.outputService.addOutput({ human: true, pwdString: '', text: this.originalText });
      
      // Handle the input
      let response = this.terminalService.handle(this.originalText);
      
      // Push the response into output
      //console.log('response', response);
      if(response) {
        this.outputService.addOutput(response);
      }

      // Reset the input field
      this.originalText = '';

      // Set the current location
      this.pwdString = this.pwdService.current.join("/");
    
      // These timeouts are necessary to smooth out the experience of loading files 
      // A quick timeout to update the view scroll after loading contents eg. ls output, LOADING..., etc...
      setTimeout(() => {
        this.updateScroll();
      }, 100);

      // A longer timeout to update the view scroll after LOADING is finished eg. cat, etc...
      setTimeout(() => {
        this.updateScroll();
      }, 500);
    }

  }

  // Handle keydown, move is for moving the carrot right or left
  public keyDown(e, move): any {
    if(move) {  
      this.submitIt(e);
      this.history(e);
      this.moveIt(e);
    }
    this.writeIt(e);
  };

  private history(e): any {
    e = e || window.event; // handle ie
    let keycode = e.keyCode || e.which;
  
    // only up and down keys
    if(keycode == 38 || keycode == 40) {
      
      let history = this.historyService.getHistory();

      if(history.length) {

        if(this.lastKeyCode == 38 || this.lastKeyCode == 40) {
          if(keycode == 38 && this.historyService.historyPosition < history.length-1) {
            this.historyService.historyPosition++;
          } 
          else if(keycode == 40 && this.historyService.historyPosition > 0) {
            this.historyService.historyPosition--;
          } 
          else {
            this.historyService.historyPosition = 0;
          }
        }
        
        let historyValue = history[history.length-1-this.historyService.historyPosition].text;
        this.originalText = historyValue;
        
        setTimeout(() => {
          let a = this.originalText;
          this.originalText = '';
          setTimeout(() => {
            this.originalText = a;
          }, 10);
        }, 10);

        this.lastKeyCode = keycode;
      }
    }
  }

  private initOutput(): any {
    
    // Get the output from output
    this.outputObservable = this.outputService.getOutput();
    this.outputObservable.subscribe((outputData: Output[]) => {
      this.output = outputData;
      
      // These updates and timeouts are necessary to smooth out the experience of subscribing to the data if the user navigates away and back... 
      this.updateScroll();

      // A quick timeout to update the view scroll after loading contents eg. ls output, LOADING..., etc...
      setTimeout(() => {
        this.updateScroll();
      }, 100);

      // A longer timeout to update the view scroll after LOADING is finished eg. cat, etc...
      setTimeout(() => {
        this.updateScroll();
      }, 500);
    });
  }

  ngOnInit() {
    this.initOutput();
    this.focus();
  }
}
