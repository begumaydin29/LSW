import { Component, OnInit, Injector } from '@angular/core';
import { CustomFileModel } from '@app/demo/models/custom-file-model';
import { HttpClient } from '@angular/common/http';
import { stream } from 'xlsx/types';
import * as xml2js from 'xml2js';
import { ExcelService } from '@app/services/excel/excel.service';
import {
  ProtoTypesDtoSerializer,
  ProtoTypesDto,
} from '@app/lsw/models/proto-types-dto';
import { AirplaneIdByTailNumberProxyService } from '@app/lsw/services/airplaneId-by-tailNumber/airplaneId-by-tailNumber-proxy.service';
import * as core from '@angular/core';
import { InsertXmlDataProxyService } from '@app/lsw/services/insert-xml-data/insert-xml-data-proxy.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifyService } from 'abp-ng2-module/dist/src/notify/notify.service';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';
import { UserUmsProxyService } from '@app/lsw/services/ums-proxy/user-ums-proxy.service';
import { DateService } from '@app/services/date/date.service';
import { AuthService } from '@shared/auth/auth.service';
import { formatDate } from '@angular/common';
import { ActionButton } from '@app/components/ag-grids/action-buttons/action-button';
import { ActionButtonsComponent } from '@app/components/ag-grids/action-buttons/action-buttons.component';
import { AppDeleteSwComponent } from './popup/app-delete-sw/app-delete-sw.component';
import { ItemComponent } from '@swimlane/ngx-dnd';
import { isThisISOWeek } from 'date-fns';

@Component({
  selector: 'app-upload-software',
  templateUrl: './upload-software.component.html',
  styleUrls: ['./upload-software.component.css'],
})
export class UploadSoftwareComponent implements OnInit {

  gridFullSearch = '';
  gridPageSize = 50;
  gridStyle = { 'width': '100%', 'height': '800px' };
  gridColumnDefs = [];
  gridRowData = [];
  gridRowDataDummy = [];
  keepGridRowDataDummy = [];
  gridOptions: GridOptions;

  selectedRowDatas: any[];

  @ViewChild(SimpleGridComponent, { static: false }) simpleGrid: SimpleGridComponent;
  @ViewChild('confirmDeleteSw', { static: false })
  deleteSwConfirmModal: AppDeleteSwComponent;

  gridActionButtons = [];

  staticFile: CustomFileModel;
  fileContent: any;
  isTailNumberActive = false;
  tailNumberValue;
  holdTailNumber: any;
  xmlToParse: any;
  parsedXML: any;
  XMLTables: any;

  notify: NotifyService;

  protoTypesDto: any = {};

  rowsThisPage;
  rowModelType;
  rowSelection;

  response;

  constructor(
    injector: Injector,
    private excelService: ExcelService,
    private protoTypesDtoSerializer: ProtoTypesDtoSerializer,
    private insertXmlDataProxyService: InsertXmlDataProxyService,
    private spinner: NgxSpinnerService,
    private airplaneIdByTailNumberProxyService: AirplaneIdByTailNumberProxyService,
    private userUmsProxyService: UserUmsProxyService,
    private dateService: DateService,
    private authenticationService: AuthService
  ) {
    this.notify = injector.get(NotifyService);

    this.gridColumnDefs = [
      {
        headerName: 'A/C Reg', field: 'TailNumber', suppressCellFlash: true,
      },
      {
        headerName: 'Created By', field: 'CreatedBy', suppressCellFlash: true,
      },
      { headerName: 'Created Date', field: 'CreatedDate', suppressCellFlash: true, },
      {
        headerName: 'Action',
        cellRenderer: 'actionButtonsComponent', suppressCellFlash: true, filter: false, sortable: false, editable: false
      },
    ];

    this.rowSelection = 'single';
    this.rowModelType = 'clientSide';

    this.generateActionButtons();

    this.getAirplaneList();

  }


  ngOnInit() {

    this.createStaticFile();
  }

  async getAirplaneList() {

    const result = await this.airplaneIdByTailNumberProxyService.getAirplaneInfo().toPromise();

    if (result.Success) {

      for (const res of result.Result) {

        if (res.CreatedBy !== null && res.CreatedDate !== null) {
          res.CreatedDate = this.formatDate(res.CreatedDate);
          const response = await this.formatCreatedBy(res.CreatedBy);

          if (response !== null) {

            res.CreatedBy = response;
          }
        }

      }
      this.gridRowData = result.Result;
    }
  }

  private generateActionButtons() {
    let actionButton = new ActionButton();

    actionButton = new ActionButton();
    actionButton.name = 'Delete';
    actionButton.icon = '  far fa-trash-alt mr-2';
    actionButton.title = 'Delete';
    actionButton.method = this.deleteAction;
    this.gridActionButtons.push(actionButton);

  }

  protected deleteAction(actionButtonParam) {

    const thisComponent = actionButtonParam.context.mainComponent;
    thisComponent.deleteSwConfirmModal.show(actionButtonParam.node.data.TailNumber);

  }

  parseXML(xmlToParse: string) {
    return new Promise((resolve) => {
      const thisComponent = this;

      let k: string | number;

      let obj: any = {},
        arr: string,
        parser = new xml2js.Parser({
          trim: true,
        });
      parser.parseString(xmlToParse, async function (err, result) {
        obj = result.AuthorizedAirplaneConfigurationReport;

        resolve(obj.Airplane[0].$.TailNumber);
      });
    });
  }

