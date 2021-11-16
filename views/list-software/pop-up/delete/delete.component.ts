import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { DeleteSwProxyService } from '@app/lsw/services/delete-sw/delete-sw-proxy.service';
import { ListSoftwareDto } from '@app/lsw/models/list-software-dto';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListSoftwareService } from '@app/lsw/services/list-software/list-software.service';
import { NotifyService } from 'abp-ng2-module/dist/src/notify/notify.service';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  acRegArrayWCount: any[] = [];
  selectedRowDatas: any[] = [];

  notify: NotifyService;

  simpleGrid: SimpleGridComponent;

  @ViewChild('deleteSelected', { static: false }) deleteModal: ModalDirective;

  constructor(injector: Injector, private deleteSwProxyService: DeleteSwProxyService,
    private spinner: NgxSpinnerService,
    private listSoftwareService: ListSoftwareService) {
    this.notify = injector.get(NotifyService);
  }

  ngOnInit() {
  }

  show(acRegArrayWCount, selectedRowDatas, simpleGrid) {

    this.simpleGrid = simpleGrid;
    this.acRegArrayWCount = acRegArrayWCount;
    this.selectedRowDatas = selectedRowDatas;

    this.deleteModal.show();

  }

  close() {

    this.deleteModal.hide();

  }

  fillDeleteRequestWSelected() {

    let listSw: ListSoftwareDto[] = [];

    this.selectedRowDatas.forEach(row => {

      let swDetail: ListSoftwareDto = new ListSoftwareDto();

      swDetail.Id = row.Id;
      swDetail.AcReg = row.AcReg;
      swDetail.Chapter = row.Chapter;
      swDetail.Erd = row.Erd;
      swDetail.ErdDescription = row.ErdDescription;
      swDetail.HwPn = row.HwPn;
      swDetail.HwDescription = row.HwDescription;
      swDetail.SlId = row.SlId;
      swDetail.SlDescription = row.SlDescription;
      swDetail.SwPn = row.SwPn;
      swDetail.SwDescription = row.SwDescripiton;
      swDetail.EoNo = row.EoNo;
      swDetail.Status = row.Status;
      swDetail.Remarks = row.Remarks;
      swDetail.Ids = row.Ids;
      swDetail.EqKey = row.EqKey;

      listSw.push(swDetail);

    });

    return listSw;
  }

  async refreshGridWDeleted() {

    this.spinner.show();

    let result = await this.listSoftwareService.listSoftware().toPromise();
    let list = result.Result;

    if (result.Success) {

      this.simpleGrid.gridApi.setRowData(list);
      this.spinner.hide();
      return true;
    }
    else {
      return false;
    }

  }

  deleteYes() {

    let swList = this.fillDeleteRequestWSelected();

    this.deleteSwProxyService.deleteSwList(swList, '93493').subscribe(async response => {

      if (response.Success) {

        this.spinner.show();

        let result = await this.refreshGridWDeleted();

        if (result === true) {

          this.spinner.hide();

          this.notify.success('Deleted Successfully', 'Update', { positionClass: 'toast-top-right' });
          this.deleteModal.hide();

        }
        else {
          this.spinner.hide();
          this.notify.error('Error!', 'Delete', { positionClass: 'toast-top-right' });
        }
      }
      else {
        this.notify.error('Error!', 'Delete', { positionClass: 'toast-top-right' });
      }
    });



  }

  deleteNo() {

    this.deleteModal.hide();

  }

}
