import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class AddSoftwareInsertDto extends BaseDto {
    id: number | undefined;
    acSeries: string | undefined;
    acReg: number[] | undefined;
    erd: string | undefined;
    ata: number | undefined;
    slid: string | undefined;
    swPn: string | undefined;
    hwPn: string | undefined;
    swDescription: string | undefined;
}

@Injectable()
export class AddSoftwareInsertDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): AddSoftwareInsertDto {
        json = typeof json === 'object' ? json : {};
        const search = new AddSoftwareInsertDto();

        search.acSeries = json['ACSeries'];
        search.acReg = json['ACReg'];
        search.erd = json['ERD'];
        search.ata = json['ATA'];
        search.slid = json['SLID'];
        search.swPn = json['SWPN'];
        search.hwPn = json['HWPN'];
        search.swDescription = json['SWDescription'];

        return search;
    }

    toJson(resource: AddSoftwareInsertDto) {
        const data = {};

        data['ACSeries'] = resource.acSeries;
        data['ACReg'] = resource.acReg;
        data['ERD'] = resource.erd;
        data['ATA'] = resource.ata;
        data['SLID'] = resource.slid;
        data['SWPN'] = resource.swPn;
        data['HWPN'] = resource.hwPn;
        data['SWDescription'] = resource.swDescription;

        return data;
    }
}