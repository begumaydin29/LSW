import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';
import { ListSoftwareDto } from './list-software-dto';

export class DeleteDto extends BaseDto {
    id: number | undefined;
    acReg: string | undefined;
    chapter: string | undefined;
    erd: string | undefined;
    erdDescription: string | undefined;
    hwPn: string | undefined;
    hwDescription: string | undefined;
    slid: string | undefined;
    slDescription: string | undefined;
    eoNo: string | undefined;
    status: string | undefined;
    remarks: string | undefined;
    ids: string | undefined;
    eqKey: string | undefined;
    modifiedBy: string | undefined;
}

@Injectable()
export class DeleteDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): DeleteDto {
        json = typeof json === 'object' ? json : {};
        const search = new DeleteDto();

        search.id = json['Id'];
        search.acReg = json['AcReg'];
        search.chapter = json['Chapter'];
        search.erd = json['Erd'];
        search.erdDescription = json['ErdDescription'];
        search.hwPn = json['HwPn'];
        search.hwDescription = json['HwDescription'];
        search.slid = json['SlId'];
        search.slDescription = json['SlDescription'];
        search.eoNo = json['EoNo'];
        search.status = json['Status'];
        search.remarks = json['Remarks'];
        search.modifiedBy = json['ModifiedBy'];

        return search;
    }

    toJson(resource: DeleteDto) {
        const data = {};

        data['Id'] = resource.id;
        data['AcReg'] = resource.acReg;
        data['Chapter'] = resource.chapter;
        data['Erd'] = resource.erd;
        data['ErdDescription'] = resource.erdDescription;
        data['HwPn'] = resource.hwPn;
        data['HwDescription'] = resource.hwDescription;
        data['SlId'] = resource.slid;
        data['SlDescription'] = resource.slDescription;
        data['EoNo'] = resource.eoNo;
        data['Status'] = resource.status;
        data['Remarks'] = resource.remarks;
        data['ModifiedBy'] = resource.modifiedBy;

        return data;
    }
}