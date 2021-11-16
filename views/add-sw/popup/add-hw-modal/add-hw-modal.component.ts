import { Component, OnInit, ViewChild } from '@angular/core';
import { ActiveTailNumberDto } from '@app/lsw/models/active-tail-number-dto';
import { ActiveTailNumberProxyService } from '@app/lsw/services/active-tail-number/active-tail-number-proxy.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErdProxyService } from '@app/lsw/services/erd/erd-proxy.service';
import { ErdDescriptionProxyService } from '@app/lsw/services/erd-description/erd-description-proxy.service';
import { ErdDescriptionDto } from '@app/lsw/models/erd-description-dto';
import { HwPnProxyService } from '@app/lsw/services/hwPn/hwPn-proxy.service';
import { HwPnDto } from '@app/lsw/models/hwPn-dto';
import { HwDescProxyService } from '@app/lsw/services/hwDesc/hwDesc-proxy.service';
import { AirplaneIdByTailNumberProxyService } from '@app/lsw/services/airplaneId-by-tailNumber/airplaneId-by-tailNumber-proxy.service';
import { SearchModelDto } from '@shared/models/search-model-dto';
import { AddHwConfirmComponent } from '@app/lsw/views/add/add-hw/popup/add-hw-confirm/add-hw-confirm.component';
import { ModalDirective } from 'ngx-bootstrap';
import { AcRegSearchProxyService } from '@app/lsw/services/lookup-search-services/acReg-search/acReg-search-proxy.service';

@Component({
  selector: 'app-add-hw-modal',
  templateUrl: './add-hw-modal.component.html',
  styleUrls: ['./add-hw-modal.component.css'],
})
export class AddHwModalComponent implements OnInit {
  form: FormGroup;

  regList: ActiveTailNumberDto[] = [];
  erdList: any[] = [];
  erds: any[] = [];
  erdDescList: ErdDescriptionDto[] = [];
  hwPnList: HwPnDto[] = [];

  isACRegSelected: boolean = false;

  ataChValue: any;

  submitted: boolean = false;

  isErdManuelEntry: boolean = false;

  isHwPnManuelEntry: boolean = false;

  holdAirplaneList: string[] = [];

  isSaveSuccessful: boolean = false;
  saveSuccessMessage: string;
  saveErrorMessage: string[] = [];
  isSaveError: boolean = false;

  dropdownSettings = {};

  @ViewChild('addHw', { static: false }) addHwModal: ModalDirective;
  @ViewChild('confirmAddHw', { static: false })
  addHwConfirmModal: AddHwConfirmComponent;
  @ViewChild('manuelErd', { static: false }) manuelErd;
  @ViewChild('selectableErd', { static: false }) selectableErd;
  @ViewChild('manuelHwPn', { static: false }) manuelHwPn;
  @ViewChild('selectableHwPn', { static: false }) selectableHwPn;

