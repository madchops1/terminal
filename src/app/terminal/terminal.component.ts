import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Output } from '../output.model';
import { OutputService } from '../output.service';
import { timeout } from 'q';
import { PwdService } from '../pwd.service';
import { TerminalService } from '../terminal.service';

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

  output: Output[] = [];

  hideCarrot: boolean = true;
  originalText: string = '';
  public cloneText: string = '';
  cursorStyle: any = { left: 0 };
  terminal: boolean = false;
  location: string = '';
  pwdString: string = '';
  outputObservable: any = false;
  //background: = cd.defaultBg;
  //var historyPosition = 0;
  //var lastKeyCode = 0;

  constructor(
    private outputService: OutputService, 
    private pwdService: PwdService, 
    private terminalService: TerminalService) {}

  public focus(): any {
    //console.log('FOCUS');
    this.setterElement.nativeElement.focus();
  }
  
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

      this.outputService.addOutput({ human: true, pwdString: '', text: this.originalText });
      let response = this.terminalService.handle(this.originalText);
      
      console.log('response', response);
      if(response) {
        this.outputService.addOutput(response);
      }

      this.originalText = '';
      this.pwdString = this.pwdService.current.join("/");

    }

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

  // Handle keydown, move is for moving the carrot right or left
  public keyDown(e, move): any {
    if(move) {  
      this.submitIt(e);
      //  history(    e);
      this.moveIt(e);
    }
    this.writeIt(e);
  };

  

  
  /*
  
  

  function history(e) {
    e = e || window.event; 
    var keycode = e.keyCode || e.which; 
    if(keycode == 38 || keycode == 40) {

      var history = output.output.filter(function (item) {
        return angular.isDefined(item.human) && item.human == true;
      });

      if(lastKeyCode == 38 || lastKeyCode == 40) {
        if(keycode == 38 && historyPosition < history.length-1) {
          historyPosition++;
        } 
        else if(keycode == 40 && historyPosition > 0) {
          historyPosition--;
        } 
        else {
          historyPosition = 0;
        }
      }

      var historyValue = $sce.getTrustedHtml(history[history.length-1-historyPosition].text);
      vm.originalText = historyValue;
      
      // push to end of input 
      $timeout(function() {
        var a = vm.originalText;
        vm.originalText = '';
        $timeout(function() {
          vm.originalText = a;
        },10); 
      },10);
      
      lastKeyCode = keycode;
    }
  }
  
  
  */
  private initOutput(): any {
    //if(this.outputObservable) {
    //  this.outputObservable.unsubscribe();
    //}
    this.outputObservable = this.outputService.getOutput();
    this.outputObservable.subscribe((outputData: Output[]) => {
      this.output = outputData;
      this.updateScroll();
    });

  }

  ngOnInit() {

    this.initOutput();
    this.focus();
    

  }

}
