import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'New Device Registration';
  constructor(private dataService: DataService) {
  }
  dataProperty: string = '';
  ngOnInit() {
    this.dataProperty = this.dataService.myData();
  }
}
