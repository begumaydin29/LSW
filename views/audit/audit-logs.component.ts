import {
  Component,
  OnInit,
  Injector,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { pgOptionComponent } from '.pages/@pages/components/select/option.component';
import { AuditFactory } from '@shared/auidit/audit-factory';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';
import { FormGroup, FormControl } from '@angular/forms';
import { IAudit } from '@shared/auidit/audit-base';
import { ActiveTailNumberProxyService } from '@app/lsw/services/active-tail-number/active-tail-number-proxy.service';
import { LoadableSwProxyService } from '@app/lsw/services/loadable-sw/loadable-sw-proxy.service';
import { SearchModelDto } from '@shared/models/search-model-dto';
import { EquipmentProxyService } from '@app/lsw/services/equipment/equipment-proxy.service';
import { EquipmentKeyProxyService } from '@app/lsw/services/equipment-key/equipment-key-proxy.service';
import { SlIdSearchProxyService } from '@app/lsw/services/lookup-search-services/slId-search/slId-search-proxy.service';
import { AcRegSearchProxyService } from '@app/lsw/services/lookup-search-services/acReg-search/acReg-search-proxy.service';
import { ExcelService } from '@app/services/excel/excel.service';
import { PdfService } from '@app/services/pdf/pdf.service';

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [pgOptionComponent],
})
export class AduitLogsComponent extends AppComponentBase implements OnInit {
  @ViewChild(SimpleGridComponent, { static: false })
  simpleGrid: SimpleGridComponent;
  form: FormGroup;
  selectedAuditType: IAudit;
  auditTypes: any;
  isLoaded: boolean;
  tailNumberList: string[] = [];

  allAcReg;
  allSwPn;
  allEquipmentKey;
  dropdownSettings_tailNumber = {};
  dropdownSettings = {};
  dropdownSettings_EqKey = {};

  gridFullSearch = '';
  gridPageSize = 50;
  gridStyle = { width: '100%', height: '800px' };

