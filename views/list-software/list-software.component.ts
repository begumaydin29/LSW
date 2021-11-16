import {
  Component,
  OnInit,
  Injector,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewEncapsulation,
  ElementRef,
  HostListener,
} from '@angular/core';
import { GridOptions, SideBarDef, RowNode } from 'ag-grid-community';
import { AppComponentBase } from '@shared/app-component-base';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';
import { ActiveTailNumberProxyService } from '@app/lsw/services/active-tail-number/active-tail-number-proxy.service';
import { EquipmentProxyService } from '@app/lsw/services/equipment/equipment-proxy.service';
import { ListSoftwareService } from '@app/lsw/services/list-software/list-software.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResourceLoader } from '@angular/compiler';
import { NgxSpinnerService } from 'ngx-spinner';
import { AcRegSearchProxyService } from '@app/lsw/services/lookup-search-services/acReg-search/acReg-search-proxy.service';
import { EditComponent } from './pop-up/edit/edit.component';
import { SearchModelDto } from '@shared/models/search-model-dto';
import { AtaChapterSearchProxyService } from '@app/lsw/services/lookup-search-services/ataChapter-search/ataChapter-search-proxy.service';
import { HwPnSearchProxyService } from '@app/lsw/services/lookup-search-services/hwPn-search/hwPn-search-proxy.service';
import { SlIdSearchProxyService } from '@app/lsw/services/lookup-search-services/slId-search/slId-search-proxy.service';
import { StatusSearchProxyService } from '@app/lsw/services/lookup-search-services/status-search/status-search-proxy.service';
import { SwPnServiceProxyService } from '@app/lsw/services/lookup-search-services/swPn-search/swPn-service-proxy.service';
import { ErdSearchProxyService } from '@app/lsw/services/lookup-search-services/erd-search/erd-search-proxy.service';
import { EoNumberSearchProxyService } from '@app/lsw/services/lookup-search-services/eoNumber-search/eoNumber-search-proxy.service';
import { DeleteComponent } from './pop-up/delete/delete.component';
import { ExcelService } from '@app/services/excel/excel.service';
import { PdfService } from '@app/services/pdf/pdf.service';
import { pgOptionComponent } from '.pages/@pages/components/select/option.component';
import { ThyteknikService } from '@app/layout/thyteknik.service';
import { AcRegListModel } from '@app/lsw/models/acRegList-model';
import { AcRegSearchDto } from '@app/lsw/models/lookup-search-models/acReg-search-dto';
import { NgSelectConfig } from '@ng-select/ng-select';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LoadableSwProxyService } from '@app/lsw/services/loadable-sw/loadable-sw-proxy.service';
import { formatDate } from '@angular/common';
import { isThisISOWeek } from 'date-fns';

