import { Component, OnInit, ViewChild, Injector, SimpleChanges, Input, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AddSoftwareInsertProxyService } from '@app/lsw/services/addSoftware-insert/addSoftware-insert-proxy.service';
import { AddSoftwareInsertModel } from '@app/lsw/models/addSoftware-insert-model';
import { AirplaneIdByTailNumberProxyService } from '@app/lsw/services/airplaneId-by-tailNumber/airplaneId-by-tailNumber-proxy.service';
import { AppComponentBase } from '@shared/app-component-base';
import { EventEmitter } from '@angular/core';
import { ListSoftwareService } from '@app/lsw/services/list-software/list-software.service';

@Component({
  selector: 'app-add-sw-confirm',
  templateUrl: './add-sw-confirm.component.html',
  styleUrls: ['./add-sw-confirm.component.css']
})
export class AddSwConfirmComponent extends AppComponentBase implements OnInit {

  @ViewChild('confirm', { static: false }) addSwConfirmModal: ModalDirective;

  gridColumnDefs = [];
  gridRowData = [];

  acReg: number[] = [];
  erd: string;
  ataCh: string;
  slid: string;
  swPn: string;
  hwPn: string;
  swDescription: string;

  tailNumber: string[];

  @Output() successfulData: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() errorData: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() pNumber: EventEmitter<string> = new EventEmitter<string>();

  succesfulInsertedAirplaneIds: number[] = [];
  errorInsertedAirplaneIds: number[] = [];

  saveConfirmClicked: boolean;

  constructor(injector: Injector, private addSoftwareInsertProxyService: AddSoftwareInsertProxyService,
    private airplaneIdByTailNumberProxyService: AirplaneIdByTailNumberProxyService,
    private listSoftwareService: ListSoftwareService) {

    super(injector);

    this.gridColumnDefs = [
      {
        headerName: 'ERD', field: 'erd'
      },
      {
        headerName: 'ERD Description', field: 'erdDescription'
      },
      { headerName: 'HW PN', field: 'hwPn' },
      { headerName: 'HW Description', field: 'hwDescription' },
      { headerName: 'ATA Ch.', field: 'ataCh' },
      { headerName: 'SLID', field: 'slid' },
      { headerName: 'SW Location Description', field: 'slidDescription' },
      { headerName: 'SW PN', field: 'swPn' },
      { headerName: 'SW description', field: 'swDescription' },
    ];

  }

  ngOnInit() {
  }

  show(tailNumber, erd_: string, erdDescription_: string,
    hwPn_: string, hwDescription_: string, ataCh_: string, slid_: string, slidDescription_: string,
    swPn_: string, swDescription_: string) {

    this.findAirplaneIdByTailNumber(tailNumber);

    this.tailNumber = tailNumber;
    this.erd = erd_;
    this.ataCh = ataCh_;
    this.slid = slid_;
    this.swPn = swPn_;
    this.hwPn = hwPn_;
    this.swDescription = swDescription_;

    this.gridRowData = [
      {
        erd: erd_, erdDescription: erdDescription_, hwPn: hwPn_, hwDescription: hwDescription_,
        ataCh: ataCh_, slid: slid_, slidDescription: slidDescription_, swPn: swPn_, swDescription: swDescription_
      }

    ];

    this.addSwConfirmModal.show();
  }

  close() {
    this.addSwConfirmModal.hide();
  }

  findAirplaneIdByTailNumber(tailNumber: string[]) {

    this.acReg = [];

    tailNumber.forEach(element => {
      this.airplaneIdByTailNumberProxyService.getAirplaneIdByTailNumber(element).subscribe(response => {
        this.acReg.push(response.Result['Airplane_Id']);
      });

    });

  }

  saveConfirm() {

    this.succesfulInsertedAirplaneIds = [];
    this.errorInsertedAirplaneIds = [];

    const addSoftwareInsertModel = new AddSoftwareInsertModel();

    addSoftwareInsertModel.acSeries = 'B787-9';
    addSoftwareInsertModel.acReg = this.acReg;
    addSoftwareInsertModel.erd = this.erd;
    addSoftwareInsertModel.ata = +this.ataCh;
    addSoftwareInsertModel.hwPn = this.hwPn;
    addSoftwareInsertModel.slid = this.slid;
    addSoftwareInsertModel.swPn = this.swPn;
    addSoftwareInsertModel.swDescription = this.swDescription;

    this.addSoftwareInsertProxyService.create(addSoftwareInsertModel).subscribe(response => {

      if (response.Success) {

        const result = response.Result;

        if (result.length > 1) {
          const partNumber = result[1].substr(result[1].indexOf(',') + 1);
          this.pNumber.emit(partNumber);
        }



        for (let index = 0; index < result.length; index = index + 2) {
          const res = result[index].substr(result[index].indexOf(',') + 1);

          if (res === '0') {
            this.succesfulInsertedAirplaneIds.push(result[index].substr(0, result[index].indexOf(',')));
          } else {
            this.errorInsertedAirplaneIds.push(result[index].substr(0, result[index].indexOf(',')));
          }
        }

        this.successfulData.emit(this.succesfulInsertedAirplaneIds);
        this.errorData.emit(this.errorInsertedAirplaneIds);

        this.addSwConfirmModal.hide();
      }
    });

  }

  closeConfirm() {
    this.addSwConfirmModal.hide();
  }

}
