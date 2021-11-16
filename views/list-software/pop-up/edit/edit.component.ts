import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditConfirmComponent } from './pop-up/edit-confirm/edit-confirm.component';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';
import { KeySearchProxyService } from '@app/lsw/services/lookup-search-services/key-search/key-search-proxy.service';
import { SearchModelDto } from '@shared/models/search-model-dto';
import { SlIdSearchProxyService } from '@app/lsw/services/lookup-search-services/slId-search/slId-search-proxy.service';
import { SwPnServiceProxyService } from '@app/lsw/services/lookup-search-services/swPn-search/swPn-service-proxy.service';
import { Console } from 'console';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  simpleGrid: SimpleGridComponent;

  @ViewChild('edit', { static: false }) editModal: ModalDirective;
  @ViewChild('editConfirm', { static: false }) editConfirmModal: EditConfirmComponent;


  acRegArrayWCount: any[] = [];
  selectedRowDatas: any[] = [];

  isEoNoExistForSingleSelection: boolean;
  isEoNoSame: boolean;

  eoNoValue = '';
  statusValue = '';

  swDescValue = '';

  keyList: any[];
  slIdList: any[];
  swPnList: any[];

  swPnValue;

  constructor(private keySearchProxyService: KeySearchProxyService,
    private slIdSearchProxyService: SlIdSearchProxyService,
    private swPnServiceProxyService: SwPnServiceProxyService,) {
  }

  ngOnInit() {

    this.form = new FormGroup({
      erd: new FormControl(""),
      slId: new FormControl(""),
      swPn: new FormControl(""),
      swDesc: new FormControl(""),
      eoNo: new FormControl(""),
      status: new FormControl(""),
      remarks: new FormControl(""),

    });
  }

  onChanges(): void {
    this.form.get('swPn').valueChanges.subscribe(async val => {

      if (val !== null && val !== undefined) {
        const swDesc = await this.decideSwDescriptionBySwPn(val);
        this.swDesc.setValue(swDesc);
      }

    });
  }

  async decideSwDescriptionBySwPn(swPn) {

    const result = await this.swPnServiceProxyService.getSwPnDescriptionBySwPn(swPn).toPromise();

    if (result.Success) {
      if (result.Result !== null) {
        return result.Result.Description;
      } else {
        return null;
      }
    } else {
      return null;
    }

  }

  show(acRegArrayWCount, selectedRowDatas, simpleGrid) {

    this.erd.setValue('');
    this.slId.setValue('');
    this.swPn.setValue('');
    this.swDesc.setValue('');
    this.eoNo.setValue('');
    this.status.setValue('');
    this.remarks.setValue('');

    this.setValuesOfEditPopUp(acRegArrayWCount, selectedRowDatas, simpleGrid);

    this.editModal.show();
  }

  close() {
    this.editModal.hide();

  }

  setValuesOfEditPopUp(acRegArrayWCount, selectedRowDatas, simpleGrid) {
    this.simpleGrid = simpleGrid;
    this.acRegArrayWCount = acRegArrayWCount;
    this.selectedRowDatas = selectedRowDatas;

    this.decideSelectionAndEoNo(this.selectedRowDatas);
    this.onChanges();
  }

  decideSelectionAndEoNo(selectedRowDatas) {

    if (selectedRowDatas.length === 1) { // single selection

      if (selectedRowDatas[0]['EoNo'] !== '-') {
        this.isEoNoExistForSingleSelection = true;

        this.eoNoValue = this.selectedRowDatas[0]['EoNo'];
        this.statusValue = this.selectedRowDatas[0]['Status'];

      } else {
        this.isEoNoExistForSingleSelection = false;
        this.eoNoValue = '-';
        this.statusValue = '-';

      }
    } else { // multiple selection
      this.isEoNoExistForSingleSelection = false;

      if (selectedRowDatas.every(data => data['EoNo'] === selectedRowDatas[0]['EoNo']) && selectedRowDatas.every(data => data['Status'] === selectedRowDatas[0]['Status'])) {
        this.isEoNoSame = true;

        this.eoNoValue = this.selectedRowDatas[0]['EoNo'];
        this.statusValue = this.selectedRowDatas[0]['Status'];
      } else {
        this.isEoNoSame = false;
        this.eoNoValue = '-';
        this.statusValue = '-';
      }

    }

  }

  editSelected() {

    this.editConfirmModal.show(this.simpleGrid, this.acRegArrayWCount, this.selectedRowDatas,
      this.erd.value, this.slId.value, this.swPn.value, this.swDesc.value, this.eoNo.value, this.statusValue, this.remarks.value);
  }

  getSelectedDropdown(link) {

    if (link === '1') {
      this.statusValue = "OPEN";
    }
    else if (link === '2') {
      this.statusValue = "TERMINATED";
    }
    else if (link === '3') {
      this.statusValue = "PENDING";
    }
    else if (link === '4') {
      this.statusValue = "REJECTED";
    }
    else if (link === '5') {
      this.statusValue = "CANCEL";
    }
    else if (link === '6') {
      this.statusValue = "N/A";
    }
  }

  authorizedERDChanged($event) {

    const searchBeginNumber = 2;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {

      const searchModel_key: SearchModelDto = new SearchModelDto();

      searchModel_key.value = $event;
      searchModel_key.operator = 'contains';
      searchModel_key.fieldName = 'Value';
      searchModel_key.caseSensitive = false;

      searchModels.push(searchModel_key);

      this.keySearchProxyService.postBySearchModel(searchModels).subscribe(data => {

        if (typeof data.Result !== 'undefined' && data.Result !== null && data.Result.length !== 0) { //key found

          this.keyList = data.Result;
        }
      });
    }

  }

  selectErd($event) {

  }

  authorizedHwChanged($event) {

  }

  selectHw($event) {

  }

  authorizedSwPnChanged($event) {

    const searchBeginNumber = 2;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {

      const searchModel_key: SearchModelDto = new SearchModelDto();

      searchModel_key.value = $event;
      searchModel_key.operator = 'contains';
      searchModel_key.fieldName = 'Value';
      searchModel_key.caseSensitive = false;

      searchModels.push(searchModel_key);

      const event = $event.toUpperCase();

      this.swPnServiceProxyService.getSwPnList(searchModels, event).subscribe(data => {

        if (typeof data.Result !== 'undefined' && data.Result !== null && data.Result.length !== 0) { //key found

          this.swPnList = data.Result;
        }
      });
    }
  }

  selectSwPn($event) {

  }

  authorizedEoNoChanged($event) {

  }

  selectEoNo($event) {

  }

  selectSlId($event) {

  }

  authorizedSlIdChanged($event) {

    const searchBeginNumber = 2;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {

      const searchModel_key: SearchModelDto = new SearchModelDto();

      searchModel_key.value = $event;
      searchModel_key.operator = 'contains';
      searchModel_key.fieldName = 'Value';
      searchModel_key.caseSensitive = false;

      searchModels.push(searchModel_key);

      const event = $event.toUpperCase();

      this.slIdSearchProxyService.getSlidList(searchModels, event).subscribe(data => {

        if (typeof data.Result !== 'undefined' && data.Result !== null && data.Result.length !== 0) { // key found

          this.slIdList = data.Result;
        }
      });
    }


  }

  get erd() {
    return this.form.get("erd");
  }

  get slId() {
    return this.form.get("slId");
  }

  get swPn() {
    return this.form.get("swPn");
  }

  get swDesc() {
    return this.form.get("swDesc");
  }

  get eoNo() {
    return this.form.get("eoNo");
  }

  get status() {
    return this.form.get("status");
  }

  get remarks() {
    return this.form.get("remarks");
  }

}