@Component({
  selector: 'app-list-software',
  templateUrl: './list-software.component.html',
  styleUrls: ['./list-software.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [pgOptionComponent],
})
export class ListSoftwareComponent extends AppComponentBase implements OnInit {
  showEditButton = false;
  showDeleteButton = false;

  form: FormGroup;

  gridFullSearch = '';
  gridPageSize = 50;
  gridStyle = { width: '100%', height: '800px' };
  gridColumnDefs = [];
  gridRowData = [];
  gridRowDataDummy = [];
  keepGridRowDataDummy = [];
  gridOptions: GridOptions;
  // sideBar: SideBarDef;

  isAcRegSelected = false;
  isAcRegSearched = false;

  isSearchClicked = false;

  isListLoaded = false;

  selectedRowDatas: any[];

  acRegArrayWCount: any[] = [];

  acRegList: AcRegSearchDto[] = [];
  ataChList: any[] = [];
  erdList: any[] = [];

  hwPnList: any[] = [];
  slIdList: any[] = [];
  swPnList: any[] = [];
  swDescList: any[] = [];
  eoNumberList: any[] = [];
  statusList: any[] = [];

  countErd = 0;

  holderdList = [];
  holdSlidList = [];
  holdEoNoList = [];
  holdHwPnList = [];
  holdSwPnList = [];
  holdSwDescList = [];

  rowModelType;
  rowSelection;

  acRegValue = 'Enter Tail Number e.g. TC-LLC';
  defaultAcReg: string;

  allAcReg;
  allAtaCh;
  allErd;
  allHwPn;
  allSlId;
  allSwPn;
  allSWDesc;
  allEo;
  allStatus;
  dropdownSettings = {};

  acRegLoaded = false;
  ataChLoaded = false;
  erdLoaded = false;
  hwPnLoaded = false;
  slidLoaded = false;
  swPnLoaded = false;
  swDescLoaded = false;
  eoNoLoaded = false;
  statusLoaded = false;

  START_INDEX = 20;
  START_INDEX_ACREG = 20;
  START_INDEX_ATACH = 20;
  START_INDEX_ERD = 20;
  START_INDEX_HWPN = 20;
  START_INDEX_SLID = 20;
  START_INDEX_SWDESC = 20;
  START_INDEX_EONO = 20;
  START_INDEX_STATUS = 20;
  isSearchActiveForAcReg = false;
  isSearchActiveForAtaCh = false;
  isSearchActiveForErd = false;
  isSearchActiveForHwPn = false;
  isSearchActiveForSlId = false;
  isSearchActive = false;
  isSearchActiveForSwDesc = false;
  isSearchActiveForEoNo = false;
  isSearchActiveForStatus = false;

  @ViewChild(SimpleGridComponent, { static: false })
  simpleGrid: SimpleGridComponent;
  @ViewChild('edit', { static: false }) editModal: EditComponent;
  @ViewChild('deleteSelected', { static: false }) deleteModal: DeleteComponent;

  constructor(
    injector: Injector,
    private activeTailNumberProxyService: ActiveTailNumberProxyService,
    private equipmentProxyService: EquipmentProxyService,
    private listSoftwareService: ListSoftwareService,
    private acRegSearchProxyService: AcRegSearchProxyService,
    private ataChapterSearchProxyService: AtaChapterSearchProxyService,
    private eoNumberSearchProxyService: EoNumberSearchProxyService,
    private erdSearchProxyService: ErdSearchProxyService,
    private hwPnSearchProxyService: HwPnSearchProxyService,
    private slIdSearchProxyService: SlIdSearchProxyService,
    private statusSearchProxyService: StatusSearchProxyService,
    private swPnServiceProxyService: SwPnServiceProxyService,
    private loadableSwProxyService: LoadableSwProxyService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private pdfService: PdfService,
    private cdref: ChangeDetectorRef,
    private config: NgSelectConfig
  ) {
    super(injector);
    this.gridColumnDefs = [
      {
        headerName: 'A/C Reg',
        field: 'AcReg',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
      },
      {
        headerName: 'HW ATA Ch.',
        field: 'Chapter',
      },
      { headerName: 'ERD', field: 'Erd' },
      { headerName: 'ERD Description', field: 'ErdDescription' },
      { headerName: 'HW PN', field: 'HwPn' },
      { headerName: 'HW Description', field: 'HwDescription' },
      { headerName: 'SLID', field: 'SlId' },
      { headerName: 'SLID Description', field: 'SlDescription' },
      { headerName: 'SW PN', field: 'SwPn' },
      { headerName: 'ATA & SW Description', field: 'SwDescription' },
      { headerName: 'EO No', field: 'EoNo' },
      { headerName: 'Status', field: 'Status' },
      { headerName: 'Remarks', field: 'Remarks' },
    ];

    this.config.notFoundText = 'Not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';

    this.rowModelType = 'clientSide';
    this.rowSelection = 'multiple';
  }

  async ngOnInit() {
    this.form = new FormGroup({
      acReg: new FormControl(''),
      ataCh: new FormControl(''),
      erd: new FormControl(''),
      hwPn: new FormControl(''),
      slid: new FormControl(''),
      swPn: new FormControl(''),
      swDesc: new FormControl(''),
      eoNo: new FormControl(''),
      status: new FormControl(''),
    });

    this.spinner.show();

    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: "Name",
    //   textField: "Value",
    //   selectAllText: "Select All",
    //   unSelectAllText: "UnSelect All",
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true,
    // };

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Enter Value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      labelKey: 'Value',
      badgeShowLimit: 3,
      primaryKey: 'Value',
    };

    await this.GetAllParametersFromAPI();

    this.showEditButton = this.permission.isGrantedRole('Admin');
    this.showDeleteButton = this.permission.isGrantedRole('Admin');

    this.gridColumnDefs[0].checkboxSelection = this.showEditButton;
    this.gridColumnDefs[0].headerCheckboxSelection = this.showEditButton;

    this.defaultAcReg = '';

    this.spinner.hide();

    this.defineScrollEvents();
  }

  defineScrollEvents() {
    const scroller_acReg = document.querySelector('#acRegId');
    scroller_acReg.addEventListener('scroll', this.scrollEvent_acReg, true);

    const scroller_ataCh = document.querySelector('#hwAtaChId');
    scroller_ataCh.addEventListener('scroll', this.scrollEvent_ataCh, true);

    const scroller_erd = document.querySelector('#erdId');
    scroller_erd.addEventListener('scroll', this.scrollEvent_Erd, true);

    const scroller_hwPn = document.querySelector('#hwPnId');
    scroller_hwPn.addEventListener('scroll', this.scrollEvent_HwPn, true);

    const scroller_slId = document.querySelector('#slId');
    scroller_slId.addEventListener('scroll', this.scrollEvent_SlId, true);

    const scroller = document.querySelector('#swPnId');
    scroller.addEventListener('scroll', this.scrollEvent, true);

    const scroller_SWDesc = document.querySelector('#swDescId');
    scroller_SWDesc.addEventListener('scroll', this.scrollEvent_SWDesc, true);

    const scroller_EoNo = document.querySelector('#eoNoId');
    scroller_EoNo.addEventListener('scroll', this.scrollEvent_EoNo, true);

    const scroller_Status = document.querySelector('#statusId');
    scroller_Status.addEventListener('scroll', this.scrollEvent_Status, true);
  }

  scrollEvent_acReg = async (event: any): Promise<void> => {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      !this.isSearchActiveForAcReg
    ) {
      //call API to load new data
      const allAcReg = await this.acRegSearchProxyService
        .getAllAirplaneList(this.START_INDEX_ACREG)
        .toPromise();

      if (allAcReg.Success) {
        this.START_INDEX_ACREG = this.START_INDEX_ACREG + 10;
        this.allAcReg = allAcReg.Result;

        event.target.scrollTop = 0;
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  scrollEvent_ataCh = async (event: any): Promise<void> => {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      !this.isSearchActiveForAtaCh
    ) {
      //call API to load new data
      const allAtaCh = await this.ataChapterSearchProxyService
        .getAllAtaChapterList(this.START_INDEX_ACREG)
        .toPromise();

      if (allAtaCh.Success) {
        this.START_INDEX_ATACH = this.START_INDEX_ATACH + 10;
        this.allAtaCh = allAtaCh.Result;

        event.target.scrollTop = 0;
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  scrollEvent_Erd = async (event: any): Promise<void> => {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      !this.isSearchActiveForErd
    ) {
      //call API to load new data
      const allErd = await this.erdSearchProxyService
        .getAllErdList(this.START_INDEX_ERD)
        .toPromise();

      if (allErd.Success) {
        this.START_INDEX_ERD = this.START_INDEX_ERD + 10;
        this.allErd = allErd.Result;

        event.target.scrollTop = 0;
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  scrollEvent_HwPn = async (event: any): Promise<void> => {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      !this.isSearchActiveForHwPn
    ) {
      //call API to load new data
      const allHwPn = await this.hwPnSearchProxyService
        .getAllHwPnList(this.START_INDEX_HWPN)
        .toPromise();

      if (allHwPn.Success) {
        this.START_INDEX_HWPN = this.START_INDEX_HWPN + 10;
        this.allHwPn = allHwPn.Result;

        event.target.scrollTop = 0;
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  scrollEvent_SlId = async (event: any): Promise<void> => {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      !this.isSearchActiveForSlId
    ) {
      //call API to load new data
      const allSlId = await this.slIdSearchProxyService
        .getAllSlidList(this.START_INDEX_SLID)
        .toPromise();

      if (allSlId.Success) {
        this.START_INDEX_SLID = this.START_INDEX_SLID + 10;
        this.allSlId = allSlId.Result;

        event.target.scrollTop = 0;
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  scrollEvent = async (event: any): Promise<void> => {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      !this.isSearchActive
    ) {
      //call API to load new data
      const allSwPn = await this.swPnServiceProxyService
        .getAllSwPnList(this.START_INDEX)
        .toPromise();

      if (allSwPn.Success) {
        this.START_INDEX = this.START_INDEX + 10;
        this.allSwPn = allSwPn.Result;

        event.target.scrollTop = 0;
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  scrollEvent_SWDesc = async (event: any): Promise<void> => {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      !this.isSearchActiveForSwDesc
    ) {
      //call API to load new data
      const allSWDesc = await this.loadableSwProxyService
        .getLoadableSwAllDescriptions(this.START_INDEX_SWDESC)
        .toPromise();

      if (allSWDesc.Success) {
        this.START_INDEX_SWDESC = this.START_INDEX_SWDESC + 10;
        this.allSWDesc = allSWDesc.Result;

        event.target.scrollTop = 0;
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  scrollEvent_EoNo = async (event: any): Promise<void> => {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      !this.isSearchActiveForEoNo
    ) {
      //call API to load new data
      const allEo = await this.eoNumberSearchProxyService
        .getAllEoNoList(this.START_INDEX_EONO)
        .toPromise();

      if (allEo.Success) {
        this.START_INDEX_EONO = this.START_INDEX_EONO + 10;
        this.allEo = allEo.Result;

        event.target.scrollTop = 0;
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  scrollEvent_Status = async (event: any): Promise<void> => {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      !this.isSearchActiveForStatus
    ) {
      //call API to load new data
      const allStatus = await this.statusSearchProxyService
        .getAllStatusList(this.START_INDEX_STATUS)
        .toPromise();

      if (allStatus.Success) {
        this.START_INDEX_STATUS = this.START_INDEX_STATUS + 10;
        this.allStatus = allStatus.Result;

        event.target.scrollTop = 0;
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  async onSearch(evt: any) {
    const searchTermValue = evt.target.value.toUpperCase();
    const searchTermLength = evt.target.value.length;
    if (searchTermLength >= 3) {
      const allSwPn = await this.swPnServiceProxyService
        .getAllSwPnListBySearchTerm(searchTermValue)
        .toPromise();

      if (allSwPn.Success) {
        this.isSearchActive = true;
        this.allSwPn = allSwPn.Result;
      } else if (searchTermLength == 0) {
        this.isSearchActive = false;
        this.START_INDEX = 10;
      }
    }
  }

  async onSearch_AcReg(evt: any) {
    const searchTermValue = evt.target.value.toUpperCase();
    const searchTermLength = evt.target.value.length;
    if (searchTermLength >= 2) {
      const allAcReg = await this.acRegSearchProxyService
        .getAllAirplaneListBySearchTerm(searchTermValue)
        .toPromise();

      if (allAcReg.Success) {
        this.isSearchActiveForAcReg = true;
        this.allAcReg = allAcReg.Result;
      }
    } else if (searchTermLength == 0) {
      this.isSearchActiveForAcReg = false;
      this.START_INDEX_ACREG = 10;
    }
  }

  async onSearch_AtaCh(evt: any) {
    const searchTermValue = evt.target.value.toUpperCase();
    const searchTermLength = evt.target.value.length;
    if (searchTermLength >= 1) {
      const allAtaCh = await this.ataChapterSearchProxyService
        .getAllAtaChapterListBySearchTerm(searchTermValue)
        .toPromise();

      if (allAtaCh.Success) {
        this.isSearchActiveForAtaCh = true;
        this.allAtaCh = allAtaCh.Result;
      } else if (searchTermLength == 0) {
        this.isSearchActiveForAtaCh = false;
        this.START_INDEX_ATACH = 10;
      }
    }
  }

  async onSearch_Erd(evt: any) {
    const searchTermValue = evt.target.value.toUpperCase();
    const searchTermLength = evt.target.value.length;
    if (searchTermLength >= 1) {
      const allErd = await this.erdSearchProxyService
        .getAllErdListBySearchTerm(searchTermValue)
        .toPromise();

      if (allErd.Success) {
        this.isSearchActiveForErd = true;
        this.allErd = allErd.Result;
      }
    } else if (searchTermLength == 0) {
      this.isSearchActiveForErd = false;
      this.START_INDEX_ERD = 10;
    }
  }

  async onSearch_HwPn(evt: any) {
    const searchTermValue = evt.target.value.toUpperCase();
    const searchTermLength = evt.target.value.length;
    if (searchTermLength >= 1) {
      const allHwPn = await this.hwPnSearchProxyService
        .getAllHwPnListBySearchTerm(searchTermValue)
        .toPromise();

      if (allHwPn.Success) {
        this.isSearchActiveForHwPn = true;
        this.allErd = allHwPn.Result;
      }
    } else if (searchTermLength == 0) {
      this.isSearchActiveForHwPn = false;
      this.START_INDEX_HWPN = 10;
    }
  }

  async onSearch_SlId(evt: any) {
    const searchTermValue = evt.target.value.toUpperCase();
    const searchTermLength = evt.target.value.length;
    if (searchTermLength >= 2) {
      const allSlId = await this.slIdSearchProxyService
        .getAllSlidListBySearchTerm(searchTermValue)
        .toPromise();

      if (allSlId.Success) {
        this.isSearchActiveForSlId = true;
        this.allSlId = allSlId.Result;
      }
    } else if (searchTermLength == 0) {
      this.isSearchActiveForSlId = false;
      this.START_INDEX_SLID = 10;
    }
  }

  async onSearch_SWDesc(evt: any) {
    const searchTermValue = evt.target.value.toUpperCase();
    const searchTermLength = evt.target.value.length;
    if (searchTermLength >= 2) {
      const allSwDesc = await this.loadableSwProxyService
        .getLoadableSwAllDescriptionsBySearchTerm(searchTermValue)
        .toPromise();

      if (allSwDesc.Success) {
        this.isSearchActiveForSwDesc = true;
        this.allSWDesc = allSwDesc.Result;
      }
    } else if (searchTermLength == 0) {
      this.isSearchActiveForSwDesc = false;
      this.START_INDEX_SWDESC = 10;
    }
  }

  async onSearch_EoNo(evt: any) {
    const searchTermValue = evt.target.value.toUpperCase();
    const searchTermLength = evt.target.value.length;
    if (searchTermLength >= 2) {
      const allEo = await this.eoNumberSearchProxyService
        .getAllEoNoListbySearchTerm(searchTermValue)
        .toPromise();

      if (allEo.Success) {
        this.isSearchActiveForEoNo = true;
        this.allEo = allEo.Result;
      }
    } else if (searchTermLength == 0) {
      this.isSearchActiveForEoNo = false;
      this.START_INDEX_EONO = 10;
    }
  }

  async onSearch_Status(evt: any) {
    const searchTermValue = evt.target.value.toUpperCase();
    const searchTermLength = evt.target.value.length;
    if (searchTermLength >= 2) {
      const allStatus = await this.statusSearchProxyService
        .getAllStatusListBySearchTerm(searchTermValue)
        .toPromise();

      if (allStatus.Success) {
        this.isSearchActiveForStatus = true;
        this.allStatus = allStatus.Result;
      }
    } else if (searchTermLength == 0) {
      this.isSearchActiveForStatus = false;
      this.START_INDEX_STATUS = 10;
    }
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  // lookup
  async GetAllParametersFromAPI() {
    const startIndex = 10;

    const allAcReg = await this.acRegSearchProxyService
      .getAllAirplaneList(startIndex)
      .toPromise();

    if (allAcReg.Success) {
      this.acRegLoaded = true;
      this.allAcReg = allAcReg.Result;
    }

    const allAtaCh = await this.ataChapterSearchProxyService
      .getAllAtaChapterList(this.START_INDEX_ATACH)
      .toPromise();

    if (allAtaCh.Success) {
      this.ataChLoaded = true;
      this.allAtaCh = allAtaCh.Result;
    }

    const allErd = await this.erdSearchProxyService
      .getAllErdList(this.START_INDEX_ERD)
      .toPromise();

    if (allErd.Success) {
      this.erdLoaded = true;
      this.allErd = allErd.Result;
    }

    const allHwPn = await this.hwPnSearchProxyService
      .getAllHwPnList(this.START_INDEX_HWPN)
      .toPromise();

    if (allHwPn.Success) {
      this.hwPnLoaded = true;
      this.allHwPn = allHwPn.Result;
    }

    const allSlId = await this.slIdSearchProxyService
      .getAllSlidList(this.START_INDEX_SLID)
      .toPromise();

    if (allSlId.Success) {
      this.slidLoaded = true;
      this.allSlId = allSlId.Result;
    }

    const allSwPn = await this.swPnServiceProxyService
      .getAllSwPnList(startIndex)
      .toPromise();

    if (allSwPn.Success) {
      this.swPnLoaded = true;
      this.allSwPn = allSwPn.Result;
    }

    const allSWDesc = await this.loadableSwProxyService
      .getLoadableSwAllDescriptions(this.START_INDEX_SWDESC)
      .toPromise();

    if (allSWDesc.Success) {
      this.swDescLoaded = true;
      this.allSWDesc = allSWDesc.Result;
    }

    const allEo = await this.eoNumberSearchProxyService
      .getAllEoNoList(this.START_INDEX_EONO)
      .toPromise();

    if (allEo.Success) {
      this.eoNoLoaded = true;
      this.allEo = allEo.Result;
    }

    const allStatus = await this.statusSearchProxyService
      .getAllStatusList(this.START_INDEX_STATUS)
      .toPromise();

    if (allStatus.Success) {
      this.statusLoaded = true;
      this.allStatus = allStatus.Result;
    }

    return '';
  }

  async loadSoftwareList() {
    this.spinner.show();

    const list = await this.listSoftware();

    if (list !== null && list !== undefined && list.length > 0) {
      this.keepGridRowDataDummy = list;

      this.isListLoaded = true;

      if (this.simpleGrid !== undefined) {
        await this.searchListWParameters(this.keepGridRowDataDummy);
      }

      this.isAcRegSearched = true;
    }

    this.spinner.hide();
  }

  async listSoftware() {
    const result = await this.listSoftwareService.listSoftware().toPromise();

    if (result.Success) {
      this.gridRowDataDummy = result.Result;

      return this.gridRowDataDummy;
    }
  }

  async authorizedACRegChanged($event) {
    const searchBeginNumber = 2;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {
      const searchModel_acReg: SearchModelDto = new SearchModelDto();

      searchModel_acReg.value = $event;
      searchModel_acReg.operator = 'contains';
      searchModel_acReg.fieldName = 'Value';
      searchModel_acReg.caseSensitive = false;

      searchModels.push(searchModel_acReg);

      const event = $event.toUpperCase();

      this.acRegSearchProxyService
        .getAirplaneList(searchModels, event)
        .subscribe((data) => {
          if (
            typeof data.Result !== 'undefined' &&
            data.Result !== null &&
            data.Result.length !== 0
          ) {
            // acReg found
            this.acRegList = data.Result;
          }
        });
    }
  }

  selectACReg($event) {
    this.acReg.valueChanges.subscribe((change) => {
      if (change != null) {
        this.isAcRegSelected = true;
        this.isSearchActiveForAcReg = false;
      }
    });
  }

  onSelectAllAcReg(items: any) {
    console.log(items);
    this.isSearchActiveForAcReg = false;
  }

  onSelectATACh(items: any) {
    console.log(items);
    this.isSearchActiveForAtaCh = false;
  }
  onSelectErd(items: any) {
    console.log(items);
    this.isSearchActiveForErd = false;
  }
  onSelectHwPn(items: any) {
    console.log(items);
    this.isSearchActiveForHwPn = false;
  }
  onSelectSlId(items: any) {
    console.log(items);
    this.isSearchActiveForSlId = false;
  }
  onSelectSwPn(items: any) {
    console.log(items);
    this.isSearchActive = false;
  }
  onSelectSWDesc(items: any) {
    console.log(items);
    this.isSearchActiveForSwDesc = false;
  }
  onSelectEoNo(items: any) {
    console.log(items);
    this.isSearchActiveForEoNo = false;
  }
  onSelectStatus(items: any) {
    console.log(items);
    this.isSearchActiveForStatus = false;
  }

  onPaste_acReg(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    const searchModels = [];
    const searchModel_acReg: SearchModelDto = new SearchModelDto();

    searchModel_acReg.value = pastedText;
    searchModel_acReg.operator = 'contains';
    searchModel_acReg.fieldName = 'Value';
    searchModel_acReg.caseSensitive = false;

    searchModels.push(searchModel_acReg);

    const event_uppercase = pastedText.toUpperCase();
    this.acRegSearchProxyService
      .getAirplaneList(searchModels, event_uppercase)
      .subscribe((data) => {
        if (
          typeof data.Result !== 'undefined' &&
          data.Result !== null &&
          data.Result.length !== 0
        ) {
          // acReg found
          this.acRegList = data.Result;
        }
      });
  }

  authorizedATAChChanged($event) {
    const searchBeginNumber = 0;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {
      const searchModel_ataChapter: SearchModelDto = new SearchModelDto();

      searchModel_ataChapter.value = $event;
      searchModel_ataChapter.operator = 'contains';
      searchModel_ataChapter.fieldName = 'Value';
      searchModel_ataChapter.caseSensitive = false;

      searchModels.push(searchModel_ataChapter);

      this.ataChapterSearchProxyService
        .getAtaChapterList(searchModels, $event)
        .subscribe((data) => {
          if (
            typeof data.Result !== 'undefined' &&
            data.Result !== null &&
            data.Result.length !== 0
          ) {
            // ataChapter found

            this.ataChList = data.Result;
          }
        });
    }
  }

  selectATACh($event) {
    this.isSearchActiveForAtaCh = false;
  }

  onPaste_ataChapter(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    const searchModels = [];
    const searchModel_ataChapter: SearchModelDto = new SearchModelDto();

    searchModel_ataChapter.value = pastedText;
    searchModel_ataChapter.operator = 'contains';
    searchModel_ataChapter.fieldName = 'Value';
    searchModel_ataChapter.caseSensitive = false;

    searchModels.push(searchModel_ataChapter);

    const event_uppercase = pastedText.toUpperCase();
    this.ataChapterSearchProxyService
      .getAtaChapterList(searchModels, event_uppercase)
      .subscribe((data) => {
        if (
          typeof data.Result !== 'undefined' &&
          data.Result !== null &&
          data.Result.length !== 0
        ) {
          // ataChapter found

          this.ataChList = data.Result;
        }
      });
  }

  authorizedERDChanged($event) {
    const searchBeginNumber = 4;
    const countErdNumber = 7;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {
      if ($event.length > countErdNumber) {
        const tempErdList = [];
        this.holderdList.forEach((erd) => {
          const event = $event.toUpperCase();

          if (erd.Value.includes(event)) {
            tempErdList.push(erd);
          }
        });
        this.erdList = tempErdList;
      } else if ($event.length === 5) {
        const searchModel_erd: SearchModelDto = new SearchModelDto();

        searchModel_erd.value = $event;
        searchModel_erd.operator = 'contains';
        searchModel_erd.fieldName = 'Value';
        searchModel_erd.caseSensitive = false;

        searchModels.push(searchModel_erd);

        const event = $event.toUpperCase();

        this.erdSearchProxyService
          .getErdList(searchModels, event)
          .subscribe((data) => {
            if (
              typeof data.Result !== 'undefined' &&
              data.Result !== null &&
              data.Result.length !== 0
            ) {
              //erd found
              this.erdList = data.Result;
              this.holderdList = data.Result;
            }
          });
      }
    } else {
      this.erdList = [];
    }
  }

  selectERD($event) {
    this.isSearchActiveForErd = false;
  }

  onPaste_erd(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    const searchModels = [];
    const searchModel_erd: SearchModelDto = new SearchModelDto();

    searchModel_erd.value = pastedText;
    searchModel_erd.operator = 'contains';
    searchModel_erd.fieldName = 'Value';
    searchModel_erd.caseSensitive = false;

    searchModels.push(searchModel_erd);

    const event_uppercase = pastedText.toUpperCase();

    this.erdSearchProxyService
      .getErdList(searchModels, event_uppercase)
      .subscribe((data) => {
        if (
          typeof data.Result !== 'undefined' &&
          data.Result !== null &&
          data.Result.length !== 0
        ) {
          //erd found
          this.erdList = data.Result;
          this.holderdList = data.Result;
        }
      });
  }

  authorizedHwPnChanged($event) {
    const searchBeginNumber = 4;
    const countHwPnNumber = 7;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {
      if ($event.length > countHwPnNumber) {
        const tempHwPnList = [];
        this.holdHwPnList.forEach((pn) => {
          const event = $event.toUpperCase();

          if (pn.Value.includes(event)) {
            tempHwPnList.push(pn);
          }
        });
        this.hwPnList = tempHwPnList;
      } else if ($event.length === 5) {
        const searchModel_pn: SearchModelDto = new SearchModelDto();

        searchModel_pn.value = $event;
        searchModel_pn.operator = 'contains';
        searchModel_pn.fieldName = 'Value';
        searchModel_pn.caseSensitive = false;

        searchModels.push(searchModel_pn);

        const event = $event.toUpperCase();

        this.hwPnSearchProxyService
          .getHwPnList(searchModels, event)
          .subscribe((data) => {
            if (
              typeof data.Result !== 'undefined' &&
              data.Result !== null &&
              data.Result.length !== 0
            ) {
              //hwPn found

              this.hwPnList = data.Result;
              this.holdHwPnList = data.Result;
            }
          });
      }
    } else {
      this.hwPnList = [];
    }
  }

  selectHwPn($event) {
    this.isSearchActiveForHwPn = false;
  }

  onPaste_HwPn(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    const searchModels = [];
    const searchModel_hwPn: SearchModelDto = new SearchModelDto();

    searchModel_hwPn.value = pastedText;
    searchModel_hwPn.operator = 'contains';
    searchModel_hwPn.fieldName = 'Value';
    searchModel_hwPn.caseSensitive = false;

    searchModels.push(searchModel_hwPn);

    const event_uppercase = pastedText.toUpperCase();

    this.hwPnSearchProxyService
      .getHwPnList(searchModels, event_uppercase)
      .subscribe((data) => {
        if (
          typeof data.Result !== 'undefined' &&
          data.Result !== null &&
          data.Result.length !== 0
        ) {
          //hwPn found

          this.hwPnList = data.Result;
          this.holdHwPnList = data.Result;
        }
      });
  }

  authorizedSlidChanged($event) {
    const searchBeginNumber = 3;
    const countSlidNumber = 6;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {
      if ($event.length > countSlidNumber) {
        const tempSlidList = [];
        this.holdSlidList.forEach((slid) => {
          const event = $event.toUpperCase();

          if (slid.Value.includes(event)) {
            tempSlidList.push(slid);
          }
        });
        this.slIdList = tempSlidList;
      } else if ($event.length === 4) {
        const searchModel_slid: SearchModelDto = new SearchModelDto();

        searchModel_slid.value = $event;
        searchModel_slid.operator = 'contains';
        searchModel_slid.fieldName = 'Value';
        searchModel_slid.caseSensitive = false;

        searchModels.push(searchModel_slid);

        const event = $event.toUpperCase();

        this.slIdSearchProxyService
          .getSlidList(searchModels, event)
          .subscribe((data) => {
            if (
              typeof data.Result !== 'undefined' &&
              data.Result !== null &&
              data.Result.length !== 0
            ) {
              //slId found

              this.slIdList = data.Result;
              this.holdSlidList = data.Result;
            }
          });
      }
    } else {
      this.slIdList = [];
    }
  }

  selectSlid($event) {
    this.isSearchActiveForSlId = false;
  }

  onPaste_Slid(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    const searchModels = [];
    const searchModel_slid: SearchModelDto = new SearchModelDto();

    searchModel_slid.value = pastedText;
    searchModel_slid.operator = 'contains';
    searchModel_slid.fieldName = 'Value';
    searchModel_slid.caseSensitive = false;

    searchModels.push(searchModel_slid);

    const event_uppercase = pastedText.toUpperCase();

    this.slIdSearchProxyService
      .getSlidList(searchModels, event_uppercase)
      .subscribe((data) => {
        if (
          typeof data.Result !== 'undefined' &&
          data.Result !== null &&
          data.Result.length !== 0
        ) {
          //slId found

          this.slIdList = data.Result;
          this.holdSlidList = data.Result;
        }
      });
  }

  authorizedSwPnChanged($event) {
    const searchBeginNumber = 4;
    const countSwPnNumber = 7;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {
      if ($event.length > countSwPnNumber) {
        const tempSwPnList = [];
        this.holdSwPnList.forEach((pn) => {
          const event = $event.toUpperCase();

          if (pn.Value.includes(event)) {
            tempSwPnList.push(pn);
          }
        });
        this.swPnList = tempSwPnList;
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
          .subscribe((data) => {
            if (
              typeof data.Result !== 'undefined' &&
              data.Result !== null &&
              data.Result.length !== 0
            ) {
              // swPn found

              this.swPnList = data.Result;
              this.holdSwPnList = data.Result;
            }
          });
      }
    } else {
      this.swPnList = [];
    }
  }

  selectSwPn($event) {
    this.isSearchActive = false;
  }

  onPaste_SwPn(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    const searchModels = [];
    const searchModel_swpn: SearchModelDto = new SearchModelDto();

    searchModel_swpn.value = pastedText;
    searchModel_swpn.operator = 'contains';
    searchModel_swpn.fieldName = 'Value';
    searchModel_swpn.caseSensitive = false;

    searchModels.push(searchModel_swpn);

    const event_uppercase = pastedText.toUpperCase();

    this.swPnServiceProxyService
      .getSwPnList(searchModels, event_uppercase)
      .subscribe((data) => {
        if (
          typeof data.Result !== 'undefined' &&
          data.Result !== null &&
          data.Result.length !== 0
        ) {
          // swPn found

          this.swPnList = data.Result;
          this.holdSwPnList = data.Result;
        }
      });
  }

  selectSWDesc($event) {
    this.isSearchActiveForSwDesc = false;
  }

  onPaste_SWDesc(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    const searchModels = [];
    const searchModel_swdesc: SearchModelDto = new SearchModelDto();

    searchModel_swdesc.value = pastedText;
    searchModel_swdesc.operator = 'contains';
    searchModel_swdesc.fieldName = 'Value';
    searchModel_swdesc.caseSensitive = false;

    searchModels.push(searchModel_swdesc);

    const event_uppercase = pastedText.toUpperCase();

    this.loadableSwProxyService
      .getSwDescList(searchModels, event_uppercase)
      .subscribe((data) => {
        if (
          typeof data.Result !== 'undefined' &&
          data.Result !== null &&
          data.Result.length !== 0
        ) {
          // swDesc found

          this.swDescList = data.Result;
          this.holdSwDescList = data.Result;
        }
      });
  }

  authorizedEoNoChanged($event) {
    const searchBeginNumber = 4;
    const countEoNoNumber = 7;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {
      if ($event.length > countEoNoNumber) {
        const tempEoNoList = [];
        this.holdEoNoList.forEach((eoNo) => {
          const event = $event.toUpperCase();

          if (eoNo.Value.includes(event)) {
            tempEoNoList.push(eoNo);
          }
        });
        this.erdList = tempEoNoList;
      } else if ($event.length === 5) {
        const searchModel_eo: SearchModelDto = new SearchModelDto();

        searchModel_eo.value = $event;
        searchModel_eo.operator = 'contains';
        searchModel_eo.fieldName = 'Value';
        searchModel_eo.caseSensitive = false;

        searchModels.push(searchModel_eo);

        const event = $event.toUpperCase();

        this.eoNumberSearchProxyService
          .getEoNoList(searchModels, event)
          .subscribe((data) => {
            if (
              typeof data.Result !== 'undefined' &&
              data.Result !== null &&
              data.Result.length !== 0
            ) {
              //eo Number found

              this.eoNumberList = data.Result;
              this.holdEoNoList = data.Result;
            }
          });
      }
    } else {
      this.eoNumberList = [];
    }
  }

  selectEoNo($event) {
    this.isSearchActiveForEoNo = false;
  }

  onPaste_EoNo(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    const searchModels = [];
    const searchModel_eono: SearchModelDto = new SearchModelDto();

    searchModel_eono.value = pastedText;
    searchModel_eono.operator = 'contains';
    searchModel_eono.fieldName = 'Value';
    searchModel_eono.caseSensitive = false;

    searchModels.push(searchModel_eono);

    const event_uppercase = pastedText.toUpperCase();

    this.eoNumberSearchProxyService
      .getEoNoList(searchModels, event_uppercase)
      .subscribe((data) => {
        if (
          typeof data.Result !== 'undefined' &&
          data.Result !== null &&
          data.Result.length !== 0
        ) {
          //eo Number found

          this.eoNumberList = data.Result;
          this.holdEoNoList = data.Result;
        }
      });
  }

  authorizedStatusChanged($event) {
    const searchBeginNumber = 2;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {
      const searchModel_status: SearchModelDto = new SearchModelDto();

      searchModel_status.value = $event;
      searchModel_status.operator = 'contains';
      searchModel_status.fieldName = 'Value';
      searchModel_status.caseSensitive = false;

      searchModels.push(searchModel_status);

      const event = $event.toUpperCase();

      this.statusSearchProxyService
        .getStatusList(searchModels, event)
        .subscribe((data) => {
          if (
            typeof data.Result !== 'undefined' &&
            data.Result !== null &&
            data.Result.length !== 0
          ) {
            // status found

            this.statusList = data.Result;
          }
        });
    }
  }

  selectStatus($event) {
    this.isSearchActiveForStatus = false;
  }

  onPaste_Status(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    const searchModels = [];
    const searchModel_status: SearchModelDto = new SearchModelDto();

    searchModel_status.value = pastedText;
    searchModel_status.operator = 'contains';
    searchModel_status.fieldName = 'Value';
    searchModel_status.caseSensitive = false;

    searchModels.push(searchModel_status);

    const event_uppercase = pastedText.toUpperCase();

    this.statusSearchProxyService
      .getStatusList(searchModels, event_uppercase)
      .subscribe((data) => {
        if (
          typeof data.Result !== 'undefined' &&
          data.Result !== null &&
          data.Result.length !== 0
        ) {
          // status found

          this.statusList = data.Result;
        }
      });
  }

  async searchListWParameters(keepGridRowDataDummy: any[]) {
    this.gridRowDataDummy = keepGridRowDataDummy;

    const filteredAcRegArray = [];
    const filteredAtaChArray = [];
    const filteredErdArray = [];
    const filteredHwPnArray = [];
    const filteredSlIdArray = [];
    const filteredSwPnArray = [];
    const filteredSwDescArray = [];
    const filteredEoNoArray = [];
    const filteredStatusArray = [];

    if (
      this.acReg.value !== '' &&
      this.acReg.value !== null &&
      this.gridRowDataDummy.length !== 0
    ) {
      //if acReg selected
      for (let x = 0; x < this.gridRowDataDummy.length; x++) {
        for (let y = 0; y < this.acReg.value.length; y++) {
          //if acReg selected
          if (this.acReg.value[y].Value === this.gridRowDataDummy[x]['AcReg']) {
            filteredAcRegArray.push(this.gridRowDataDummy[x]);
          }
        }
      }
      this.gridRowDataDummy = [];
      this.gridRowDataDummy = filteredAcRegArray;
    }

    if (
      this.ataCh.value !== '' &&
      this.ataCh.value !== null &&
      this.gridRowDataDummy.length !== 0
    ) {
      //if ataChapter selected
      for (let x = 0; x < this.gridRowDataDummy.length; x++) {
        for (let y = 0; y < this.ataCh.value.length; y++) {
          //if ataChapter selected
          if (
            this.ataCh.value[y].Value === this.gridRowDataDummy[x]['Chapter']
          ) {
            filteredAtaChArray.push(this.gridRowDataDummy[x]);
          }
        }
      }

      this.gridRowDataDummy = filteredAtaChArray;
    }

    if (
      this.erd.value !== '' &&
      this.erd.value !== null &&
      this.gridRowDataDummy.length !== 0
    ) {
      //if Erd selected

      for (let x = 0; x < this.gridRowDataDummy.length; x++) {
        for (let y = 0; y < this.erd.value.length; y++) {
          // if erd selected
          if (this.erd.value[y].Value === this.gridRowDataDummy[x]['Erd']) {
            filteredErdArray.push(this.gridRowDataDummy[x]);
          }
        }
      }

      this.gridRowDataDummy = filteredErdArray;
    }

    if (
      this.hwPn.value !== '' &&
      this.hwPn.value !== null &&
      this.gridRowDataDummy.length !== 0
    ) {
      //if Hw Pn selected
      for (let x = 0; x < this.gridRowDataDummy.length; x++) {
        for (let y = 0; y < this.hwPn.value.length; y++) {
          //if Hw Pn selected
          if (this.hwPn.value[y].Value === this.gridRowDataDummy[x]['HwPn']) {
            filteredHwPnArray.push(this.gridRowDataDummy[x]);
          }
        }
      }

      this.gridRowDataDummy = filteredHwPnArray;
    }

    if (
      this.slid.value !== '' &&
      this.slid.value !== null &&
      this.gridRowDataDummy.length !== 0
    ) {
      //if SlId selected
      for (let x = 0; x < this.gridRowDataDummy.length; x++) {
        for (let y = 0; y < this.slid.value.length; y++) {
          //if SlId selected
          if (this.slid.value[y].Value === this.gridRowDataDummy[x]['SlId']) {
            filteredSlIdArray.push(this.gridRowDataDummy[x]);
          }
        }
      }

      this.gridRowDataDummy = filteredSlIdArray;
    }

    if (
      this.swPn.value !== '' &&
      this.swPn.value !== null &&
      this.gridRowDataDummy.length !== 0
    ) {
      //if SwPn selected
      for (let x = 0; x < this.gridRowDataDummy.length; x++) {
        for (let y = 0; y < this.swPn.value.length; y++) {
          //if SwPn selected
          if (this.swPn.value[y].Value === this.gridRowDataDummy[x]['SwPn']) {
            filteredSwPnArray.push(this.gridRowDataDummy[x]);
          }
        }
      }

      this.gridRowDataDummy = filteredSwPnArray;
    }

    if (
      this.swDesc.value !== '' &&
      this.swDesc.value !== null &&
      this.gridRowDataDummy.length !== 0
    ) {
      //if SwDesc selected
      for (let x = 0; x < this.gridRowDataDummy.length; x++) {
        for (let y = 0; y < this.swDesc.value.length; y++) {
          //if SwDesc selected
          if (
            this.swDesc.value[y].Value ===
            this.gridRowDataDummy[x]['SwDescription']
          ) {
            filteredSwDescArray.push(this.gridRowDataDummy[x]);
          }
        }
      }

      this.gridRowDataDummy = filteredSwDescArray;
    }

    if (
      this.eoNo.value !== '' &&
      this.eoNo.value !== null &&
      this.gridRowDataDummy.length !== 0
    ) {
      //if Eo Number selected
      for (let x = 0; x < this.gridRowDataDummy.length; x++) {
        for (let y = 0; y < this.eoNo.value.length; y++) {
          //if Eo Number selected
          if (this.eoNo.value[y].Value === this.gridRowDataDummy[x]['EoNo']) {
            filteredEoNoArray.push(this.gridRowDataDummy[x]);
          }
        }
      }

      this.gridRowDataDummy = filteredEoNoArray;
    }

    if (
      this.status.value !== '' &&
      this.status.value !== null &&
      this.gridRowDataDummy.length !== 0
    ) {
      //if status selected
      for (let x = 0; x < this.gridRowDataDummy.length; x++) {
        for (let y = 0; y < this.status.value.length; y++) {
          //if status selected
          if (
            this.status.value[y].Value === this.gridRowDataDummy[x]['Status']
          ) {
            filteredStatusArray.push(this.gridRowDataDummy[x]);
          }
        }
      }

      this.gridRowDataDummy = filteredStatusArray;
    }

    console.log('djdj', this.gridRowDataDummy);

    const filteredGridRowDataDummy = this.gridRowDataDummy.filter(
      (el, i, a) => i === a.indexOf(el)
    ); //remove duplicates

    this.gridRowData = filteredGridRowDataDummy;

    this.simpleGrid.gridApi.setRowData(filteredGridRowDataDummy);
  }

  async onBtSearch() {
    this.loadSoftwareList();
  }

  onPaste_Search($event) {}

  onExcelExport() {
    let filteredRows: any[] = [];

    this.simpleGrid.gridApi.forEachNodeAfterFilter((node) => {
      filteredRows.push(node.data);
    });

    let cleanedData;

    if (filteredRows.length !== 0) {
      cleanedData = filteredRows.map((data) => [
        data.AcReg,
        data.Chapter,
        data.Erd,
        data.ErdDescription,
        data.HwPn,
        data.HwDescription,
        data.SlId,
        data.SlDescription,
        data.SwPn,
        data.SwDescription,
        data.EoNo,
        data.Status,
        data.Remarks,
      ]);
    } else {
      cleanedData = this.gridRowDataDummy.map((data) => [
        data.AcReg,
        data.Chapter,
        data.Erd,
        data.ErdDescription,
        data.HwPn,
        data.HwDescription,
        data.SlId,
        data.SlDescription,
        data.SwPn,
        data.SwDescription,
        data.EoNo,
        data.Status,
        data.Remarks,
      ]);
    }

    const tableHeaders: Array<string> = this.gridColumnDefs.map(
      (x) => x.headerName
    );

    const fileName = 'SW LIST - ' + formatDate(new Date(), 'yyyy/MM/dd', 'en');

    this.excelService.generateExcelAndExport(
      cleanedData,
      tableHeaders,
      fileName
    );
  }

  simpleExportToPdf() {
    let filteredRows: any[] = [];

    this.simpleGrid.gridApi.forEachNodeAfterFilter((node) => {
      filteredRows.push(node.data);
    });

    let cleanedData;

    if (filteredRows.length !== 0) {
      cleanedData = filteredRows.map((data) => [
        data.AcReg,
        data.Chapter,
        data.Erd,
        data.ErdDescription,
        data.HwPn,
        data.HwDescription,
        data.SlId,
        data.SlDescription,
        data.SwPn,
        data.SwDescription,
        data.EoNo,
        data.Status,
        data.Remarks,
      ]);
    } else {
      cleanedData = this.gridRowDataDummy.map((data) => [
        data.AcReg,
        data.Chapter,
        data.Erd,
        data.ErdDescription,
        data.HwPn,
        data.HwDescription,
        data.SlId,
        data.SlDescription,
        data.SwPn,
        data.SwDescription,
        data.EoNo,
        data.Status,
        data.Remarks,
      ]);
    }

    const tableHeaders: Array<string[]> = this.gridColumnDefs.map(
      (x) => x.headerName
    );

    this.pdfService.createSimplePdf(tableHeaders, cleanedData, 'SimpleData');
  }

  getSelectedDropdown() {}

  onQuickFilterChanged() {
    this.simpleGrid.onQuickFilterChanged();
  }

  getSelectedRows() {
    this.acRegArrayWCount = [];
    var uniqueList = this.selectedRowDatas.reduce((tags, item) => {
      tags[item.AcReg] = tags[item.AcReg] || 0;
      tags[item.AcReg]++;
      return tags;
    }, {});

    this.acRegArrayWCount = Object.keys(uniqueList).map(function (key) {
      return [String(key), uniqueList[key]];
    });
  }

  openEditPopup() {
    if (this.selectedRowDatas === undefined || this.selectedRowDatas === null) {
      this.notify.warn('Please select at least one software', 'WARNING');
    } else {
      this.getSelectedRows();

      this.editModal.show(
        this.acRegArrayWCount,
        this.selectedRowDatas,
        this.simpleGrid
      );
    }
  }

  openDeletePopUp() {
    if (this.selectedRowDatas === undefined || this.selectedRowDatas === null) {
      this.notify.warn('Please select at least one software', 'WARNING');
    } else {
      this.getSelectedRows();

      this.deleteModal.show(
        this.acRegArrayWCount,
        this.selectedRowDatas,
        this.simpleGrid
      );
    }
  }

  selectedRows(selectedRows: any[]) {
    this.selectedRowDatas = selectedRows;
  }

  resetSearch() {
    this.acReg.setValue(null);
    this.ataCh.setValue(null);
    this.erd.setValue(null);
    this.hwPn.setValue(null);
    this.slid.setValue(null);
    this.swPn.setValue(null);
    this.eoNo.setValue(null);
    this.status.setValue(null);

    this.simpleGrid.gridApi.setRowData(this.keepGridRowDataDummy);
  }

  get acReg() {
    return this.form.get('acReg');
  }

  get ataCh() {
    return this.form.get('ataCh');
  }

  get erd() {
    return this.form.get('erd');
  }

  get hwPn() {
    return this.form.get('hwPn');
  }

  get slid() {
    return this.form.get('slid');
  }

  get swPn() {
    return this.form.get('swPn');
  }

  get swDesc() {
    return this.form.get('swDesc');
  }

  get eoNo() {
    return this.form.get('eoNo');
  }

  get status() {
    return this.form.get('status');
  }
}
