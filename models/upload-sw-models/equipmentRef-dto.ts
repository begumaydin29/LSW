import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class EquipmentRefDto extends BaseDto {
    equipmentRef_Id: number | undefined;
    key: string | undefined;
    loadableSW_Id: number | undefined;
    createdBy: string | undefined;
    createdDate: Date | undefined;
    modifiedBy: string | undefined;
    modifiedDate: Date | undefined;
    isActive: number | undefined;
}

@Injectable()
export class EquipmentRefDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): EquipmentRefDto {
        json = typeof json === 'object' ? json : {};
        const search = new EquipmentRefDto();

        search.equipmentRef_Id = json['EquipmentRef_Id'];
        search.key = json['Key'];
        search.loadableSW_Id = json['LoadableSW_Id'];
        search.createdBy = json['CreatedBy'];
        search.createdDate = json['CreatedDate'];
        search.modifiedBy = json['ModifiedBy'];
        search.modifiedDate = json['ModifiedDate'];
        search.isActive = json['IsActive'];

        return search;
    }

    toJson(resource: EquipmentRefDto) {
        const data = {};

        data['EquipmentRef_Id'] = resource.equipmentRef_Id;
        data['Key'] = resource.key;
        data['LoadableSW_Id'] = resource.loadableSW_Id;
        data['CreatedBy'] = resource.createdBy;
        data['CreatedDate'] = resource.createdDate;
        data['ModifiedBy'] = resource.modifiedBy;
        data['ModifiedDate'] = resource.modifiedDate;
        data['IsActive'] = resource.isActive;

        return data;
    }
}