import { Component, OnInit, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AddHardwareInsertProxyService } from '@app/lsw/services/addHardware-insert/addHardware-insert-proxy.service';
import { AirplaneIdByTailNumberProxyService } from '@app/lsw/services/airplaneId-by-tailNumber/airplaneId-by-tailNumber-proxy.service';
import { AddHardwareModel } from '@app/lsw/models/addHardware-model';
import { AtaChapterDto } from '@app/lsw/models/ata-chapter-dto';
import { NotifyService } from "abp-ng2-module/dist/src/notify/notify.service";

@Component({
  selector: 'app-add-hw-confirm',
  templateUrl: './add-hw-confirm.component.html',
  styleUrls: ['./add-hw-confirm.component.css']
})
export class AddHwConfirmComponent implements OnInit {

  gridColumnDefs = [];
  gridRowData = [];

  tailNumber: string[];
  tailNumberId: number[];

  erd: string;
  erdDesc: string;
  hwPn: string;
  hwDesc: string;
  ataCh: string;

  notify: NotifyService;

  @Output() outputMessage: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('confirmAddHw', { static: false }) addHwConfirmModal: ModalDirective;

  constructor(injector: Injector, private addHardwareInsertProxyService: AddHardwareInsertProxyService,
    private airplaneIdByTailNumberProxyService: AirplaneIdByTailNumberProxyService) {

    this.notify = injector.get(NotifyService);

    this.gridColumnDefs = [
      {
        headerName: 'ERD', field: 'erd'
      },
      {
        headerName: 'ERD Description', field: 'erdDescription'
      },
      { headerName: 'HW PN', field: 'hwPn' },
      { headerName: 'HW Description', field: 'hwDescription' },
      { headerName: 'ATA Ch.', field: 'ataCh' }
    ];
  }

  ngOnInit() {
  }

  show(tailNumber: string[], erd, erdDesc, hwPn,
    hwDesc, ataCh) {

    this.tailNumber = tailNumber;

    this.erd = erd;
    this.erdDesc = erdDesc;
    this.hwPn = hwPn;
    this.hwDesc = hwDesc;
    this.ataCh = ataCh;

    this.gridRowData = [
      {
        erd: erd, erdDescription: erdDesc, hwPn: hwPn, hwDescription: hwDesc,
        ataCh: ataCh
      }

    ];

    this.addHwConfirmModal.show();
  }

  close() {
    this.addHwConfirmModal.hide();
  }

  cancelConfirm() {
    this.addHwConfirmModal.hide();
  }

  async getAirplaneIdByTailNumber() {

    let airplaneIdResult: number[] = [];

    for (const ac of this.tailNumber) {
      let result = await this.airplaneIdByTailNumberProxyService.getAirplaneIdByTailNumber(ac).toPromise();
      if (result.Success) {
        airplaneIdResult.push(result.Result['Airplane_Id']);
      } else {
        return null;
      }
    }
    return airplaneIdResult;

  }

  getCreatedBy() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.registerId;
  }

  async saveConfirm() {

    let result = await this.getAirplaneIdByTailNumber();

    if (result != null) {
      let createdBy = this.getCreatedBy();
      let addHardwareModel = new AddHardwareModel();
      let ataDtoObj_ = new AtaChapterDto();

      ataDtoObj_.ataChapter = this.ataCh;
      ataDtoObj_.description = "";

      addHardwareModel.createdBy = createdBy;
      addHardwareModel.description = this.hwDesc;
      addHardwareModel.name = this.erdDesc;
      addHardwareModel.partNumber = this.hwPn;
      addHardwareModel.referenceDesignator = this.erd;
      addHardwareModel.airplaneList = result;
      addHardwareModel.ataDtoObj = [];

      addHardwareModel.ataDtoObj.push(ataDtoObj_);

      this.addHardwareInsertProxyService.addHardware(addHardwareModel).subscribe(response => {

        if (response.Result.toString() === 'OK') {
          this.outputMessage.emit(response.Result.toString());

          this.addHwConfirmModal.hide();
          this.notify.success('Saved Successfully', 'Save', { positionClass: 'toast-top-right' });

        } else if (response.Result[0].StatusCode === 'Warning') {

          this.outputMessage.emit(response.Result);

          this.addHwConfirmModal.hide();
          this.notify.error('Error!', 'Save', { positionClass: 'toast-top-right' });
        }
      });
    }

  }
}
