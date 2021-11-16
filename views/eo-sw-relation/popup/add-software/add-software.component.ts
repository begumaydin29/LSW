import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PartNumberDto } from '@app/lsw/models/part-number-dto';
import { AddSwConfirmComponent } from '@app/lsw/views/add-sw/popup/add-sw-confirm/add-sw-confirm.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActiveTailNumberDto } from '@app/lsw/models/active-tail-number-dto';
import { ActiveTailNumberProxyService } from '@app/lsw/services/active-tail-number/active-tail-number-proxy.service';
import { EquipmentProxyService } from '@app/lsw/services/equipment/equipment-proxy.service';
import { PartNumberProxyService } from '@app/lsw/services/part-number/part-number-proxy.service';
import { PartNumberDescriptionProxyService } from '@app/lsw/services/part-number-description/part-number-description-proxy.service';
import { SwLocationValueProxyService } from '@app/lsw/services/swLocation-value/swLocation-value-proxy.service';
import { EquipmentIdProxyService } from '@app/lsw/services/equipment-id/equipment-id-proxy.service';
import { AtaChapterProxyService } from '@app/lsw/services/ata-chapter/ata-chapter-proxy.service';
import { SwLocationDescriptionProxyService } from '@app/lsw/services/swLocation-description/swLocation-description-proxy.service';
import { CheckErdProxyService } from '@app/lsw/services/check-erd/check-erd-proxy.service';
import { AirplaneByIdProxyService } from '@app/lsw/services/get-airplane-byId/airplane-byId-proxy.service';
import { CheckHwPnProxyService } from '@app/lsw/services/check-hwPn/check-hwPn-proxy.service';
import { CheckSlidProxyService } from '@app/lsw/services/check-slid/check-slid-proxy.service';
import { AcRegSearchProxyService } from '@app/lsw/services/lookup-search-services/acReg-search/acReg-search-proxy.service';

@Component({
  selector: 'app-add-software',
  templateUrl: './add-software.component.html',
  styleUrls: ['./add-software.component.css']
})
export class AddSoftwareComponent implements OnInit {

  @ViewChild('confirm', { static: false }) addSwConfirmModal: AddSwConfirmComponent;
  @ViewChild('addSoftware', { static: false }) addSoftwareModal: ModalDirective;

  @Output() pNumber: EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup;

  isACRegSelected: boolean = false;
  isErdSelected: boolean = false;
  isHwPnSelected: boolean = false;
  isSlidSelected: boolean = false;

  erdValue: string;
  erdDescriptionValue: string;

  hwPnValue: string;

  acSeries_: boolean;

  airplaneIdList: any[] = [];
  holdAirplaneIds: number[] = [];

  regList: ActiveTailNumberDto[] = [];
  equipmentList: string[] = [];
  filteredEquipmentList: string[] = [];

  hwPnList: string[] = [];

  swLocationList: string[] = [];

  submitted: boolean = false;

  ataChValue: string;

  selectedErd: string;

  beforeSwPn: string;

  partNumber: PartNumberDto[];

  erdErrorMessage: string;
  pnErrorMessage: string;
  slidErrorMessage: string;

  invalidtcValuesErd: string[] = [];
  invalidtcValuesPn: string[] = [];
  invalidtcValuesSlid: string[] = [];

  isErdChecked: boolean = false;
  isHwPnChecked: boolean = false;
  isSlidChecked: boolean = false;

  isErdCleared: boolean = false;
  isPnCleared: boolean = false;
  isSlidCleared: boolean = false;

  allInvalidTcValues: string[] = [];
  allValidTcValues: string[] = [];

  holdAirplaneList: string[] = [];

  succesfulInsertedAirplaneNames: string[] = [];
  errorInsertedAirplaneNames: string[] = [];

  isSaveSuccessful: boolean = false;
  isSaveError: boolean = false;

  partNumberList = [];
  DescriptionPartNumberList = [];

  dropdownSettings = {};

