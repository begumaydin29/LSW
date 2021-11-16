import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';
import { CustomFileModel } from '@app/demo/models/custom-file-model';
import { ProtoTypesDtoSerializer } from '@app/lsw/models/proto-types-dto';
import { ComparisonService } from '@app/lsw/services/comparison/comparison.service';
import { ExcelService } from '@app/services/excel/excel.service';
import { PdfService } from '@app/services/pdf/pdf.service';
import { AppComponentBase } from '@shared/app-component-base';
import { NotifyService } from 'abp-ng2-module/dist/src/notify/notify.service';
import { NgxSpinnerService } from 'ngx-spinner';

import * as xml2js from 'xml2js';

@Component({
  selector: 'comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent extends AppComponentBase implements OnInit {

  xmlToParse: any;
  file;
  tailNumberValue;
  fileUploaded = false;
  isCompared = false;

  parsedXml;
  protoTypesDto;

  gridFullSearch = '';
  gridPageSize = 50;
  gridStyle = { 'width': '100%', 'height': '800px' };
  gridColumnDefs = [];
  gridRowData = [];

  gridColumnDefs_ = [];
  gridRowData_ = [];

  rowModelType;

  @ViewChild(SimpleGridComponent, { static: false }) simpleGrid: SimpleGridComponent;

  constructor(injector: Injector, private comparisonService: ComparisonService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private pdfService: PdfService) {
    super(injector);

    this.gridColumnDefs = [
      {
        headerName: 'HW ATA CHAPTER', field: 'AtaChapter'
      },
      {
        headerName: 'SLID', field: 'SwLocationValue'
      },
      { headerName: 'SLID DESCRIPTION', field: 'SwLocationValue_Description' },
      { headerName: 'SW PN', field: 'LoadableSw_PartNumber' },
      { headerName: 'SW PN DESCRIPTION', field: 'LoadableSw_Description' }];

    this.gridColumnDefs_ = [
      {
        headerName: 'HW ATA CHAPTER', field: 'AtaChapter'
      },
      {
        headerName: 'EQUIPMENT KEY', field: 'EqKey'
      },
      {
        headerName: 'SLID', field: 'SwLocationValue'
      },
      { headerName: 'SLID DESCRIPTION', field: 'SwLocationValue_Description' },
      { headerName: 'SW PN', field: 'LoadableSw_PartNumber' },
      { headerName: 'SW PN DESCRIPTION', field: 'LoadableSw_Description' }];

    this.rowModelType = 'clientSide';
  }

  ngOnInit() {
  }

  handleMyEvent(arg) { }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      this.fileUploaded = true;
      this.file = event.target.files[0];
    }
  }

  Compare() {
    this.isCompared = true;
    let fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const fileContent = fileReader.result.toString();

      this.parsedXml = new DOMParser().parseFromString(
        fileContent,
        'application/xml'
      );

      this.CheckTailNumber(fileContent);

      const res = await this.parseXMLForSubmitting(fileContent).then((result) => {
        this.protoTypesDto = result;
      });

      if (this.protoTypesDto !== undefined) {

        const res = await this.loadComparison_AirplaneandSystem(this.protoTypesDto, false);
        if (res !== null) {
          const res2 = await this.loadComparison_SystemandAirplane(this.protoTypesDto, true)
        }

      }
    }
    fileReader.readAsText(this.file);

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
        delete result.AirplaneConfigurationReport.$;
        resolve(result);
      });
    });
  }



  CheckTailNumber(fileContent) {

    const tailNumber = "TailNumber=";

    if (fileContent.includes(tailNumber)) {
      const index = fileContent.indexOf(tailNumber);

      this.tailNumberValue = fileContent.substring(index + 15, index + 21);
    }

  }

  async loadComparison_AirplaneandSystem(protoTypesDto, check) {

    this.spinner.show();

    const result = await this.comparisonService.listComparisonWithAirplaneandSystem(protoTypesDto, check).toPromise();

    if (result.Success) {

      if (result.Result === null) {
        this.notify.warn('Not Found ' + this.tailNumberValue + ' in the system', 'WARNING');
        this.spinner.hide();
        return null;
      } else {
        this.gridRowData = result.Result;
        this.spinner.hide();
      }

    }

  }

  async loadComparison_SystemandAirplane(protoTypesDto, check) {
    this.spinner.show();

    const result = await this.comparisonService.listComparisonWithAirplaneandSystem(protoTypesDto, check).toPromise();

    if (result.Success) {

      this.spinner.hide();
      this.gridRowData_ = result.Result;


    }
  }

  onExcelExport_firstGrid() {

    let data = this.gridRowData.map(data => [
      data.AtaChapter,
      data.SwLocationValue,
      data.SwLocationValue_Description,
      data.LoadableSw_PartNumber,
      data.LoadableSw_Description
    ]);


    const tableHeaders: Array<string> = this.gridColumnDefs
      .map(x => x.headerName);

      const fileName = 'Those in Aircraft but not in the System';


    this.excelService.generateExcelAndExport(data, tableHeaders, fileName);
  }

  onExcelExport_secondGrid() {


    let data = this.gridRowData_.map(data => [
      data.AtaChapter,
      data.EqKey,
      data.SwLocationValue,
      data.SwLocationValue_Description,
      data.LoadableSw_PartNumber,
      data.LoadableSw_Description
    ]);


    const tableHeaders: Array<string> = this.gridColumnDefs_
      .map(x => x.headerName);

      const fileName = 'Those in the System but not on the Aircraft';


    this.excelService.generateExcelAndExport(data, tableHeaders, fileName);

  }

  simpleExportToPdf_firstGrid() {

    let data = this.gridRowData.map(data => [
      data.AtaChapter,
      data.SwLocationValue,
      data.SwLocationValue_Description,
      data.LoadableSw_PartNumber,
      data.LoadableSw_Description
    ]);

    const tableHeaders: Array<string[]> = this.gridColumnDefs.map(x => x.headerName);

    this.pdfService.createSimplePdf(tableHeaders, data, 'SimpleData');
  }

  simpleExportToPdf_secondGrid() {

    let data = this.gridRowData_.map(data => [
      data.AtaChapter,
      data.EqKey,
      data.SwLocationValue,
      data.SwLocationValue_Description,
      data.LoadableSw_PartNumber,
      data.LoadableSw_Description
    ]);

    const tableHeaders: Array<string[]> = this.gridColumnDefs_.map(x => x.headerName);

    this.pdfService.createSimplePdf(tableHeaders, data, 'SimpleData');


  }

}
