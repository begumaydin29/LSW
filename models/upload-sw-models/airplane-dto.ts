import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class AirplaneDto extends BaseDto {
    airplane_Id: number | undefined;
    majorModel: string | undefined;
    minorModel: string | undefined;
    registrationNumber: string | undefined;
    tailNumber: string | undefined;
    authorizedAirplaneConfiguration_Id: number | undefined;
    createdBy: string | undefined;
    createdDate: Date | undefined;
    modifiedBy: string | undefined;
    modifiedDate: Date | undefined;
    isActive: number | undefined;
}

@Injectable()
export class AirplaneDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): AirplaneDto {
        json = typeof json === 'object' ? json : {};
        const search = new AirplaneDto();

        search.airplane_Id = json['Airplane_Id'];
        search.majorModel = json['MajorModel'];
        search.minorModel = json['MinorModel'];
        search.registrationNumber = json['RegistrationNumber'];
        search.tailNumber = json['TailNumber'];
        search.authorizedAirplaneConfiguration_Id = json['AuthorizedAirplaneConfiguration_Id'];
        search.createdBy = json['CreatedBy'];
        search.createdDate = json['CreatedDate'];
        search.modifiedBy = json['ModifiedBy'];
        search.modifiedDate = json['ModifiedDate'];
        search.isActive = json['IsActive'];

        return search;
    }

    toJson(resource: AirplaneDto) {
        const data = {};

        data['Airplane_Id'] = resource.airplane_Id;
        data['MajorModel'] = resource.majorModel;
        data['MinorModel'] = resource.minorModel;
        data['RegistrationNumber'] = resource.registrationNumber;
        data['TailNumber'] = resource.tailNumber;
        data['AuthorizedAirplaneConfiguration_Id'] = resource.authorizedAirplaneConfiguration_Id;
        data['CreatedBy'] = resource.createdBy;
        data['CreatedDate'] = resource.createdDate;
        data['ModifiedBy'] = resource.modifiedBy;
        data['ModifiedDate'] = resource.modifiedDate;
        data['IsActive'] = resource.isActive;

        return data;
    }
}