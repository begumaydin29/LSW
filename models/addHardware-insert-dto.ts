import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';
import { AtaChapterDto } from './ata-chapter-dto';

export class AddHardwareInsertDto extends BaseDto {
    name: string | undefined;
    description: string | undefined;
    partNumber: string | undefined;
    referenceDesignator: string | undefined;
    createdBy: string | undefined;
    ataDtoObj: AtaChapterDto[] | undefined;
    airplaneList: number[] | undefined;
}

@Injectable()
export class AddHardwareInsertDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): AddHardwareInsertDto {
        json = typeof json === 'object' ? json : {};
        const search = new AddHardwareInsertDto();

        search.name = json['Name'];
        search.description = json['Description'];
        search.partNumber = json['PartNumber'];
        search.referenceDesignator = json['ReferenceDesignator'];
        search.createdBy = json['CreatedBy'];
        search.ataDtoObj = json['ataDtoObj'];
        search.airplaneList = json['AirplaneList'];

        return search;
    }

    toJson(resource: AddHardwareInsertDto) {
        const data = {};

        data['Name'] = resource.name;
        data['Description'] = resource.description;
        data['PartNumber'] = resource.partNumber;
        data['ReferenceDesignator'] = resource.referenceDesignator;
        data['CreatedBy'] = resource.createdBy;
        data['ataDtoObj'] = resource.ataDtoObj;
        data['AirplaneList'] = resource.airplaneList;

        return data;
    }
}