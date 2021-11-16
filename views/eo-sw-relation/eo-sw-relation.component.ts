import {
  Component,
  OnInit,
  ViewChild,
  Injector,
  ViewEncapsulation,
} from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ActionButton } from '@app/components/ag-grids/action-buttons/action-button';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuItem } from '@shared/layout/menu-item';
import { ThyTeknikComponent } from '@app/layout/thyteknik.component';
import { AddSoftwareComponent } from './popup/add-software/add-software.component';
import { SwPartNumberListService } from '@app/lsw/services/sw-part-number-list/sw-part-number-list.service';
import { SwLocationValueProxyService } from '@app/lsw/services/swLocation-value/swLocation-value-proxy.service';
import { SwLocationDescriptionProxyService } from '@app/lsw/services/swLocation-description/swLocation-description-proxy.service';
import { EoInsertModel } from '@app/lsw/models/eo-insert-model';
import { EoInsertProxyService } from '@app/lsw/services/eo-insert/eo-insert-proxy.service';
import { BeforeSwPnDescriptionProxyService } from '@app/lsw/services/beforeSwPn-description/beforeSwPn-description-proxy.service';
import { EoListByEoProxyService } from '@app/lsw/services/eoListByEo/eo-list-by-eo-proxy.service';
import { EoRelationSlidProxyService } from '@app/lsw/services/eo-relation-slid/eo-relation-slid-proxy.service';
import { ActiveTailNumberProxyService } from '@app/lsw/services/active-tail-number/active-tail-number-proxy.service';
import { ActiveTailNumberDto } from '@app/lsw/models/active-tail-number-dto';
import { NotifyService } from 'abp-ng2-module/dist/src/notify/notify.service';
import { pairwise, startWith } from 'rxjs/operators';
import { EoSwRelationConfirmComponent } from './popup/eo-sw-relation-confirm/eo-sw-relation-confirm.component';
import { AirplaneIdByTailNumberProxyService } from '@app/lsw/services/airplaneId-by-tailNumber/airplaneId-by-tailNumber-proxy.service';
import { EoListProxyService } from '@app/lsw/services/eo-list/eo-list-proxy.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';
import { formatDate } from '@angular/common';
import { DeleteEoProxyService } from '@app/lsw/services/delete-eo/delete-eo-proxy.service';
import { UserUmsProxyService } from '@app/lsw/services/ums-proxy/user-ums-proxy.service';
import { ActivePassiveEoProxyService } from '@app/lsw/services/active-passive-eo/active-passive-eo-proxy.service';
import { NgSelectConfig } from '@ng-select/ng-select';

import { SearchModelDto } from '@shared/models/search-model-dto';
import { SwPnServiceProxyService } from '@app/lsw/services/lookup-search-services/swPn-search/swPn-service-proxy.service';
import { AuthService } from '@shared/auth/auth.service';
import { RunUpdateJobService } from '@app/lsw/services/run-update-job/run-update-job.service';
import { ActivePassiveConfirmComponent } from './popup/active-passive-confirm/active-passive-confirm.component';
import { CancelConfirmComponent } from './popup/cancel-confirm/cancel-confirm.component';
import { AcRegSearchProxyService } from '@app/lsw/services/lookup-search-services/acReg-search/acReg-search-proxy.service';

