import { Component, OnInit, ViewChild, Injector, Output, EventEmitter, NgZone, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AddHardwareInsertProxyService } from '@app/lsw/services/addHardware-insert/addHardware-insert-proxy.service';
import { AirplaneIdByTailNumberProxyService } from '@app/lsw/services/airplaneId-by-tailNumber/airplaneId-by-tailNumber-proxy.service';
import { AddHardwareModel } from '@app/lsw/models/addHardware-model';
import { AtaChapterDto } from '@app/lsw/models/ata-chapter-dto';
import { NotifyService } from "abp-ng2-module/dist/src/notify/notify.service";
import { AddSLInsertDto } from '@app/lsw/models/addSL-insert-dto';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';
import { AddSLInsertProxyService } from '@app/lsw/services/addSL-insert/addSL-insert-proxy.service';

@Component({
  selector: 'app-add-sl-confirm',
  templateUrl: './add-sl-confirm.component.html',
  styleUrls: ['./add-sl-confirm.component.css']
})
export class AddSlConfirmComponent implements OnInit, AfterViewInit {

  gridColumnDefs = [];
  gridRowData = [];

  tailNumber: string[];
  tailNumberId: number[];

  slid: string;
  description: string;

  notify: NotifyService;

  gridStyle = { 'width': '100%', 'height': '200px' };

  @Output() outputMessage: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('confirmAddSl', { static: false }) addSlConfirmModal: ModalDirective;
  @ViewChild(SimpleGridComponent, { static: false }) simpleGrid: SimpleGridComponent;

  constructor(injector: Injector, private addSLInsertProxyService: AddSLInsertProxyService,
    private airplaneIdByTailNumberProxyService: AirplaneIdByTailNumberProxyService, private ngZone: NgZone) {

    this.notify = injector.get(NotifyService);

    this.gridColumnDefs = [
      {
        headerName: 'SLID', field: 'slid'
      },
      {
        headerName: 'SL Description', field: 'description',
      }
    ];
  }

  ngOnInit() {


  }

  ngAfterViewInit() {


  }


  show(tailNumber: string[], slid, description) {

    this.tailNumber = tailNumber;

    this.slid = slid;
    this.description = description;

    this.gridRowData = [
      {
        slid: slid, description: description,
      }

    ];

    this.simpleGrid.gridApi.sizeColumnsToFit();
    this.addSlConfirmModal.show();

  }

  close() {
    this.addSlConfirmModal.hide();
  }

  cancelConfirm() {
    this.addSlConfirmModal.hide();
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

    let airplaneIdList = await this.getAirplaneIdByTailNumber();

    if (airplaneIdList != null) {
      let createdBy = this.getCreatedBy();
      let addSlDto = new AddSLInsertDto();
      addSlDto.swLocationValue = this.slid;
      addSlDto.description = this.description;
      addSlDto.createdBy = createdBy;
      addSlDto.airplaneIdList = airplaneIdList;

      this.addSLInsertProxyService.create(addSlDto).subscribe(response => {

        let results = <Array<any>>response.Result;

        if (results.length > 0 && results.filter(p => p.StatusCode == "1")) {

          this.notify.success('transaction Successfully Completed', 'Save', { positionClass: 'toast-top-right' });
        } else {
          this.notify.error('Error!', 'Save', { positionClass: 'toast-top-right' });
        }

        this.outputMessage.emit(response.Result);
        this.addSlConfirmModal.hide();

      });
    }

  }

  onFirstDataRendered($event) {

  }
}
