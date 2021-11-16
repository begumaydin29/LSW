import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class AtaDto extends BaseDto {
    ata_Id: number | undefined;
    ataChapter: string | undefined;
    description: string | undefined;
    equipment_Id: number | undefined;
    createdBy: string | undefined;
    createdDate: Date | undefined;
    modifiedBy: string | undefined;
    modifiedDate: Date | undefined;
    isActive: number | undefined;
}

@Injectable()
export class AtaDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): AtaDto {
        json = typeof json === 'object' ? json : {};
        const search = new AtaDto();

        search.ata_Id = json['ATA_Id'];
        search.ataChapter = json['ATAChapter'];
        search.description = json['Description'];
        search.equipment_Id = json['Equipment_Id'];
        search.createdBy = json['CreatedBy'];
        search.createdDate = json['CreatedDate'];
        search.modifiedBy = json['ModifiedBy'];
        search.modifiedDate = json['ModifiedDate'];
        search.isActive = json['IsActive'];

        return search;
    }

    toJson(resource: AtaDto) {
        const data = {};

        data['ATA_Id'] = resource.ata_Id;
        data['ATAChapter'] = resource.ataChapter;
        data['Description'] = resource.description;
        data['Equipment_Id'] = resource.equipment_Id;
        data['CreatedBy'] = resource.createdBy;
        data['CreatedDate'] = resource.createdDate;
        data['ModifiedBy'] = resource.modifiedBy;
        data['ModifiedDate'] = resource.modifiedDate;
        data['IsActive'] = resource.isActive;

        return data;
    }
}