@Component({
  selector: 'app-eo-sw-relation',
  templateUrl: './eo-sw-relation.component.html',
  styleUrls: ['./eo-sw-relation.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EoSwRelationComponent implements OnInit {
  isPnEOClicked = false;
  isSwPnSelected = false;

  gridFullSearch = '';
  gridPageSize = 50;
  gridStyle = { width: '100%', height: '400px' };
  gridColumnDefs = [];
  gridRowData = [];
  gridOptions: GridOptions;

  gridActionButtonCancel = 'cancel';
  gridActionButtonDisable = 'disable';
  gridActionButtons = [];

  swPnList: string[] = [];
  slidList: string[] = [];
  eoList: string[] = [];
  acRegList: ActiveTailNumberDto[] = [];

  form: FormGroup;

  partNumber: string;
  beforeSwPnWithDesc: string;
  slidWithDesc: string;

  revisionValue: string;

  notify: NotifyService;

  submitted = false;

  isPnEo: boolean;

  eoSoftwareRelationDto = new EoInsertModel();

  airplaneIdList: number[] = [];

  index = 0;

  isBeforeSwPnSet = false;

  selected: any;
  selected2: any;

  rowModelType;
  rowSelection;

  holdBeforeSwPnList;
  holdEoNoList;
  holdSlidList;

  dropdownSettings = {};
  allAcReg;

  @ViewChild(SimpleGridComponent, { static: false })
  simpleGrid: SimpleGridComponent;
  @ViewChild('pnEO', { static: false }) pnEO;
  @ViewChild('addSoftware', { static: false })
  addSoftwareModal: AddSoftwareComponent;
  @ViewChild('eoSwReationConfirm', { static: false })
  eoSwReationConfirmModal: EoSwRelationConfirmComponent;
  @ViewChild('activepassive', { static: false })
  activepassiveconfirmModal: ActivePassiveConfirmComponent;
  @ViewChild('cancel', { static: false })
  cancelconfirmModal: CancelConfirmComponent;

  constructor(
    injector: Injector,
    private thyTeknikComponent: ThyTeknikComponent,
    private swPartNumberListService: SwPartNumberListService,
    private swLocationDescriptionProxyService: SwLocationDescriptionProxyService,
    private eoInsertProxyService: EoInsertProxyService,
    private beforeSwPnDescriptionProxyService: BeforeSwPnDescriptionProxyService,
    private eoListByEoProxyService: EoListByEoProxyService,
    private eoRelationSlidProxyService: EoRelationSlidProxyService,
    private activeTailNumberProxyService: ActiveTailNumberProxyService,
    private spinner: NgxSpinnerService,
    private airplaneIdByTailNumberProxyService: AirplaneIdByTailNumberProxyService,
    private eoListProxyService: EoListProxyService,
    private deleteEoProxyService: DeleteEoProxyService,
    private userUmsProxyService: UserUmsProxyService,
    private activePassiveEoProxyService: ActivePassiveEoProxyService,
    private swPnServiceProxyService: SwPnServiceProxyService,
    private config: NgSelectConfig,
    private authService: AuthService,
    private runUpdateJobService: RunUpdateJobService,
    private acRegSearchProxyService: AcRegSearchProxyService
  ) {
    this.config.notFoundText = 'Not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';

    this.gridColumnDefs = [
      {
        headerName: 'EO NO',
        field: 'EoNumber',
        filter: 'agTextColumnFilter',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
      },
      {
        headerName: 'Revision',
        field: 'EoRevision',
        filter: 'agTextColumnFilter',
      },
      { headerName: 'PN EO', field: 'PnEo', filter: 'agTextColumnFilter' },
      {
        headerName: 'EO Status',
        field: 'EoStatus',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'SLID',
        field: 'SoftwareLocationSWvalue',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Before SW PN',
        field: 'OldPartNumber',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'After SW PN',
        field: 'NewPartNumber',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Created By',
        field: 'CreatedBy',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Modified Date',
        field: 'ModifiedDate',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Active-Passive-Cancel',
        field: 'IsActive',
        filter: 'agTextColumnFilter',
      },
    ];
    this.notify = injector.get(NotifyService);

    this.rowSelection = 'multiple';
    this.rowModelType = 'clientSide';
  }

  ngOnInit() {
    this.form = new FormGroup({
      beforeSwPn: new FormControl('', Validators.required),
      eoNo: new FormControl('', Validators.required),
      slidValue: new FormControl('', Validators.required),
      afterSwPn: new FormControl('', Validators.required),
      afterSwDescription: new FormControl('', Validators.required),
      pnEo: new FormControl(false),
      acSeries: new FormControl('B787-9-GE'),
      acReg: new FormControl(''),
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Name',
      textField: 'Value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.GetAllAcRegFromAPI();

    this.displayEoSwRelationList();
  }

  // onFirstDataRendered() {

  //   console.log('datageldi');
  //   const yourFilterComponent = this.simpleGrid.gridApi.getFilterInstance('IsActive');
  //   yourFilterComponent.setModel({
  //     type: 'contains',
  //     filter: 'ACTIVE'
  //   });
  //   this.simpleGrid.gridApi.onFilterChanged();
  // }

  async GetAllAcRegFromAPI() {
    const startIndex = 10;
    const allAcReg = await this.acRegSearchProxyService
      .getAllAirplaneList(startIndex)
      .toPromise();

    if (allAcReg.Success) {
      this.allAcReg = allAcReg.Result;
    }
  }

  async displayEoSwRelationList() {
    this.spinner.show();

    const list = await this.eoListProxyService.listEoSwRelation().toPromise();
    if (list.Success) {
      this.gridRowData = list.Result;
    }
    this.spinner.hide();
  }

  onPaste_beforeSwPn(event: ClipboardEvent) {
    this.submitted = false;

    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    const searchModels = [];
    const searchModel_pn: SearchModelDto = new SearchModelDto();

    searchModel_pn.value = pastedText;
    searchModel_pn.operator = 'contains';
    searchModel_pn.fieldName = 'Value';
    searchModel_pn.caseSensitive = false;

    searchModels.push(searchModel_pn);

    const event_uppercase = pastedText.toUpperCase();

    this.swPnServiceProxyService
      .getSwPnList(searchModels, event_uppercase)
      .subscribe((response) => {
        if (response.Success) {
          this.swPnList = [];

          response.Result.forEach(async (element) => {
            this.swPnList.push(
              await this.getBeforeSwPnWithDescription(element.Value)
            );
          });

          this.holdBeforeSwPnList = this.swPnList;
        }
      });
  }
  async onPaste_SLID(event: ClipboardEvent) {
    this.submitted = false;

    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    console.log('pastes', pastedText);

    const beforeSwPn = this.beforeSwPn.value.substr(
      0,
      this.beforeSwPn.value.indexOf(':')
    );

    await this.getSlidList(beforeSwPn, pastedText);
  }
  onPaste_EoNo(event: ClipboardEvent) {
    this.submitted = false;

    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    const searchModels = [];
    const searchModel_eo: SearchModelDto = new SearchModelDto();

    searchModel_eo.value = pastedText;
    searchModel_eo.operator = 'contains';
    searchModel_eo.fieldName = 'Value';
    searchModel_eo.caseSensitive = false;

    searchModels.push(searchModel_eo);

    const event_uppercase = pastedText.toUpperCase();

    this.eoListByEoProxyService
      .getEoListByEo(event_uppercase)
      .subscribe((response) => {
        if (response.Success) {
          console.log('result', response.Result);

          response.Result.forEach((element) => {
            this.eoList.push(element['Eo']);
          });
          this.holdEoNoList = this.eoList;
        }
      });
  }

  setBeforeSWPN(partNumber) {
    this.partNumber = partNumber;

    this.swPnList.push(partNumber);
    this.beforeSwPn.setValue(partNumber);
    this.isBeforeSwPnSet = true;

    this.isSwPnSelected = true;
  }

  beforeSWPNChanged($event) {
    this.submitted = false;

    const searchBeginNumber = 4;
    const countbeforeSwPnNumber = 7;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {
      if ($event.length > countbeforeSwPnNumber) {
        const tempBeforeSwPnList = [];
        this.holdBeforeSwPnList.forEach((pn) => {
          const event = $event.toUpperCase();

          if (pn.includes(event)) {
            tempBeforeSwPnList.push(pn);
          }
        });
        this.swPnList = tempBeforeSwPnList;
      } else if ($event.length === 5) {
        const searchModel_pn: SearchModelDto = new SearchModelDto();

        searchModel_pn.value = $event;
        searchModel_pn.operator = 'contains';
        searchModel_pn.fieldName = 'Value';
        searchModel_pn.caseSensitive = false;

        searchModels.push(searchModel_pn);

        const event = $event.toUpperCase();

        this.swPnServiceProxyService
          .getSwPnList(searchModels, event)
          .subscribe((response) => {
            if (response.Success) {
              this.swPnList = [];

              response.Result.forEach(async (element) => {
                this.swPnList.push(
                  await this.getBeforeSwPnWithDescription(element.Value)
                );
              });

              this.holdBeforeSwPnList = this.swPnList;
            }
          });
      }
    } else {
      this.swPnList = [];
    }
  }

  async getBeforeSwPnWithDescription(beforeSwPn) {
    this.beforeSwPnWithDesc = '';

    const result = await this.beforeSwPnDescriptionProxyService
      .getBeforeSwPnDescription(beforeSwPn)
      .toPromise();
    if (result.Success) {
      if (result.Result === null) {
        this.beforeSwPnWithDesc = beforeSwPn + ': -';
      } else {
        if (result.Result['Description'] === null) {
          this.beforeSwPnWithDesc = beforeSwPn + ': -';
        } else {
          this.beforeSwPnWithDesc =
            beforeSwPn + ': ' + result.Result['Description'];
        }
      }
    }

    return this.beforeSwPnWithDesc;
  }

  removeValueOnRelations() {
    this.eoNo.setValue(null);
    this.revisionValue = '';
    this.slidValue.setValue(null);
    this.afterSwPn.setValue(null);
    this.afterSwDescription.setValue(null);
    this.isPnEo = false;
    this.isPnEOClicked = false;
    this.acReg.setValue(null);
  }

  // beforeSWPNRemove($event) {

  //   this.isSwPnSelected = false;
  //   this.removeValueOnRelations();

  // }

  selectBeforeSWPN($event) {
    console.log('event', this.beforeSwPn);
    if ($event !== undefined && this.beforeSwPn.status === 'VALID') {
      this.isSwPnSelected = true;
      this.slidValue.setValue(null);
    } else {
      this.isSwPnSelected = false;
      this.removeValueOnRelations();
    }
  }

  getSlidWithDescription(slid) {
    this.slidWithDesc = '';

    if (slid['Description'] === null) {
      this.slidWithDesc = slid['SwLocationValue'] + ': -';
    } else {
      this.slidWithDesc = slid['SwLocationValue'] + ': ' + slid['Description'];
    }

    return this.slidWithDesc;
  }

  getValues() {
    console.log('sdh', this.selected);
  }

  async slIdTyped($event) {
    this.submitted = false;

    this.slidList = [];

    const searchBeginNumber = 3;
    const countSlidNumber = 5;

    if ($event && $event.length > searchBeginNumber) {
      if ($event.length >= countSlidNumber) {
        const tempSlidList = [];
        this.holdSlidList.forEach((slid) => {
          const event = $event.toUpperCase();

          if (slid.includes(event)) {
            tempSlidList.push(slid);
          }
        });
        this.slidList = tempSlidList;
      } else if ($event.length === 4) {
        if (this.isBeforeSwPnSet === false) {
          const beforeSwPn = this.beforeSwPn.value.substr(
            0,
            this.beforeSwPn.value.indexOf(':')
          );

          if ($event.trim().length !== 0) {
            await this.getSlidList(beforeSwPn, $event);
          }
        } else {
          await this.getSlidList(this.beforeSwPn.value, $event);
        }
      }
    } else {
      this.slidList = [];
    }
  }

  async getSlidList(beforeSwPn, event) {
    const result = await this.eoRelationSlidProxyService
      .getSlidListByEoRelation(beforeSwPn, event)
      .toPromise();

    if (result.Success) {
      result.Result.forEach((element) => {
        this.slidList.push(this.getSlidWithDescription(element));
      });

      this.holdSlidList = this.slidList;
    }
  }

  selectSlid($event) {}

  removeBeforeSwValue() {
    this.beforeSwPn.setValue(null);
  }

  eoNoChanged($event) {
    this.submitted = false;

    const searchBeginNumber = 4;
    const counteoNoNumber = 7;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {
      if ($event.length > counteoNoNumber) {
        const tempeoNoList = [];
        this.holdEoNoList.forEach((eo) => {
          const event = $event.toUpperCase();

          if (eo.includes(event)) {
            tempeoNoList.push(eo);
          }
        });
        this.eoList = tempeoNoList;
      } else if ($event.length === 5) {
        const searchModel_eo: SearchModelDto = new SearchModelDto();

        searchModel_eo.value = $event;
        searchModel_eo.operator = 'contains';
        searchModel_eo.fieldName = 'Value';
        searchModel_eo.caseSensitive = false;

        searchModels.push(searchModel_eo);

        const event = $event.toUpperCase();

        this.eoListByEoProxyService
          .getEoListByEo(event)
          .subscribe((response) => {
            if (response.Success) {
              response.Result.forEach((element) => {
                this.eoList.push(element['Eo']);
              });
              this.holdEoNoList = this.eoList;
            }
          });
      }
    } else {
      this.eoList = [];
    }
  }

  eoNoRemove($event) {}

  selectEoNo($event) {
    if ($event === false) {
      this.eoListByEoProxyService
        .getEoListByEo(this.eoNo.value)
        .subscribe((response) => {
          if (response.Success) {
            this.revisionValue = response.Result[0].Revision;
          }
        });
    }
  }

  async authorizedACRegChanged($event) {
    this.submitted = false;

    const searchBeginNumber = 2;

    if ($event && $event.length > searchBeginNumber) {
      const result = await this.activeTailNumberProxyService
        .listAcReg()
        .toPromise();

      if (result.Success) {
        const regList_ = result.Result;

        this.acRegList = regList_.sort((a, b) =>
          a.TailNumber > b.TailNumber ? 1 : -1
        );
      }
    }
  }

  selectACReg($event) {}

  openAddSwPage() {
    this.addSoftwareModal.show();
  }

  activateAC() {
    if (this.pnEO.nativeElement.checked === true) {
      this.pnEO.nativeElement.checked = false;
      this.isPnEOClicked = false;
      this.isPnEo = false;
    } else {
      this.pnEO.nativeElement.checked = true;
      this.isPnEOClicked = true;
      this.isPnEo = true;
    }
  }

  getSelectedDropdown() {}

  async createEoInsertModel(index: any = 0) {
    const currentUser = this.authService.currentUser.profile;

    this.eoSoftwareRelationDto = new EoInsertModel();

    if (this.acReg.value !== '') {
      this.eoSoftwareRelationDto.airplaneIdList = this.airplaneIdList;
    } else {
      this.eoSoftwareRelationDto.airplaneId = 0;
    }
    if (this.isBeforeSwPnSet === false) {
      this.eoSoftwareRelationDto.oldPartNumber = this.beforeSwPn.value.substr(
        0,
        this.beforeSwPn.value.indexOf(':')
      );
    } else {
      this.eoSoftwareRelationDto.oldPartNumber = this.beforeSwPn.value;
    }
    this.eoSoftwareRelationDto.eoNumber = this.eoNo.value;
    this.eoSoftwareRelationDto.newPartNumber =
      this.afterSwPn.value.toUpperCase();
    this.eoSoftwareRelationDto.description =
      this.afterSwDescription.value.toUpperCase();
    this.eoSoftwareRelationDto.eoRevision = this.revisionValue;

    const result = await this.userUmsProxyService
      .getUserByRegisterId(currentUser.register_id)
      .toPromise();

    if (result.Success) {
      this.eoSoftwareRelationDto.modifiedBy =
        currentUser.register_id +
        ' ' +
        result.Result['FIRST_NAME'] +
        ' ' +
        result.Result['LAST_NAME'];

      this.eoSoftwareRelationDto.createdBy =
        currentUser.register_id +
        ' ' +
        result.Result['FIRST_NAME'] +
        ' ' +
        result.Result['LAST_NAME'];
    }

    this.slidValue.value.forEach((slid) => {
      this.eoSoftwareRelationDto.softwareLocationSWvalueList.push(
        slid.substr(0, slid.indexOf(':'))
      );
    });

    this.eoSoftwareRelationDto.id = 0;
    this.eoSoftwareRelationDto.softwareLocationSWvalue = 'string';
    this.eoSoftwareRelationDto.softwareLocationId = 0;
    this.eoSoftwareRelationDto.efStatus = 'string';
    this.eoSoftwareRelationDto.isActive = 0;
    this.eoSoftwareRelationDto.eoCategory = 'string';
    this.eoSoftwareRelationDto.eoStatus = 'string';
    this.eoSoftwareRelationDto.parentId = 0;

    return this.eoSoftwareRelationDto;
  }

  async submitWOutPnEo() {
    this.submitted = true;
    this.acReg.setValue('');

    if (!this.form.valid) {
      return;
    } else {
      const eoSoftwareRelationDtoList: any[] = [];

      const eoSoftwareRelationDto = await this.createEoInsertModel();
      eoSoftwareRelationDto.pnEo = 'No';

      eoSoftwareRelationDtoList.push(eoSoftwareRelationDto);

      this.eoSwReationConfirmModal.show(
        'Save',
        eoSoftwareRelationDtoList,
        false,
        this.simpleGrid
      );
    }
  }

  async submitWithPnEo() {
    const eoSoftwareRelationDtoList: any[] = [];

    if (this.acReg.value === '') {
      this.notify.warn('You must select A/C Reg to SUBMIT', 'WARNING');
    } else {
      this.airplaneIdList = await this.getAirplaneIdByTailNumber();

      if (this.airplaneIdList.length > 0) {
        var index = 0;
        for (const id of this.airplaneIdList) {
          let eoSoftwareRelationDto = await this.createEoInsertModel(index);
          eoSoftwareRelationDto.pnEo = 'Yes';

          if (eoSoftwareRelationDto !== null) {
            eoSoftwareRelationDtoList.push(eoSoftwareRelationDto);
            index++;
          }
        }
        this.eoSwReationConfirmModal.show(
          'Save',
          eoSoftwareRelationDtoList,
          true,
          this.simpleGrid
        );
      } else {
        this.notify.error('ERROR');
      }
    }
  }

  reset() {
    if (confirm('Are you sure to clear them "ALL"?')) {
      this.form.reset();
      this.isSwPnSelected = false;
    }
  }

  async getAirplaneIdByTailNumber() {
    let airplaneIdResult: number[] = [];
    let acReg = this.acReg.value;

    for (const ac of acReg) {
      let result = await this.airplaneIdByTailNumberProxyService
        .getAirplaneIdByTailNumber(ac.Value)
        .toPromise();
      if (result.Success) {
        airplaneIdResult.push(result.Result['Airplane_Id']);
      } else {
        return null;
      }
    }
    return airplaneIdResult;
  }

  createSelectedRowsEoInsertModel(selectedRows: any[]) {
    const eoSoftwareRelationDtoList: any[] = [];

    for (let i = 0; i < selectedRows.length; i++) {
      const eoSoftwareRelationDto = new EoInsertModel();
      eoSoftwareRelationDto.id = selectedRows[i]['Id'];
      eoSoftwareRelationDto.eoSwInsertId = selectedRows[i]['EoSwInsertId'];
      eoSoftwareRelationDto.airplaneId = selectedRows[i]['AirplaneId'];
      eoSoftwareRelationDto.createdBy = selectedRows[i]['CreatedBy'];
      eoSoftwareRelationDto.createdDate = selectedRows[i]['CreatedDate'];
      eoSoftwareRelationDto.description = selectedRows[i]['Description'];
      eoSoftwareRelationDto.efEffectiveDate =
        selectedRows[i]['EfEffectiveDate'];
      eoSoftwareRelationDto.efStatus = selectedRows[i]['EfStatus'];
      eoSoftwareRelationDto.eoCategory = selectedRows[i]['EoCategory'];
      eoSoftwareRelationDto.eoEffectiveDate =
        selectedRows[i]['EoEffectiveDate'];
      eoSoftwareRelationDto.eoNumber = selectedRows[i]['EoNumber'];
      eoSoftwareRelationDto.eoRevision = selectedRows[i]['EoRevision'];
      eoSoftwareRelationDto.eoStatus = selectedRows[i]['EoStatus'];
      eoSoftwareRelationDto.modifiedBy = selectedRows[i]['ModifiedBy'];
      eoSoftwareRelationDto.modifiedDate = selectedRows[i]['ModifiedDate'];
      eoSoftwareRelationDto.newPartNumber = selectedRows[i]['NewPartNumber'];
      eoSoftwareRelationDto.oldPartNumber = selectedRows[i]['OldPartNumber'];
      eoSoftwareRelationDto.pnEo = selectedRows[i]['PnEo'];
      eoSoftwareRelationDto.softwareLocationId =
        selectedRows[i]['SoftwareLocationId'];
      eoSoftwareRelationDto.softwareLocationSWvalue =
        selectedRows[i]['SoftwareLocationSWvalue'];
      eoSoftwareRelationDto.isActive =
        selectedRows[i]['IsActive'] === 'ACTIVE'
          ? 1
          : selectedRows[i]['IsActive'] === 'PASSIVE'
          ? 2
          : 3;

      console.log('sddsf', eoSoftwareRelationDto);

      eoSoftwareRelationDtoList.push(eoSoftwareRelationDto);
    }

    return eoSoftwareRelationDtoList;
  }

  arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele['IsActive'] !== value;
    });
  }

  checkSelectedRowIfCancelled(selectedRows) {
    return this.arrayRemove(
      this.arrayRemove(selectedRows, 'DELETED'),
      'CANCEL'
    );
  }

  deleteEo(selectedRows) {
    const eoSoftwareRelationDtoList =
      this.createSelectedRowsEoInsertModel(selectedRows);

    this.spinner.show();

    this.deleteEoProxyService
      .deleteEo(eoSoftwareRelationDtoList)
      .subscribe(async (response) => {
        if (response.Result[0]['StatusCode'] === 'Success') {
          const list = await this.eoListProxyService
            .listEoSwRelation()
            .toPromise();
          if (list.Success) {
            this.notify.success('Updated Successfully', 'UPDATE', {
              positionClass: 'toast-top-right',
            });
            this.simpleGrid.gridApi.setRowData(list.Result);
            this.simpleGrid.onFirstDataRendered(list.Result);

            this.spinner.hide();
          }
        } else {
          this.notify.error('ERROR while cancel!', 'ERROR');

          this.spinner.hide();
        }
      });
  }

  activePassiveEo(selectedRows) {
    const eoSoftwareRelationDtoList =
      this.createSelectedRowsEoInsertModel(selectedRows);

    this.spinner.show();

    this.activePassiveEoProxyService
      .activePassiveEo(eoSoftwareRelationDtoList)
      .subscribe(async (response) => {
        if (response.Success) {
          const list = await this.eoListProxyService
            .listEoSwRelation()
            .toPromise();
          if (list.Success) {
            this.notify.success('Updated Successfully', 'UPDATE', {
              positionClass: 'toast-top-right',
            });
            this.simpleGrid.gridApi.setRowData(list.Result);
            this.simpleGrid.onFirstDataRendered(list.Result);

            this.spinner.hide();
          }
        } else {
          this.notify.error('ERROR while active/passive!', 'ERROR');

          this.spinner.hide();
        }
      });
  }

  // cType: Cancel, ActivePassive
  confirmStatusChange(cType) {
    const selectedRows = this.simpleGrid.gridApi.getSelectedRows();
    if (selectedRows.length <= 0) {
      this.notify.warn(
        'Please select at least one row for active/passive/cancel!',
        'WARNING'
      );
      return;
    }

    let dto = this.createSelectedRowsEoInsertModel(selectedRows);
    this.eoSwReationConfirmModal.show(cType, dto);
  }

  onStatusChange(cType) {
    if (cType === 'Cancel') {
      this.cancelEo();
    } else if (cType === 'ActivePassive') {
      this.activePassive();
    }

    this.eoSwReationConfirmModal.close();
  }

  cancelEo() {
    const selectedRows = this.simpleGrid.gridApi.getSelectedRows();

    this.cancelconfirmModal.show(selectedRows.length);
  }

  cancelconfirmApproved() {
    const selectedRows = this.simpleGrid.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
      this.deleteEo(selectedRows);
    } else {
      this.notify.warn('Please select at least one row to cancel!', 'WARNING');
    }
  }

  activePassive() {
    const selectedRows = this.simpleGrid.gridApi.getSelectedRows();

    this.activepassiveconfirmModal.show(selectedRows.length);

    // if (selectedRows.length > 0) {
    //   const resultSelectedRows = this.checkSelectedRowIfCancelled(selectedRows);

    //   if (resultSelectedRows.length !== selectedRows.length) {
    //     this.notify.warn(
    //       'Among the records you want to change are those whose status are CANCELLED. They will not be modified!',
    //       'WARNING'
    //     );
    //     if (resultSelectedRows.length > 0) {
    //       this.activePassiveEo(resultSelectedRows);
    //     }
    //   } else {
    //     this.activePassiveEo(selectedRows);
    //   }
    // } else {
    //   this.notify.warn(
    //     'Please select at least one row for active/passive!',
    //     'WARNING'
    //   );
    // }
  }

  activepassiveconfirmApproved() {
    // active/passive records
    const selectedRows = this.simpleGrid.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
      const resultSelectedRows = this.checkSelectedRowIfCancelled(selectedRows);

      if (resultSelectedRows.length !== selectedRows.length) {
        this.notify.warn(
          'Among the records you want to change are those whose status are CANCELLED. They will not be modified!',
          'WARNING'
        );
        if (resultSelectedRows.length > 0) {
          this.activePassiveEo(resultSelectedRows);
        }
      } else {
        this.activePassiveEo(selectedRows);
      }
    } else {
      this.notify.warn(
        'Please select at least one row for active/passive!',
        'WARNING'
      );
    }
  }

  async runJob() {
    this.spinner.show();

    const result = await this.runUpdateJobService.runUpdateJob().toPromise();

    if (result.Success) {
      this.notify.success('Job successfully completed', 'SUCCESS');
      this.spinner.hide();
    }
  }

  onSelectAllAcReg(items: any) {
    console.log(items);
  }

  onQuickFilterChanged() {
    this.simpleGrid.onQuickFilterChanged();
  }

  onPaste_Search($event) {}

  get beforeSwPn() {
    return this.form.get('beforeSwPn');
  }

  get eoNo() {
    return this.form.get('eoNo');
  }

  get slidValue() {
    return this.form.get('slidValue');
  }

  get afterSwPn() {
    return this.form.get('afterSwPn');
  }

  get afterSwDescription() {
    return this.form.get('afterSwDescription');
  }

  get pnEo() {
    return this.form.get('pnEo');
  }

  get acSeries() {
    return this.form.get('acSeries');
  }

  get acReg() {
    return this.form.get('acReg');
  }
}
