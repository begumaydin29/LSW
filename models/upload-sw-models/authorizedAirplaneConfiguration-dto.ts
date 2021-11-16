import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class AuthorizedAirplaneConfigurationDto extends BaseDto {
    id: number | undefined;
    advice: string | undefined;
    name: string | undefined;
    schemaVersion: string | undefined;
    time: string | undefined;
    date: string | undefined;
    createdBy: string | undefined;
    createdDate: Date | undefined;
    modifiedBy: string | undefined;
    modifiedDate: Date | undefined;
    isActive: number | undefined;
}

@Injectable()
export class AuthorizedAirplaneConfigurationDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): AuthorizedAirplaneConfigurationDto {
        json = typeof json === 'object' ? json : {};
        const search = new AuthorizedAirplaneConfigurationDto();

        search.id = json['Id'];
        search.advice = json['Advice'];
        search.name = json['Name'];
        search.schemaVersion = json['SchemaVersion'];
        search.time = json['Time'];
        search.date = json['Date'];
        search.createdBy = json['CreatedBy'];
        search.createdDate = json['CreatedDate'];
        search.modifiedBy = json['ModifiedBy'];
        search.modifiedDate = json['ModifiedDate'];
        search.isActive = json['IsActive'];

        return search;
    }

    toJson(resource: AuthorizedAirplaneConfigurationDto) {
        const data = {};

        data['Id'] = resource.id;
        data['Advice'] = resource.advice;
        data['Name'] = resource.name;
        data['SchemaVersion'] = resource.schemaVersion;
        data['Time'] = resource.time;
        data['Date'] = resource.date;
        data['CreatedBy'] = resource.createdBy;
        data['CreatedDate'] = resource.createdDate;
        data['ModifiedBy'] = resource.modifiedBy;
        data['ModifiedDate'] = resource.modifiedDate;
        data['IsActive'] = resource.isActive;

        return data;
    }
}