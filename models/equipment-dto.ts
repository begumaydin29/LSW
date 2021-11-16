import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class EquipmentDto extends BaseDto {
    equipment_Id: number | undefined;
    key: string | undefined;
    type: string | undefined;
    name: string | undefined;
    description: string | undefined;
    partNumber: string | undefined;
    referenceDesignator: number | undefined;
    airplane_Id: string | undefined;
    createdBy: string | undefined;
    createdDate: Date | undefined;
    modifiedBy: string | undefined;
    modifiedDate: Date | undefined;
    isActive: number | undefined;
    ataDtoObj_: string | undefined;
    airplaneList: string | undefined;
    airplaneId: number[] | undefined;
}

@Injectable()
export class EquipmentDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): EquipmentDto {
        json = typeof json === 'object' ? json : {};
        const search = new EquipmentDto();

        search.equipment_Id = json['Equipment_Id'];
        search.key = json['Key'];
        search.type = json['Type'];
        search.name = json['Name'];
        search.description = json['Description'];
        search.partNumber = json['PartNumber'];
        search.referenceDesignator = json['ReferenceDesignator'];
        search.airplane_Id = json['Airplane_Id'];
        search.createdBy = json['CreatedBy'];
        search.createdDate = json['CreatedDate'];
        search.modifiedBy = json['ModifiedBy'];
        search.modifiedDate = json['ModifiedDate'];
        search.isActive = json['IsActive'];
        search.ataDtoObj_ = json['ataDtoObj'];
        search.airplaneList = json['AirplaneList'];
        search.airplaneId = json['AirplaneId'];

        return search;
    }

    toJson(resource: EquipmentDto) {
        const data = {};

        data['Equipment_Id'] = resource.equipment_Id;
        data['Key'] = resource.key;
        data['Type'] = resource.type;
        data['Name'] = resource.name;
        data['Description'] = resource.description;
        data['PartNumber'] = resource.partNumber;
        data['ReferenceDesignator'] = resource.referenceDesignator;
        data['Airplane_Id'] = resource.airplane_Id;
        data['CreatedBy'] = resource.createdBy;
        data['CreatedDate'] = resource.createdDate;
        data['ModifiedBy'] = resource.modifiedBy;
        data['ModifiedDate'] = resource.modifiedDate;
        data['IsActive'] = resource.isActive;
        data['ataDtoObj'] = resource.ataDtoObj_;
        data['AirplaneList'] = resource.airplaneList;
        data['AirplaneId'] = resource.airplaneId;

        return data;
    }
}