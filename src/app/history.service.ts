import { Injectable } from '@angular/core';
import { OutputService } from './output.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  public history: any = [];
  public historyPosition: any = 0;

  constructor(private outputService: OutputService) { }

  public getHistory(): any {
    //console.log('getHistory()');
    
    this.history = this.outputService.output.filter(function (item) {
      return item.human && item.human == true;
    });

    console.log('getHistory()', this.history);
    return this.history;
  }


}