  parseXMLForSubmitting(xmlToParse: string) {
    return new Promise((resolve) => {
      const thisComponent = this;

      let k: string | number;

      let obj: any = {},
        arr: string,
        parser = new xml2js.Parser({
          trim: true,
        });
      parser.parseString(xmlToParse, async function (err, result) {
        obj = result.AuthorizedAirplaneConfigurationReport;

        const protoTypesDto = thisComponent.protoTypesDtoSerializer.fromJson(
          obj
        );

        resolve(protoTypesDto);
      });
    });
  }

  createStaticFile() {
    this.staticFile = new CustomFileModel();
    this.staticFile.buttonText = 'Gözat';
  }

  handleMyEvent(arg) { }

  onFileChange($event) {
    let length = this.staticFile.files.length;

    this.checkAddedFileNumber(this.staticFile.files[length - 1], length);

    const file = this.staticFile.files[0];

    this.loadXML(file);
  }

  checkAddedFileNumber(addedFile: any, length: number) {
    if (length > 1) {
      this.staticFile.files = this.staticFile.files.filter(
        (file) => file.name !== addedFile.name
      );
    }
  }

  loadXML(file: File) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.xmlToParse = fileReader.result.toString();

      this.parseXML(this.xmlToParse).then((result) => {
        this.isTailNumberActive = true;
        this.holdTailNumber = result;

        this.parsedXML = new DOMParser().parseFromString(
          fileReader.result.toString(),
          'text/xml'
        );
        this.XMLTables = this.parsedXMLtoTables();

        this.tailNumberValue = this.holdTailNumber.replace('BO ', '');
      });

      //parsexml for submitting
      this.parseXMLForSubmitting(this.xmlToParse).then((result) => {
        this.protoTypesDto = result;
      });
    };
    fileReader.readAsText(file);
  }

  deleteAddedFile(addedFile) {
    this.isTailNumberActive = false;
    this.staticFile.files = this.staticFile.files.filter(
      (file) => file.name !== addedFile.name
    );
  }

  onExcelExport() {
    this.excelService.generateExcelWithMultipleSheetsAndExport(
      this.staticFile.files[0].name,
      this.XMLTables['values'],
      this.XMLTables['columns'],
      this.XMLTables['sheetNames']
    );
  }

  private parsedXMLtoTables = () => {
    var traverseNode,
      sheetNames = [],
      counter = {},
      columns = {},
      values = {};
    traverseNode = (node, parent, idx, func) => {
      var parentObj = func(node, parent, idx);
      for (var i = 0; i < node.childElementCount; i++)
        traverseNode(node.children[i], parentObj, i, func);
    };
    var truncate = (str) => {
      if (str.length <= 31) return str;
      return str.substring(0, 31);
    };
    traverseNode(
      this.parsedXML.children[0],
      null,
      0,
      (node, parentObj, idx) => {
        let sheetName = truncate(node.nodeName);
        if (node.attributes.length == 0) {
          var parentNodeName = truncate(node.parentNode.nodeName);
          var columnList = columns[parentNodeName];
          columnList.push(sheetName);
          parentObj[sheetName] = node.innerHTML;
          return;
        }
        if (!sheetNames.includes(sheetName)) sheetNames.push(sheetName);
        var columnList = columns[sheetName];
        if (!columnList) {
          columnList = [sheetName + '_Id'];
          columns[sheetName] = columnList;
        }
        var list = values[sheetName];
        if (!list) {
          list = [];
          values[sheetName] = list;
        }
        if (!counter[sheetName]) counter[sheetName] = 1;
        var obj = {};
        obj[sheetName + '_Id'] = counter[sheetName]++;
        for (let i = 0; i < node.attributes.length; i++) {
          var att = node.attributes[i],
            colName = att.name;
          if (!columnList.includes(colName)) columnList.push(colName);
          obj[colName] = att.value;
        }
        if (parentObj != null) {
          var parentNodeName = truncate(node.parentNode.nodeName);
          var colName2 = parentNodeName + '_Id';
          var parentId = parentObj[colName2];
          if (!columnList.includes(colName2)) columnList.push(colName2);
          obj[colName2] = parentId;
        }
        list.push(obj);
        return obj;
      }
    );
    return {
      values: values,
      columns: columns,
      sheetNames: sheetNames,
    };
  };

  async submit() {

    this.spinner.show();

    const result = await this.insertXmlDataProxyService
      .insertXmlData(this.protoTypesDto).toPromise();

    if (result.Success) {
      if (result.Result['StatusCode'] !== 409) {

        this.getAirplaneList();

        this.spinner.hide();

        this.notify.success('SUCCESS', '', { positionClass: 'toast-top-right' });

      } else {
        this.notify.error('The file already exists!', 'ERROR', { positionClass: 'toast-top-right' });
        this.spinner.hide();
      }
    }
  }

  formatDate(createdDate) {

    createdDate = formatDate(createdDate, 'yyyy-MM-dd', 'en-US');

    return createdDate;
  }

  async formatCreatedBy(createdBy) {

    const result = await this.userUmsProxyService.getUserByRegisterId(createdBy).toPromise();

    if (result.Success) {
      return createdBy + ' ' + result.Result.FIRST_NAME + ' ' + result.Result.LAST_NAME;
    }

  }

  selectedRows(selectedRows: any[]) {

    this.selectedRowDatas = selectedRows;

  }

  loadAirplane(result) {

    this.gridRowData = result;

    this.simpleGrid.gridApi.refreshCells();

  }

}
