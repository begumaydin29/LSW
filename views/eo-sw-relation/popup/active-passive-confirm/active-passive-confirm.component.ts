import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-active-passive-confirm',
  templateUrl: './active-passive-confirm.component.html',
  styleUrls: ['./active-passive-confirm.component.css']
})
export class ActivePassiveConfirmComponent implements OnInit {

  @ViewChild('activepassiveconfirmModal', { static: false }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<boolean> = new EventEmitter();

  selectedRowsCount;

  constructor() { }

  ngOnInit() { }

  close() {
    this.modal.hide();
  }

  show(selectedRowsCount) {
    this.selectedRowsCount = selectedRowsCount;
    this.modal.show();
  }

  confirmationYes() {
    this.modalSave.emit(true);

    this.modal.hide();
  }

  confirmationNo() {
    this.modal.hide();
  }

}
