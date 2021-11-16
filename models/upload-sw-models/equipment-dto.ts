import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';
import { AtaDto } from './ata-dto';

export class EquipmentDto extends BaseDto {
    equipment_Id: number | undefined;
    key: string | undefined;
    type: string | undefined;
    name: string | undefined;
    description: string | undefined;
    partNumber: string | undefined;
    referenceDesignator: string | undefined;
    airplane_Id: number | undefined;
    createdBy: string | undefined;
    createdDate: Date | undefined;
    modifiedBy: string | undefined;
    modifiedDate: Date | undefined;
    isActive: number | undefined;
    ataDtoObj: AtaDto | undefined;
    airplaneList: any[] | undefined;
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

        return data;
    }
}