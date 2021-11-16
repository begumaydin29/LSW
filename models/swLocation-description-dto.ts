
import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class SwLocationDescriptionDto extends BaseDto {
    id: number | undefined;
    description: string | undefined;
    hardwareType: string | undefined;
    swLocationValue: string | undefined;
    swLocationType: string | undefined;
    airplaneId: number | undefined;
    createdBy: string | undefined;
    createdDate: Date | undefined;
    modifiedBy: string | undefined;
    modifiedDate: Date | undefined;
    isActive: number | undefined;
}

@Injectable()
export class SwLocationDescriptionDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): SwLocationDescriptionDto {
        json = typeof json === 'object' ? json : {};
        const search = new SwLocationDescriptionDto();

        search.id = json['Id'];
        search.description = json['Description'];
        search.hardwareType = json['HardwareType'];
        search.swLocationValue = json['SWLocationValue'];
        search.swLocationType = json['SwLocationType'];
        search.airplaneId = json['AirplaneId'];
        search.createdBy = json['CreatedBy'];
        search.createdDate = json['CreatedDate'];
        search.modifiedBy = json['ModifiedBy'];
        search.modifiedDate = json['ModifiedDate'];
        search.isActive = json['IsActive'];

        return search;
    }

    toJson(resource: SwLocationDescriptionDto) {
        const data = {};

        data['Id'] = resource.id;
        data['Description'] = resource.description;
        data['HardwareType'] = resource.hardwareType;
        data['SWLocationValue'] = resource.swLocationValue;
        data['SwLocationType'] = resource.swLocationType;
        data['AirplaneId'] = resource.airplaneId;
        data['CreatedBy'] = resource.createdBy;
        data['CreatedDate'] = resource.createdDate;
        data['ModifiedBy'] = resource.modifiedBy;
        data['ModifiedDate'] = resource.modifiedDate;
        data['IsActive'] = resource.isActive;

        return data;
    }
}
