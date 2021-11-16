import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class DataLoadDto extends BaseDto {
    dataLoad_Id: number | undefined;
    selection: string | undefined;
    loadableSW_Id: number | undefined;
    schemaVersion: string | undefined;
    createdBy: string | undefined;
    createdDate: Date | undefined;
    modifiedBy: string | undefined;
    modifiedDate: Date | undefined;
    isActive: number | undefined;
}

@Injectable()
export class DataLoadDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): DataLoadDto {
        json = typeof json === 'object' ? json : {};
        const search = new DataLoadDto();

        search.dataLoad_Id = json['DataLoad_Id'];
        search.selection = json['Selection'];
        search.loadableSW_Id = json['LoadableSW_Id'];
        search.schemaVersion = json['SchemaVersion'];
        search.createdBy = json['CreatedBy'];
        search.createdDate = json['CreatedDate'];
        search.modifiedBy = json['ModifiedBy'];
        search.modifiedDate = json['ModifiedDate'];
        search.isActive = json['IsActive'];

        return search;
    }

    toJson(resource: DataLoadDto) {
        const data = {};

        data['DataLoad_Id'] = resource.dataLoad_Id;
        data['Selection'] = resource.selection;
        data['LoadableSW_Id'] = resource.loadableSW_Id;
        data['SchemaVersion'] = resource.schemaVersion;
        data['CreatedBy'] = resource.createdBy;
        data['CreatedDate'] = resource.createdDate;
        data['ModifiedBy'] = resource.modifiedBy;
        data['ModifiedDate'] = resource.modifiedDate;
        data['IsActive'] = resource.isActive;

        return data;
    }
}