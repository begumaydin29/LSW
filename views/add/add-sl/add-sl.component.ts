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
import { SearchComponentModel } from '@app/models/components/search-component-model';
import { SearchModelDto } from '@shared/models/search-model-dto';
import { AddSlConfirmComponent } from './popup/add-sl-confirm/add-sl-confirm.component';
import { AddSLInsertProxyService } from '@app/lsw/services/addSL-insert/addSL-insert-proxy.service';
import { AcRegSearchProxyService } from '@app/lsw/services/lookup-search-services/acReg-search/acReg-search-proxy.service';

@Component({
  selector: 'app-add-sl',
  templateUrl: './add-sl.component.html',
  styleUrls: ['./add-sl.component.css'],
})
export class AddSlComponent implements OnInit {
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
  saveErrorMessage: any[] = [];
  isSaveError: boolean = false;

  dropdownSettings = {};

  @ViewChild('confirmAddSl', { static: false })
  addSlConfirmModal: AddSlConfirmComponent;

  constructor(
    private activeTailNumberProxyService: ActiveTailNumberProxyService,
    private acRegSearchProxyService: AcRegSearchProxyService,
    private airplaneIdByTailNumberProxyService: AirplaneIdByTailNumberProxyService,
    private addSLInsertProxyService: AddSLInsertProxyService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      acSeries: new FormControl(''),
      acReg: new FormControl('', Validators.required),
      slid: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
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
        a.TailNumber > b.TailNumber ? -1 : 1
      );
    }
  }

  getSelectedDropdown() {}

  onSelectAllAcReg(items: any) {
    console.log(items);
  }

  selectACReg($event) {
    this.acReg.valueChanges.subscribe((change) => {
      if (change != null) {
        this.isACRegSelected = true;
      }
    });
  }

  acRegRemove($event) {
    this.acReg.valueChanges.subscribe((change) => {
      if (change != null) {
        if (change.length === 0) {
          this.disableControls();
        }
      }
    });
  }

  async getAirplaneIdList() {
    const tailNumberList = this.acReg.value;
    let airplaneIdList: number[] = [];

    for (const tn of tailNumberList) {
      let res = await this.airplaneIdByTailNumberProxyService
        .getAirplaneIdByTailNumber(tn['TailNumber'])
        .toPromise();

      if (res.Success) {
        airplaneIdList.push(res.Result['Airplane_Id']);
      }
    }

    return airplaneIdList;
  }

  disableControls() {
    this.isACRegSelected = false;
    this.submitted = false;
  }

  clearAllData() {
    if (confirm('Are you sure to clear them "ALL"?')) {
      this.form.reset();
      this.disableControls();
    }
  }

  setLog(result) {
    this.saveErrorMessage = result;
  }

  save() {
    this.submitted = true;

    this.holdAirplaneList = [];

    if ((this.acReg.value !== '' || this.acReg.value !== null) && this.slid) {
      this.acReg.value.forEach((element) => {
        this.holdAirplaneList.push(element['Value']);
      });

      this.addSlConfirmModal.show(
        this.holdAirplaneList,
        this.slid.value.toUpperCase(),
        this.description.value.toUpperCase()
      );
    }
  }

  get acSeries() {
    return this.form.get('acSeries');
  }

  get acReg() {
    return this.form.get('acReg');
  }

  get slid() {
    return this.form.get('slid');
  }

  get description() {
    return this.form.get('description');
  }
}