  constructor(
    injector: Injector,
    private acRegSearchProxyService: AcRegSearchProxyService,
    private activeTailNumberProxyService: ActiveTailNumberProxyService,
    private loadableSwProxyService: LoadableSwProxyService,
    private equipmentKeyProxyService: EquipmentKeyProxyService,
    private excelService: ExcelService,
    private pdfService: PdfService
  ) {
    super(injector);

    this.isLoaded = true;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      auditType: new FormControl(null),
      tailNumber: new FormControl(null),
      SoftwarePnInput: new FormControl(''),
      ErdInput: new FormControl(''),
      HardwareErdInput: new FormControl(''),
      SlidInput: new FormControl(''),
    });

    this.auditTypes = [
      { value: 'Software', name: 'Software' },
      { value: 'Hardware', name: 'Equipment Key' },
    ];

    this.dropdownSettings_tailNumber = {
      singleSelection: false,
      idField: 'Name',
      textField: 'Value',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'Name',
      textField: 'Value',
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };

    this.dropdownSettings_EqKey = {
      singleSelection: true,
      idField: 'EquipmentKey',
      textField: 'EquipmentKey',
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };

    this.GetAllParametersFromAPI();
  }

  async GetAllParametersFromAPI() {
    const startIndex = 10;

    const allAcReg = await this.acRegSearchProxyService
      .getAllAirplaneList(startIndex)
      .toPromise();

    if (allAcReg.Success) {
      this.allAcReg = allAcReg.Result;
    }

    const allSwPn = await this.loadableSwProxyService
      .getLoadableSwAllPartNumbers()
      .toPromise();

    if (allSwPn.Success) {
      this.allSwPn = allSwPn.Result;
    }

    const allEquipmentKey = await this.equipmentKeyProxyService
      .getAllEquipmentKeys()
      .toPromise();

    if (allEquipmentKey.Success) {
      this.allEquipmentKey = allEquipmentKey.Result;
    }
  }

  onSelectAllAcReg($event) {}

  onSelectSwPn(items: any) {
    console.log(items);
  }

  onSelectEquipmentKey(items: any) {
    console.log(items);
  }

  selectACReg($event) {}

  selectSwPn($event) {}

  selectEquipmentKey($event) {}

  async onAuditTypeChange($event) {
    if (this.form.get('auditType').value != 'null') {
      this.selectedAuditType = AuditFactory.getInstance(
        this.form.get('auditType').value
      );
    } else {
      this.selectedAuditType = null;
    }

    let result = await this.activeTailNumberProxyService
      .getActiveTailNumbers()
      .toPromise();
    if (result.Success) {
      this.tailNumberList = result.Result;
    }
  }

  async onBtnReset() {
    this.isLoaded = true;
    this.form.get('auditType').setValue(null);
    this.form.get('tailNumber').setValue(null);
    this.form.get('SoftwarePnInput').setValue(null);
    this.form.get('HardwareErdInput').setValue(null);
  }

  async onBtnSearch() {
    this.selectedAuditType.clearSearchValues();
    if (this.selectedAuditType == null) {
      this.selectedAuditType = AuditFactory.getInstance(
        this.form.get('auditType').value
      );
    }

    this.isLoaded = false;
    this.simpleGrid.gridApi.setColumnDefs(this.selectedAuditType.columns);

    if (this.selectedAuditType.name == 'Software') {
      this.selectedAuditType.addSearchValue(
        'SwPn',
        this.form.get('SoftwarePnInput').value
      );
    }

    if (this.selectedAuditType.name == 'Hardware') {
      this.selectedAuditType.addSearchValue(
        'HwErd',
        this.form.get('HardwareErdInput').value
      );
    }

    if (this.selectedAuditType.name == 'SoftwareLocation') {
      this.selectedAuditType.addSearchValue(
        'SwLocationValue',
        this.form.get('SlidInput').value
      );
    }

    this.selectedAuditType.addSearchValue(
      'TailNumber',
      this.form.get('tailNumber').value
    );
    this.selectedAuditType.filter('').subscribe(async (response) => {
      this.simpleGrid.gridApi.setRowData(response.Result);
    });
  }

  onExcelExport() {
    let tableHeaders: Array<string> = [];
    let filteredRows: any[] = [];

    this.simpleGrid.gridApi.forEachNodeAfterFilter((node) => {
      filteredRows.push(node.data);
    });

    let cleanedData;

    if (this.selectedAuditType.name == 'Software') {
      if (filteredRows.length !== 0) {
        cleanedData = filteredRows.map((data) => [
          data.TailNumber,
          data.EquipmentKey,
          data.Slid,
          data.SwPn,
          data.SwPnDescription,
          data.BeforeSwPn,
          data.BeforeSwPnDescription,
          data.EoNumber,
          data.EoRevision,
          data.ActivePassive,
          data.CreatedBy,
          data.CreatedDate,
          data.ModifiedBy,
          data.ModifiedDate,
        ]);
      } else {
        if (this.simpleGrid.gridRowData !== undefined) {
          cleanedData = this.simpleGrid.gridRowData.map((data) => [
            data.TailNumber,
            data.EquipmentKey,
            data.Slid,
            data.SwPn,
            data.SwPnDescription,
            data.BeforeSwPn,
            data.BeforeSwPnDescription,
            data.EoNumber,
            data.EoRevision,
            data.ActivePassive,
            data.CreatedBy,
            data.CreatedDate,
            data.ModifiedBy,
            data.ModifiedDate,
          ]);
        } else {
          cleanedData = [];
        }
      }

      const columns: Array<string> = [];

      columns.push('A/C REG');
      columns.push('EQUIPMENT KEY');
      columns.push('SLID');
      columns.push('SW PN');
      columns.push('SW PN DESC');
      columns.push('BEFORE SW PN');
      columns.push('BEFORE SW PN DESC');
      columns.push('EO NUMBER');
      columns.push('EO REVISION');
      columns.push('ACT. – PSV.');
      columns.push('CREATED BY');
      columns.push('CREATED DATE');
      columns.push('MODIFIED BY');
      columns.push('MODIFIED DATE');

      tableHeaders = columns.map((x) => x);
    } else if (this.selectedAuditType.name == 'Hardware') {
      if (filteredRows.length !== 0) {
        cleanedData = filteredRows.map((data) => [
          data.TailNumber,
          data.BeforeEquipmentKey,
          data.EquipmentKey,
          data.Slid,
          data.SwPn,
          data.SwPnDescription,
          data.EoNumber,
          data.EoRevision,
          data.ActivePassive,
          data.CreatedBy,
          data.CreatedDate,
          data.ModifiedBy,
          data.ModifiedDate,
        ]);
      } else {
        if (this.simpleGrid.gridRowData !== undefined) {
          cleanedData = this.simpleGrid.gridRowData.map((data) => [
            data.TailNumber,
            data.BeforeEquipmentKey,
            data.EquipmentKey,
            data.Slid,
            data.SwPn,
            data.SwPnDescription,
            data.EoNumber,
            data.EoRevision,
            data.ActivePassive,
            data.CreatedBy,
            data.CreatedDate,
            data.ModifiedBy,
            data.ModifiedDate,
          ]);
        } else {
          cleanedData = [];
        }
      }
      const columns: Array<string> = [];

      columns.push('A/C REG');
      columns.push('BEFORE EQUIPMENT KEY');
      columns.push('EQUIPMENT KEY');
      columns.push('SLID');
      columns.push('SW PN');
      columns.push('SW PN DESC');
      columns.push('EO NUMBER');
      columns.push('EO REVISION');
      columns.push('ACT. – PSV.');
      columns.push('CREATED BY');
      columns.push('CREATED DATE');
      columns.push('MODIFIED BY');
      columns.push('MODIFIED DATE');

      tableHeaders = columns.map((x) => x);
    }

    this.excelService.generateExcelAndExport(cleanedData, tableHeaders);
  }
}
