import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-cancel-confirm',
  templateUrl: './cancel-confirm.component.html',
  styleUrls: ['./cancel-confirm.component.css']
})
export class CancelConfirmComponent implements OnInit {

  @ViewChild('cancelconfirmModal', { static: false }) modal: ModalDirective;
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
