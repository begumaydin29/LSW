import { Component, OnInit, ViewChild, Injector, ɵɵNgOnChangesFeature } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { EditSwProxyService } from '@app/lsw/services/edit-sw/edit-sw-proxy.service';
import { ListSoftwareDto } from '@app/lsw/models/list-software-dto';
import { EditDto } from '@app/lsw/models/edit-dto';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';
import { NotifyService } from 'abp-ng2-module/dist/src/notify/notify.service';
import { ListSoftwareService } from '@app/lsw/services/list-software/list-software.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '@shared/auth/auth.service';
import { SwPnServiceProxyService } from '@app/lsw/services/lookup-search-services/swPn-search/swPn-service-proxy.service';

@Component({
  selector: 'app-edit-confirm',
  templateUrl: './edit-confirm.component.html',
  styleUrls: ['./edit-confirm.component.css']
})
export class EditConfirmComponent implements OnInit {

  simpleGrid: SimpleGridComponent;

  acRegArrayWCount: any[];
  selectedRowDatas: any[];
  erd: string;
  swPn: string;
  swDesc: string;
  slId: string;
  eoNo: string;
  status: string;
  remarks: string;

  statusEdited = 0;
  remarksEdited = 0;

  notify: NotifyService;

  @ViewChild('editConfirm', { static: false }) editConfirmModal: ModalDirective;

  constructor(injector: Injector, private editSwProxyService: EditSwProxyService,
    private listSoftwareService: ListSoftwareService,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthService,
    private swPnServiceProxyService: SwPnServiceProxyService) {

    this.notify = injector.get(NotifyService);
  }

  ngOnInit() {
  }

  show(simpleGrid, acRegArrayWCount, selectedRowDatas, erd, slId, swPn, swDesc, eoNo, status, remarks) {

    this.simpleGrid = simpleGrid;

    this.acRegArrayWCount = acRegArrayWCount;
    this.selectedRowDatas = selectedRowDatas;
    this.erd = erd;
    this.slId = slId;
    this.swPn = swPn;
    this.swDesc = swDesc;
    this.eoNo = eoNo;
    this.status = status;
    this.remarks = remarks;

    this.editConfirmModal.show();
  }

  close() {
    this.editConfirmModal.hide();
  }

  async fillEditRequestWSelected(): Promise<ListSoftwareDto[]> {

    let listSw: ListSoftwareDto[] = [];

    for (const sw of this.selectedRowDatas) {
      let swDetail: any = new ListSoftwareDto();

      swDetail.Id = sw.Id;
      swDetail.AcReg = sw.AcReg;
      swDetail.Chapter = sw.Chapter;
      swDetail.Erd = sw.Erd;
      swDetail.ErdDescription = sw.ErdDescription;
      swDetail.HwPn = sw.HwPn;
      swDetail.HwDescription = sw.HwDescription;
      swDetail.SwPn = sw.SwPn;
      swDetail.Status = sw.Status;

      if (this.slId !== '' && this.slId !== null) //slId edited
      {
        swDetail.SlId = this.slId;
        swDetail.SlIdEdited = 1;
      }
      else {
        swDetail.SlId = sw.SlId;
        swDetail.SlIdEdited = 0;
      }
      swDetail.SlDescription = sw.SlDescription;

      if (this.swPn !== '' && this.swPn !== null) {

        swDetail.SwPn = this.swPn;

        if (!(this.swDesc !== '' && this.swDesc !== null)) { //if swDesc not edited

          swDetail.SwDescription = await this.decideSwDescriptionBySwPn(this.swPn);

        }

        swDetail.SwPnEdited = 1;

      } //swPn edited
      else {
        swDetail.SwPn = sw.SwPn;
        if (!(this.swDesc !== '' && this.swDesc !== null)) { //if swDesc not edited

          swDetail.SwDescription = sw.SwDescription;

        }
        swDetail.SwPnEdited = 0;

      }

      if (this.swDesc !== '' && this.swDesc !== null) { //if swDesc edited

        swDetail.SwDescription = this.swDesc;

      }

      swDetail.EoNo = sw.EoNo;

      if (this.status !== '') //status edited
      {
        swDetail.Status = this.status;
        this.statusEdited = 1;
      }
      else {
        swDetail.Status = sw.Status;
      }

      if (this.remarks !== '' && this.remarks !== null) //remarks edited
      {
        swDetail.Remarks = this.remarks;
        this.remarksEdited = 1;
      }
      else {
        swDetail.Remarks = sw.Remarks;
      }

      swDetail.Ids = sw.Ids;

      if (this.erd !== '' && this.erd !== null) //EqKey edited
      {
        swDetail.EqKey = this.erd;
        const splittedEqKey = this.erd.split('@');

        swDetail.Erd = splittedEqKey[0];
        swDetail.HwPn = splittedEqKey[1];

        swDetail.EqKeyEdited = 1;

      }
      else {
        swDetail.EqKey = sw.EqKey;
        swDetail.EqKeyEdited = 0;
      }

      //if there is no change then 'No Change' warning
      const check = this.CheckNoChange(swDetail.SlIdEdited, swDetail.SwPnEdited, this.statusEdited, this.remarksEdited, swDetail.EqKeyEdited);

      if (check === false) {
        listSw.push(swDetail);
      }

    }

    return listSw;

  }

  CheckNoChange(SlIdEdited, SwPnEdited, statusEdited, remarksEdited, EqKeyEdited) {

    if (SlIdEdited == 0 && SwPnEdited == 0 && statusEdited == 0 && remarksEdited == 0 && EqKeyEdited == 0) {
      this.notify.warn('No Change', 'Edit', { positionClass: 'toast-top-right' });
      return true;
    } else {
      return false;
    }

  }

  async decideSwDescriptionBySwPn(swPn) {

    const result = await this.swPnServiceProxyService.getSwPnDescriptionBySwPn(swPn).toPromise();

    if (result.Success) {
      return result.Result.Description;
    } else {
      return null;
    }

  }

  async refreshGridWEdited() {

    const result = await this.listSoftwareService.listSoftware().toPromise();
    const list = result.Result;

    if (result.Success) {

      this.simpleGrid.gridApi.setRowData(list);
      this.simpleGrid.onFirstDataRendered(list);

      return true;
    }
    else {
      return false;
    }

  }

  async editYes() {

    const currentUser = this.authenticationService.getUser();

    const swList: ListSoftwareDto[] = await this.fillEditRequestWSelected();

    console.log('swList', swList);

    if (swList.length !== 0) {
      this.editSwProxyService.updateSwList(swList, currentUser.profile.register_id).subscribe(async response => {

        if (response.Success) {

          this.spinner.show();

          let result = await this.refreshGridWEdited();

          if (result === true) {

            this.spinner.hide();

            this.notify.success('Updated Successfully', 'Update', { positionClass: 'toast-top-right' });
            this.editConfirmModal.hide();

          }
          else {
            this.spinner.hide();
            this.notify.error('Error!', 'Update', { positionClass: 'toast-top-right' });
          }
        }
        else {
          this.notify.error('Error!', 'Update', { positionClass: 'toast-top-right' });
        }
      });
    }

  }

  editCancel() {

    this.editConfirmModal.hide();

  }

}
