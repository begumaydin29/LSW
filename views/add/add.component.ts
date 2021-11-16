import { Component, OnInit, Injector } from '@angular/core';
import { RootLayout } from '.pages/@pages/layouts';
import { Tab } from '@app/layout/thyteknik.layout.tab';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent extends RootLayout implements OnInit {

  tabs: Tab[] = [];
  tab: Tab;
  selected = new FormControl(0);
  menuLinks = [];
  componentName = '';

  constructor(injector: Injector) { super(injector); }

  ngOnInit() {

    // this.openAnyPage('app-add-sw', 'Add SoftWare');
    // this.openAnyPage('app-add-hw', 'Add HardWare & ERD');

  }

  // ngAfterContentInit() {
  //   this.selectTab(this.tabs[0]);
  // }

  selectTab(tab: Tab): void {
    //this.tabs.splice(index, 1);


    // deactivate all tabs
    this.tabs.forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;

  }

  openAnyPage(cName: string, hText: string): void {
    //this.removeLastTab();
    this.tab = new Tab();
    this.tab.componentName = cName;
    this.tab.headerText = hText;
    this.tabs.push(this.tab);
  }

  removeLastTab(): void {
    this.tabs.splice(0, 1);
    this.tabs.pop();
  }


}
