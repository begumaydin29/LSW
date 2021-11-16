import {
  Component,
  OnInit,
  ViewChild,
  Injector,
  Output,
  EventEmitter,
  NgZone,
  AfterViewInit,
} from '@angular/core';
import { AirplaneDeleteService } from '@app/lsw/services/airplane-delete/airplane-delete-proxy.service';
import { AirplaneIdByTailNumberProxyService } from '@app/lsw/services/airplaneId-by-tailNumber/airplaneId-by-tailNumber-proxy.service';
import { NotifyService } from 'abp-ng2-module/dist/src/notify/notify.service';
import { ModalDirective } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-delete-sw',
  templateUrl: './app-delete-sw.component.html',
  styleUrls: ['./app-delete-sw.component.css'],
})
export class AppDeleteSwComponent implements OnInit, AfterViewInit {
  @Output() outputMessage: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('confirmDeleteSw', { static: false })
  deleteSwConfirmModal: ModalDirective;
  TailNumber: string;

  constructor(private airplaneDeleteService: AirplaneDeleteService,
    private airplaneIdByTailNumberProxyService: AirplaneIdByTailNumberProxyService,
    private SpinnerService: NgxSpinnerService,
    private Notify: NotifyService) {
  }

  ngOnInit(): void { }
  ngAfterViewInit(): void { }

  close() {
    this.deleteSwConfirmModal.hide();
  }

  show(TailNumber) {

    this.TailNumber = TailNumber;

    this.deleteSwConfirmModal.show();
  }

  async confirmationYes() {

    this.SpinnerService.show();

    const result = await this.airplaneDeleteService.deleteAirplane(this.TailNumber).toPromise();

    if (result.Success) {

      const response = await this.airplaneIdByTailNumberProxyService.getAirplaneInfo().toPromise();
      if (response.Success) {
        this.outputMessage.emit(response.Result);
        this.Notify.success('', 'SUCCESS', { positionClass: 'toast-top-right' });
        this.SpinnerService.hide();
        this.deleteSwConfirmModal.hide();
      } else {
        this.Notify.error('', 'ERROR!!!', { positionClass: 'toast-top-right' });
      }

    }

  }

  confirmationNo() {
    this.deleteSwConfirmModal.hide();
  }
}