  constructor(
    private activeTailNumberProxyService: ActiveTailNumberProxyService,
    private erdProxyService: ErdProxyService,
    private acRegSearchProxyService: AcRegSearchProxyService,
    private erdDescriptionProxyService: ErdDescriptionProxyService,
    private hwPnProxyService: HwPnProxyService,
    private hwDescProxyService: HwDescProxyService,
    private airplaneIdByTailNumberProxyService: AirplaneIdByTailNumberProxyService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      acSeries: new FormControl(''),
      acReg: new FormControl('', Validators.required),
      erd: new FormControl('', Validators.required),
      erdText: new FormControl('', Validators.required),
      erdDesc: new FormControl('', Validators.required),
      erdDescText: new FormControl('', Validators.required),
      erdDescSelectedText: new FormControl('', Validators.required),
      hwPn: new FormControl('', Validators.required),
      hwPnText: new FormControl('', Validators.required),
      hwDesc: new FormControl('', Validators.required),
      hwDescText: new FormControl('', Validators.required),
      hwDescSelectedText: new FormControl('', Validators.required),
      ataCh: new FormControl('', Validators.required),
    });

    this.GetAcRegList();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Name',
      textField: 'Value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  async GetAcRegList() {
    const startIndex = 10;
    const allAcReg = await this.acRegSearchProxyService
      .getAllAirplaneList(startIndex)
      .toPromise();

    if (allAcReg.Success) {
      const regList_ = allAcReg.Result;
      this.regList = regList_.sort((a, b) =>
        a.TailNumber > b.TailNumber ? 1 : -1
      );
    }
  }

  getSelectedDropdown() {}

  onSelectAllAcReg(items: any) {
    console.log(items);
    this.isACRegSelected = true;
  }

  onDeSelectAllAcReg(items: any) {
    console.log(items);
    this.disableControls();
  }

  async authorizedACRegChanged($event) {
    const searchBeginNumber = 2;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {
      const result = await this.activeTailNumberProxyService
        .listAcReg()
        .toPromise();

      if (result.Success) {
        const regList_ = result.Result;

        this.regList = regList_.sort((a, b) =>
          a.TailNumber > b.TailNumber ? -1 : 1
        );
      }
    }
  }

  selectACReg($event) {
    this.isACRegSelected = true;
  }

  acRegRemove($event) {
    this.disableControls();
  }

  async authorizedERDChanged($event) {
    const searchBeginNumber = 2;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {
      const searchModel_erd: SearchModelDto = new SearchModelDto();

      searchModel_erd.value = $event;
      searchModel_erd.operator = 'contains';
      searchModel_erd.fieldName = 'Value';
      searchModel_erd.caseSensitive = false;

      searchModels.push(searchModel_erd);

      const event = $event.toUpperCase();

      const result = await this.erdProxyService
        .getEquipmentReferenceDesignatorList(searchModels, event)
        .toPromise();

      if (result.Success && result.Result.length !== 0) {
        this.erdList = result.Result;
      }
    }
  }

  selectErd($event) {
    this.erd.valueChanges.subscribe(async (change) => {
      if (change != null) {
        let result = await this.authorizedErdDesc();

        if (result !== null) {
          this.erdDescSelectedText.setValue(result);
        } else {
          this.erdDescSelectedText.setValue('-');
        }
      }
    });
  }

  removeErdSearch($event) {
    if ($event) {
      this.erdDescSelectedText.setValue(null);
    }
  }

  async authorizedErdDesc() {
    let result = await this.erdDescriptionProxyService
      .getErdDescriptionByTailNumber(this.acReg.value, this.erd.value)
      .toPromise();

    if (result.Success) {
      return result.Result;
    }
  }

  selectHw($event) {
    this.hwPn.valueChanges.subscribe(async (change) => {
      if (change != null) {
        let result = await this.authorizedHwDescChanged();

        if (result !== null) {
          this.hwDescSelectedText.setValue(result);
        } else {
          this.hwDescSelectedText.setValue('-');
        }
      }
    });
  }

  async authorizedHwChanged($event) {
    const searchBeginNumber = 2;
    const searchModels = [];

    if ($event && $event.length > searchBeginNumber) {
      const searchModel_erd: SearchModelDto = new SearchModelDto();

      searchModel_erd.value = $event;
      searchModel_erd.operator = 'contains';
      searchModel_erd.fieldName = 'Value';
      searchModel_erd.caseSensitive = false;

      searchModels.push(searchModel_erd);

      const event = $event.toUpperCase();

      const result = await this.hwPnProxyService
        .getHwPnList(searchModels, event)
        .toPromise();

      if (result.Success && result.Result.length !== 0) {
        this.hwPnList = result.Result;
      }
    }
  }

  removeHwPnSearch($event) {
    if ($event) {
      this.hwDescSelectedText.setValue(null);
    }
  }

  async getAirplaneIdList() {
    const tailNumberList = this.acReg.value;
    let airplaneIdList: number[] = [];

    for (const tn of tailNumberList) {
      let res = await this.airplaneIdByTailNumberProxyService
        .getAirplaneIdByTailNumber(tn['Value'])
        .toPromise();

      if (res.Success) {
        airplaneIdList.push(res.Result['Airplane_Id']);
      }
    }

    return airplaneIdList;
  }
  async authorizedHwDescChanged() {
    const airplaneIdList = await this.getAirplaneIdList();

    const result = await this.hwDescProxyService
      .getHwPnDescription(this.hwPn.value)
      .toPromise();

    if (result.Success) {
      return result.Result;
    }
  }

  selectHwDesc($event) {}

  disableControls() {
    this.isACRegSelected = false;
  }

  clearAllData() {
    if (confirm('Are you sure to clear them "ALL"?')) {
      this.form.reset();
      this.disableControls();
      this.submitted = false;
    }
  }

  handleChangeforManuelErd(evt) {
    this.manuelErd.nativeElement.checked = true;
    this.isErdManuelEntry = true;
  }

  handleChangeforSelectableErd(evt) {
    this.selectableErd.nativeElement.checked = true;
    this.isErdManuelEntry = false;
  }

  handleChangeforManuelHwPn(evt) {
    this.manuelHwPn.nativeElement.checked = true;
    this.isHwPnManuelEntry = true;
  }

  handleChangeforSelectableHwPn(evt) {
    this.selectableHwPn.nativeElement.checked = true;
    this.isHwPnManuelEntry = false;
  }

  setLog(result) {
    if (result === 'OK') {
      this.isSaveSuccessful = true;
      this.isSaveError = false;
      this.saveSuccessMessage = 'SUCCESSFUL';
    } else {
      this.isSaveError = true;
      this.isSaveSuccessful = false;

      result.forEach((element) => {
        this.saveErrorMessage.push(element.Result);
      });
    }
  }

  save() {
    this.submitted = true;

    this.holdAirplaneList = [];

    if (
      (this.acReg.value !== '' || this.acReg.value !== null) &&
      (this.erd.valid || this.erdText.valid) &&
      (this.erdDescText.valid ||
        this.erdDescSelectedText.valid ||
        this.erdDesc.valid) &&
      (this.hwPn.valid || this.hwPnText.valid) &&
      (this.hwDesc.valid ||
        this.hwDescText.valid ||
        this.hwDescSelectedText.valid) &&
      this.ataCh.valid
    ) {
      this.acReg.value.forEach((element) => {
        this.holdAirplaneList.push(element['Value']);
      });

      if (this.isErdManuelEntry && this.isHwPnManuelEntry) {
        this.addHwConfirmModal.show(
          this.holdAirplaneList,
          this.erdText.value.toUpperCase(),
          this.erdDescText.value.toUpperCase(),
          this.hwPnText.value.toUpperCase(),
          this.hwDescText.value.toUpperCase(),
          this.ataCh.value
        );
      } else if (this.isErdManuelEntry && !this.isHwPnManuelEntry) {
        this.addHwConfirmModal.show(
          this.holdAirplaneList,
          this.erdText.value.toUpperCase(),
          this.erdDescText.value.toUpperCase(),
          this.hwPn.value.toUpperCase(),
          this.hwDescSelectedText.value[0].toUpperCase(),
          this.ataCh.value
        );
      } else if (!this.isErdManuelEntry && this.isHwPnManuelEntry) {
        this.addHwConfirmModal.show(
          this.holdAirplaneList,
          this.erd.value.toUpperCase(),
          this.erdDescSelectedText.value[0].toUpperCase(),
          this.hwPnText.value.toUpperCase(),
          this.hwDescText.value.toUpperCase(),
          this.ataCh.value
        );
      } else {
        this.addHwConfirmModal.show(
          this.holdAirplaneList,
          this.erd.value.toUpperCase(),
          this.erdDescSelectedText.value[0].toUpperCase(),
          this.hwPn.value.toUpperCase(),
          this.hwDescSelectedText.value[0].toUpperCase(),
          this.ataCh.value
        );
      }
    } else {
      return;
    }
  }

  show() {
    this.addHwModal.show();
  }

  get acSeries() {
    return this.form.get('acSeries');
  }

  get acReg() {
    return this.form.get('acReg');
  }

  get erd() {
    return this.form.get('erd');
  }

  get erdText() {
    return this.form.get('erdText');
  }

  get erdDesc() {
    return this.form.get('erdDesc');
  }

  get erdDescText() {
    return this.form.get('erdDescText');
  }

  get erdDescSelectedText() {
    return this.form.get('erdDescSelectedText');
  }

  get hwPn() {
    return this.form.get('hwPn');
  }

  get hwPnText() {
    return this.form.get('hwPnText');
  }

  get hwDesc() {
    return this.form.get('hwDesc');
  }

  get hwDescText() {
    return this.form.get('hwDescText');
  }

  get hwDescSelectedText() {
    return this.form.get('hwDescSelectedText');
  }

  get ataCh() {
    return this.form.get('ataCh');
  }
}