  constructor(private activeTailNumberProxyService: ActiveTailNumberProxyService, private acRegSearchProxyService: AcRegSearchProxyService,
    private equipmentProxyService: EquipmentProxyService,
    private partNumberProxyService: PartNumberProxyService, private partNumberDescriptionProxyService: PartNumberDescriptionProxyService,
    private swLocationValueProxyService: SwLocationValueProxyService, private equipmentIdProxyService: EquipmentIdProxyService,
    private ataChapterProxyService: AtaChapterProxyService, private swLocationDescriptionProxyService: SwLocationDescriptionProxyService,
    private checkErdProxyService: CheckErdProxyService, private airplaneByIdProxyService: AirplaneByIdProxyService,
    private checkHwPnProxyService: CheckHwPnProxyService, private checkSlidProxyService: CheckSlidProxyService) { }

  ngOnInit() {

    this.form = new FormGroup({

      'acSeries': new FormControl('', Validators.required),
      'acReg': new FormControl('', Validators.required),
      'erd': new FormControl('', Validators.required),
      'hw': new FormControl('', Validators.required),
      'swPn': new FormControl('', Validators.required),
      'swDescription': new FormControl('', Validators.required),
      'slid': new FormControl('', Validators.required)
    });

    this.GetAcRegList();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: "TailNumber",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  async GetAcRegList() {

    const allAcReg = await this.activeTailNumberProxyService.listAcReg().toPromise();

    if (allAcReg.Success) {
      const regList_ = allAcReg.Result;
      this.regList = regList_.sort((a, b) => a.TailNumber > b.TailNumber ? 1 : -1);

    }

  }

  setLogSuccess(succesfulInsertedAirplaneIds) {

    if (succesfulInsertedAirplaneIds.length > 0) {

      this.isSaveSuccessful = true;

      succesfulInsertedAirplaneIds.forEach(async element => {

        let result = await this.getAirplaneById(element);

        this.succesfulInsertedAirplaneNames.push(result.Result['TailNumber']);

        console.log('result', this.succesfulInsertedAirplaneNames);

      });
    }
  }

  setLogError(errorInsertedAirplaneIds) {

    if (errorInsertedAirplaneIds.length > 0) {

      this.isSaveError = true;

      errorInsertedAirplaneIds.forEach(async element => {

        let result = await this.getAirplaneById(element);

        this.errorInsertedAirplaneNames.push(result.Result['TailNumber']);

        console.log('result', this.errorInsertedAirplaneNames);

      });
    }
  }

  setPartNumber(partNumber) {

    this.beforeSwPn = partNumber;

  }

  getSelectedDropdown() {
    this.acSeries_ = true;

  }

  show() {
    this.addSoftwareModal.show();
  }

  close() {
    this.addSoftwareModal.hide();
    this.pNumber.emit(this.beforeSwPn);

  }

  onSelectAllAcReg(items: any) {
    console.log(items);
    this.enableErdOnCondition();
    this.removeReferenceDesignator();
    this.removeHwPn();
    this.removeAtaChapter();
    this.removeSlid();
    this.removeSwPn();
    this.removeSwDescription();
    this.disableHwPNOnCondition();
    this.disableSlidOnCondition();
    this.disableSwPNCondition();
    this.disableSwDescriptionOnCondition();

    this.airplaneIdList = [];
    this.holdAirplaneIds = [];

    let arrayObj = [];

    this.airplaneIdList = [items];

    for (let index = 0; index < this.airplaneIdList.length; index++) {
      arrayObj = this.airplaneIdList[index];

      for (let index = 0; index < arrayObj.length; index++) {
        this.holdAirplaneIds.push(arrayObj[index].Id);
      }
    }
  }

  onDeSelectAllAcReg(items: any) {
    console.log(items);

    this.isErdCleared = true;
    this.isPnCleared = true;
    this.isSlidCleared = true;

    this.disableControlsIfEmptyAcReg();
  }

  selectACReg($event) {

    this.enableErdOnCondition();
    this.removeReferenceDesignator();
    this.removeHwPn();
    this.removeAtaChapter();
    this.removeSlid();
    this.removeSwPn();
    this.removeSwDescription();
    this.disableHwPNOnCondition();
    this.disableSlidOnCondition();
    this.disableSwPNCondition();
    this.disableSwDescriptionOnCondition();

    this.airplaneIdList = [];
    this.holdAirplaneIds = [];

    let arrayObj = [];

    this.airplaneIdList = [this.acReg.value];

    for (let index = 0; index < this.airplaneIdList.length; index++) {
      arrayObj = this.airplaneIdList[index];

      for (let index = 0; index < arrayObj.length; index++) {

        this.holdAirplaneIds.push(arrayObj[index].Id);
      }
    }


  }


  removeReferenceDesignator() {
    this.erd.setValue(null);
  }

  removeHwPn() {
    this.hw.setValue(null);
  }

  removeAtaChapter() {
    this.ataChValue = '';
  }

  removeSlid() {
    this.slid.setValue(null);
  }

  removeSwPn() {
    this.swPn.setValue(null);
  }

  removeSwDescription() {
    this.swDescription.setValue(null);
  }

  disableErdOnCondition() {
    this.isACRegSelected = false;
  }

  disableHwPNOnCondition() {
    this.isErdSelected = false;
  }

  disableSlidOnCondition() {
    this.isHwPnSelected = false;
  }

  disableSwPNCondition() {
    this.isSlidSelected = false;
  }

  disableSwDescriptionOnCondition() {
    this.isSlidSelected = false;
  }

  enableErdOnCondition() {
    this.isACRegSelected = true;
  }

  enableHwPnOnCondition() {
    this.isErdSelected = true;
  }

  enableSlidOnCondition() {
    this.isHwPnSelected = true;
  }

  enableSwOnCondition() {
    this.isSlidSelected = true;

  }

  async authorizedERDChanged($event) {

    const searchBeginNumber = 2;

    if ($event && $event.length > searchBeginNumber) {

      let result = await this.equipmentProxyService.postByAircraftId(this.holdAirplaneIds).toPromise();

      if (result.Success) {
        this.equipmentList = result.Result;
      }

      let nullDescriptionEquipmentList = this.equipmentList.filter(function (element) {
        if ((element['Name'] === null || element['Name'] === undefined)) {

          element['Name'] = '-';

          return element;
        }
      });

      let equipmentListWoutNull = this.equipmentList.filter(o => !nullDescriptionEquipmentList.find(o2 => o['Equipment_Id'] === o2['Equipment_Id']));

      let equipmentListWoutDupl = this.removeDuplicatesBy(x => x.ReferenceDesignator, equipmentListWoutNull);

      this.filteredEquipmentList = this.insertToEquipmentListWoutNull(equipmentListWoutDupl, this.removeDuplicatesBy(x => x.ReferenceDesignator, nullDescriptionEquipmentList));


    }

  }

  removeDuplicatesBy(keyFn, array) {
    var mySet = new Set();
    return array.filter(function (x) {
      var key = keyFn(x), isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    });
  }


  insertToEquipmentListWoutNull(array, array_) {

    array_.forEach(element => {
      array = [...array, ...element];
    });

    return array;

  }

  acRegRemove($event) {

    this.isErdCleared = true;
    this.isPnCleared = true;
    this.isSlidCleared = true;

    this.disableControlsIfEmptyAcReg();
  }

  disableControlsIfEmptyAcReg() {
    this.disableErdOnCondition();
    this.disableHwPNOnCondition();
    this.disableSlidOnCondition();
    this.disableSwPNCondition();
    this.disableSwDescriptionOnCondition();
  }

  disableAllControls() {
    this.disableErdOnCondition();
    this.disableHwPNOnCondition();
    this.disableSlidOnCondition();
    this.disableSwPNCondition();
    this.disableSwDescriptionOnCondition();
  }

  removeErdSearch($event) {
    if ($event) {

      this.isErdCleared = true;
      this.isPnCleared = true;
      this.isSlidCleared = true;

      this.removeHwPn();
      this.removeAtaChapter();
      this.removeSlid();
      this.removeSwPn();
      this.removeSwDescription();

      this.disableHwPNOnCondition();
      this.disableSlidOnCondition();
      this.disableSwPNCondition();
      this.disableSwDescriptionOnCondition();
    }
  }

  removeHwPnSearch($event) {

    if ($event) {
      if (this.erdErrorMessage != '') {
        this.isErdCleared = false;
      }
      else {
        this.isErdCleared = true;
      }
      this.isPnCleared = true;
      this.isSlidCleared = true;

      this.removeAtaChapter();
      this.removeSlid();
      this.removeSwPn();
      this.removeSwDescription();

      this.disableSlidOnCondition();
      this.disableSwPNCondition();
      this.disableSwDescriptionOnCondition();
    }

  }

  removeSlidSearch($event) {

    if ($event) {
      if (this.erdErrorMessage != '') {
        this.isErdCleared = false;
      }
      else {
        this.isErdCleared = true;
      }
      if (this.pnErrorMessage !== '') {
        this.isPnCleared = false;

      }
      else {
        this.isPnCleared = true;

      }
      this.isSlidCleared = true;

      this.removeSwPn();
      this.removeSwDescription();

      this.disableSwPNCondition();
      this.disableSwDescriptionOnCondition();
    }

  }

  async selectErd($event) {

    this.erd.valueChanges.subscribe(change => {
      if (change != null) {

        this.enableHwPnOnCondition();
        this.removeHwPn();
        this.removeSlid();
        this.removeAtaChapter();
        this.removeSwPn();
        this.removeSwDescription();

      }
    });

    this.checkErd();

    this.hwPnValue = '';

    if (this.erd.value !== undefined && this.erd.value !== null) {

      let selectedErdEquipment = this.erd.value;
      this.selectedErd = selectedErdEquipment.ReferenceDesignator;

      let result = await this.partNumberProxyService.getPartNumber(this.holdAirplaneIds, this.selectedErd).toPromise();

      this.partNumber = result.Result;
    }

  }

  async checkErd() {

    this.erdErrorMessage = '';
    let message: string = '';
    this.invalidtcValuesErd = [];

    if (this.erd.value != null) {
      let referenceDesignator = this.erd.value.ReferenceDesignator;

      let result_ = await this.checkErdProxyService.checkErd(this.holdAirplaneIds, referenceDesignator).toPromise();

      for (const element of result_.Result) {

        let array = element.split(' ');

        if (array[1] === 'yok') {

          let result = await this.getAirplaneById(array[0]);

          this.invalidtcValuesErd.push(result.Result['TailNumber']);
        }

      }

      if (this.invalidtcValuesErd.length !== 0) {
        this.invalidtcValuesErd.forEach(element => {
          message = message + element + ', ';
        });

        if (this.invalidtcValuesErd.length === 1) {
          console.log('lşsdlş', message);
          message.replace(/,/g, ''); // bak buna çalışmıyor.

          console.log('lsşkd', message);
        }

        this.erdErrorMessage = referenceDesignator + '(ERD) not found on ' + message;

      }

      if (this.erdErrorMessage !== '') {
        this.isErdChecked = true;

        this.isErdCleared = false;

      }
      else {
        this.isErdCleared = true;

      }

    }
  }

  async getAirplaneById(id: number): Promise<any> {

    let result = await this.airplaneByIdProxyService.getAirplaneById(id).toPromise();

    return result;

  }

  async authorizedHwChanged($event) {

    const searchBeginNumber = 2;

    if ($event && $event.length > searchBeginNumber) {

      if (this.erd.value !== undefined && this.erd.value !== null) {
        let selectedErdEquipment = this.erd.value;
        this.selectedErd = selectedErdEquipment.ReferenceDesignator;

        let result = await this.partNumberProxyService
          .getPartNumber(this.holdAirplaneIds, this.selectedErd)
          .toPromise();

        if (result.Success) {
          this.partNumberList = result.Result;
        }


        const NullDescriptionPartNumberList = this.partNumberList.filter(function (
          element
        ) {
          if (element["Description"] === null || element["Description"] === undefined) {
            element["Description"] = "-";

            return element;
          }
        });


        const partNumberListWoutNull = this.partNumberList.filter(
          o =>
            !NullDescriptionPartNumberList.find(
              o2 => o["PartNumber"] === o2["PartNumber"]
            )
        );

        let partNumberListWoutDupl = this.removeDuplicatesBy(
          x => x.PartNumber,
          partNumberListWoutNull
        );

        this.DescriptionPartNumberList = this.insertToEquipmentListWoutNull(
          partNumberListWoutDupl,
          this.removeDuplicatesBy(
            x => x.PartNumber,
            NullDescriptionPartNumberList
          )
        );
      }
    }

  }

  selectHw($event) {

    this.hw.valueChanges.subscribe(change => {
      if (change != null) {

        this.enableSlidOnCondition();

        this.removeAtaChapter();
        this.removeSlid();
        this.removeSwPn();
        this.removeSwDescription();

      }
    });

    this.checkHwPn();

    if (this.hw.value !== '' && this.hw.value !== null) {
      let partNumber = this.hw.value.PartNumber;

      let erd = this.erd.value.ReferenceDesignator;

      this.findEquipmentId(partNumber, erd);
    }

  }

  async checkHwPn() {
    this.pnErrorMessage = '';
    this.invalidtcValuesPn = [];
    let message = '';

    if (this.hw.value != null) {
      let partNumber = this.hw.value.PartNumber;

      let referenceDesignator = this.erd.value.ReferenceDesignator;

      const result_: any = await this.checkHwPnProxyService.checkHwPn(this.holdAirplaneIds, referenceDesignator, partNumber).toPromise();

      for (const element of result_.Result) {

        let array = element.split(' ');

        if (array[1] === 'yok') {

          let result = await this.getAirplaneById(array[0]);

          this.invalidtcValuesPn.push(result.Result['TailNumber']);
        }

      }

      if (this.invalidtcValuesPn.length !== 0) {
        this.invalidtcValuesPn.forEach(element => {
          message = message + element + ', ';
        });

        if (this.invalidtcValuesPn.length === 1) {
          message.replace(',', '');
        }

        this.pnErrorMessage = partNumber + '(HW PN) not found on ' + message;

      }

      if (this.pnErrorMessage !== '') {
        this.isPnCleared = false;
        this.isHwPnChecked = true;

      }
      else {
        this.isPnCleared = true;

      }
    }

  }

  findEquipmentId(partNumber: string, erd: string) {

    this.equipmentIdProxyService.getEquipmentId(partNumber, erd).subscribe(response => {

      let equipmentId = response.Result;

      this.ataChapterProxyService.getAtaChapter(equipmentId).subscribe(response => {

        if (response.Success) {
          if (response.Result != null) {
            this.ataChValue = response.Result['ATAChapter'];

          }

        }

      });

    });

  }

  getPartNumberDescription(partNumber: PartNumberDto[]) {



    this.partNumberDescriptionProxyService.getPartNumberDescription(partNumber[0]).subscribe(response => {

      if (response.Result !== null) {
        this.hwPnList.push(partNumber + ': ' + response.Result[0]);
      } else {
        this.hwPnList.push(partNumber + ': -');
      }

    });

  }


  async authorizedSlidChanged($event) {

    const searchBeginNumber = 2;

    if ($event && $event.length > searchBeginNumber) {

      let result = await this.swLocationValueProxyService.getByValue($event).toPromise();

      result.Result.forEach(element => {
        this.swLocationDescriptionProxyService.getBySlid(element).subscribe(response => {

          if (response.Result['Description'] === '') {
            this.swLocationList.push(element + ': -');
          }
          else {
            this.swLocationList.push(element + ': ' + response.Result['Description']);
          }

        });
      });
    }



  }

  selectSlid($event) {

    this.slid.valueChanges.subscribe(change => {
      if (change != null) {

        this.enableSwOnCondition();

        this.removeSwPn();
        this.removeSwDescription();

      }
    });

    this.checkSlid();

  }

  async checkSlid() {

    this.invalidtcValuesSlid = [];
    let message = '';

    this.slidErrorMessage = '';

    if (this.slid.value != null) {
      let slid = (this.slid.value).substr(0, this.slid.value.indexOf(':'));

      const result_: any = await this.checkSlidProxyService.checkSlid(this.holdAirplaneIds, slid).toPromise();

      for (const element of result_.Result) {

        let array = element.split(' ');

        if (array[1] === 'yok') {

          let result = await this.getAirplaneById(array[0]);

          this.invalidtcValuesSlid.push(result.Result['TailNumber']);
        }

      }

      if (this.invalidtcValuesSlid.length !== 0) {
        this.invalidtcValuesSlid.forEach(element => {
          message = message + element + ', ';
        });

        if (this.invalidtcValuesSlid.length === 1) {
          message.replace(',', '');
        }

        this.slidErrorMessage = slid + '(SLID) not found on ' + message;

      }

      if (this.slidErrorMessage !== '') {
        this.isSlidCleared = false;

        this.isSlidChecked = true;

      }
      else {
        this.isSlidCleared = true;

      }
    }


  }

  getAllInvalidTcValues() {
    if (this.invalidtcValuesErd != null) {
      this.invalidtcValuesErd.forEach(element => {

        this.allInvalidTcValues.push(element);

      });
    }

    if (this.invalidtcValuesPn != null) {
      this.invalidtcValuesPn.forEach(element => {

        this.allInvalidTcValues.push(element);

      });
    }

    if (this.invalidtcValuesSlid != null) {
      this.invalidtcValuesSlid.forEach(element => {

        this.allInvalidTcValues.push(element);

      });
    }
  }

  filterValidTcValues() {

    for (var i = 0; i < this.allInvalidTcValues.length; i++) {
      var val = this.allInvalidTcValues[i];
      var foundIndex = this.holdAirplaneList.indexOf(val);
      if (foundIndex != -1) {
        this.holdAirplaneList.splice(foundIndex, 1);
      }
    }

    return this.holdAirplaneList;
  }

  save() { //save

    this.submitted = true;

    this.holdAirplaneList = [];

    this.acReg.value.forEach(element => {

      this.holdAirplaneList.push(element.TailNumber);

    });

    this.getAllInvalidTcValues();

    let erd = this.erd.value.ReferenceDesignator.toUpperCase();
    let erdDescription = this.erd.value.Name.toUpperCase();
    let partNumber = this.hw.value.PartNumber.toUpperCase();
    let partNumberDescription = this.hw.value.Description.toUpperCase();
    let ataCh = this.ataChValue.toUpperCase();
    let slid = (this.slid.value).substr(0, this.slid.value.indexOf(':')).toUpperCase();
    let slidDescription = (this.slid.value).substr(this.slid.value.indexOf(':') + 1).toUpperCase();
    let swPn = this.swPn.value.toUpperCase();
    let swDescription = this.swDescription.value.toUpperCase();

    if (this.allInvalidTcValues.length !== 0) {
      this.filterValidTcValues();
    }

    this.addSwConfirmModal.show(this.holdAirplaneList, erd
      , erdDescription, partNumber, partNumberDescription, ataCh, slid, slidDescription, swPn, swDescription);

  }

  clearLogs() {
    this.isSaveSuccessful = false;
    this.isSaveError = false;
  }

  clearAllData() {

    if (confirm('Are you sure to clear them "ALL"?')) {
      this.form.reset();
      this.disableAllControls();
      this.clearLogs();
    }

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

  get hw() {
    return this.form.get('hw');
  }

  get slid() {
    return this.form.get('slid');
  }

  get swPn() {
    return this.form.get('swPn');
  }

  get swDescription() {
    return this.form.get('swDescription');

  }



}
