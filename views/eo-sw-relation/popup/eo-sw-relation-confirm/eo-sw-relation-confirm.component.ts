import { Component, OnInit, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { EoInsertModel } from '@app/lsw/models/eo-insert-model';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';
import { EoInsertProxyService } from '@app/lsw/services/eo-insert/eo-insert-proxy.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EoListProxyService } from '@app/lsw/services/eo-list/eo-list-proxy.service';
import { NotifyService } from 'abp-ng2-module/dist/src/notify/notify.service';


@Component({
  selector: 'app-eo-sw-relation-confirm',
  templateUrl: './eo-sw-relation-confirm.component.html',
  styleUrls: ['./eo-sw-relation-confirm.component.css']
})
export class EoSwRelationConfirmComponent implements OnInit {

  notify: NotifyService;

  gridColumnDefs = [];
  gridRowData = [];
  eoNumberValue: string;

  @Output() statusChange: EventEmitter<string> = new EventEmitter<string>();

  eoSoftwareRelationArrayDto: EoInsertModel;
  eoSoftwareRelationDto: EoInsertModel;

  pnEo: any;
  confirmType: string;

  eoSwRelationGrid: SimpleGridComponent;

  @ViewChild(SimpleGridComponent, { static: false }) simpleGrid: SimpleGridComponent;
  @ViewChild('eoSwReationConfirm', { static: false }) eoSwReationConfirmModal: ModalDirective;

  constructor(injector: Injector,
    private eoInsertProxyService: EoInsertProxyService,
    private eoListProxyService: EoListProxyService,
    private spinner: NgxSpinnerService) {

    this.gridColumnDefs = [
      {
        headerName: 'EO NO', field: 'eoNumber'
      },
      {
        headerName: 'Rev.', field: 'eoRevision'
      },
      { headerName: 'PN EO', field: 'pnEo' },
      { headerName: 'SLID', field: 'softwareLocationId' },
      { headerName: 'Before SW PN', field: 'oldPartNumber' },
      { headerName: 'After SW PN', field: 'newPartNumber' },
      { headerName: 'After SW Description', field: 'description' },
    ];

    this.notify = injector.get(NotifyService);

  }

  ngOnInit() {
  }


  onModalHide($event) {

    this.eoNumberValue = null;
    //this.eoSoftwareRelationArrayDto = null;

  };


  show(ctype: string, eoSoftwareRelationDto?, pnEo?, simpleGrid?) {

    this.confirmType = ctype;

    if (ctype === 'Save') {
      this.pnEo = pnEo;

      this.eoSwRelationGrid = simpleGrid;

      let dummyGridRowData = [];

      this.eoSoftwareRelationArrayDto = eoSoftwareRelationDto;

      // check pnEo value(YES/NO)
      if (pnEo === true) {
        this.eoNumberValue = eoSoftwareRelationDto[0].eoNumber;
        eoSoftwareRelationDto[0].pnEo = 'YES';

        eoSoftwareRelationDto[0].softwareLocationSWvalueList.forEach(slid => {
          dummyGridRowData.push({
            eoNumber: eoSoftwareRelationDto[0].eoNumber, eoRevision: eoSoftwareRelationDto[0].eoRevision,
            pnEo: eoSoftwareRelationDto[0].pnEo,
            softwareLocationId: slid, oldPartNumber: eoSoftwareRelationDto[0].oldPartNumber,
            newPartNumber: eoSoftwareRelationDto[0].newPartNumber,
            description: eoSoftwareRelationDto[0].description
          })

        });

      } else {
        this.eoNumberValue = eoSoftwareRelationDto[0].eoNumber;
        eoSoftwareRelationDto[0].pnEo = 'NO';

        eoSoftwareRelationDto[0].softwareLocationSWvalueList.forEach(slid => {
          dummyGridRowData.push({
            eoNumber: eoSoftwareRelationDto[0].eoNumber, eoRevision: eoSoftwareRelationDto[0].eoRevision,
            pnEo: eoSoftwareRelationDto[0].pnEo,
            softwareLocationId: slid, oldPartNumber: eoSoftwareRelationDto[0].oldPartNumber,
            newPartNumber: eoSoftwareRelationDto[0].newPartNumber,
            description: eoSoftwareRelationDto[0].description
          })

        });
      }

      this.simpleGrid.gridApi.setRowData(dummyGridRowData);
    } else {
      this.eoNumberValue = '';
      eoSoftwareRelationDto.forEach(eosr => this.eoNumberValue += ' ,' + eosr.eoNumber);
      this.eoNumberValue = this.eoNumberValue.substr(0, this.eoNumberValue.length - 1);
    }



    this.eoSwReationConfirmModal.show();
  }

  insertEoWithPnEo() {

    this.eoSoftwareRelationArrayDto[0].pnEo = 'Yes';

    this.spinner.show();

    this.eoInsertProxyService.insertEo(this.eoSoftwareRelationArrayDto[0]).subscribe(response => {

      if (response.Success) {

        const self = this;

        response.Result.forEach(message => {
          if (message.StatusCode == "Success") {

            message.values.forEach(msg => {

              msg.InsertedTailNumber.forEach(tn => {

                this.displayEoSwRelationList();

              });

              msg.NotInsertedTailNumber.forEach(tn => {

                this.notify.error(self.eoSoftwareRelationArrayDto[0].oldPartNumber +
                  ' was not found on ' + msg.Slvalue + ' for ' + tn, 'Submit', { positionClass: 'toast-top-right' });

              });

            });

          } else if (message.StatusCode === 'Already Exists') {
            message.alreadyExistList.forEach(slVal => {

              this.notify.error('THE RECORD WHICH HAS SLID '
                + slVal + ' ALREADY EXISTS.', 'Submit', { positionClass: 'toast-top-right' });

            })

            if (message.alreadyExistList.length < this.eoSoftwareRelationArrayDto[0].softwareLocationSWvalueList.length) {

              message.values.forEach(msg => {

                msg.InsertedTailNumber.forEach(tn => {

                  this.displayEoSwRelationList();

                });

                msg.NotInsertedTailNumber.forEach(tn => {

                  this.notify.error(self.eoSoftwareRelationArrayDto[0].oldPartNumber +
                    ' was not found on ' + msg.Slvalue + ' for ' + tn, 'Submit', { positionClass: 'toast-top-right' });

                });

              });
            }

          }
        });

        this.eoSwReationConfirmModal.hide();

        this.spinner.hide();

      } else {
        this.notify.error('System Error!', 'Submit', { positionClass: 'toast-top-right' });

        this.spinner.hide();

      }

    });
  }

  insertEoWOutPnEo() {

    this.eoSoftwareRelationArrayDto[0].pnEo = 'No';
    this.spinner.show();

    this.eoInsertProxyService.insertEo(this.eoSoftwareRelationArrayDto[0]).subscribe(response => {
      if (response.Success) {

        if (response.Result[0].StatusCode === 'Success') {

          const self = this;

          if (response.Result[0].notExist_slValList !== null) {
            response.Result[0].notExist_slValList.forEach(slVal => {

              setTimeout(() => {

                this.notify.error('THE AIRCRAFTS THAT HAVE THE SELECTED ' + self.eoSoftwareRelationArrayDto[0].oldPartNumber +
                  ' AND ' + slVal + 'ARE NOT EFFECTIVE IN THIS EO NUMBER.', 'Submit', { positionClass: 'toast-top-right' });
              });

            }, 100000)

            // refresh grid
          }

          this.displayEoSwRelationList();

        } else if (response.Result[0].StatusCode === 'All Fail') {

          response.Result[0].notExist_slValList.forEach(slVal => {

            const self = this;

            setTimeout(() => {

              this.notify.error('THE AIRCRAFTS THAT HAVE THE SELECTED ' + self.eoSoftwareRelationArrayDto[0].oldPartNumber +
                ' AND ' + slVal + ' ARE NOT EFFECTIVE IN THIS EO NUMBER.', 'Submit', { positionClass: 'toast-top-right' });
            });

          }, 100000)


        }
        else if (response.Result[0].StatusCode == 'Already Exists') {

          response.Result[0].alreadyExistList.forEach(slVal => {


            this.notify.error('THE RECORD WHICH HAS SLID '
              + slVal + ' ALREADY EXISTS.', 'Submit', { positionClass: 'toast-top-right' });


          })

          response.Result[0].notExist_slValList.forEach(slVal => {

            const self = this;

            setTimeout(() => {

              this.notify.error('THE AIRCRAFTS THAT HAVE THE SELECTED ' + self.eoSoftwareRelationArrayDto[0].oldPartNumber +
                ' AND ' + slVal + ' ARE NOT EFFECTIVE IN THIS EO NUMBER.', 'Submit', { positionClass: 'toast-top-right' });
            });

          }, 100000)

          if (response.Result[0].notExist_slValList.length + response.Result[0].alreadyExistList.length < this.eoSoftwareRelationArrayDto[0].softwareLocationSWvalueList.length) {
            this.displayEoSwRelationList();
          }


        } else if (response.Result[0].StatusCode === 'Not Effective') {
          this.notify.error('The selected EO is a P/N EO. Please, select the PN EO check box, then select the A/C Reg(s).', 'Submit', { positionClass: 'toast-top-right' });
        }
      } else {
        this.notify.error('System Error!', 'Submit', { positionClass: 'toast-top-right' });

      }
    });

    this.eoSwReationConfirmModal.hide();

    this.spinner.hide();
  }

  displayEoSwRelationList() {
    this.spinner.show();

    this.eoListProxyService.listEoSwRelation().subscribe(response => {
      if (response.Success) {
        this.notify.success('Submitted Successfully', 'Submit', { positionClass: 'toast-top-right' });
        this.eoSwRelationGrid.gridApi.setRowData(response.Result);
        this.eoSwRelationGrid.onFirstDataRendered(response.Result);
      }
      else {
        this.notify.error('Error!', 'Submit', { positionClass: 'toast-top-right' });
      }
      this.spinner.hide();
      this.eoSwReationConfirmModal.hide();
    });

  }

  close() {
    this.eoSwReationConfirmModal.hide();
  }

  saveConfirm() {
    debugger;
    if (this.confirmType === 'Save') {
      if (this.pnEo === true) {
        this.insertEoWithPnEo();
      }
      else {
        this.insertEoWOutPnEo();
      }
    }
    else {
      this.statusChange.emit(this.confirmType);
    }
  }

  closeConfirm() {
    this.eoSwReationConfirmModal.hide();

  }

}
