import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';
import { AtaDto } from './ata-dto';
import { EquipmentRefDto } from './equipmentRef-dto';
import { DataLoadDto } from './data-load-dto';
import { LoadableSWDto } from './loadableSW-dto';

export class SWLocationDto extends BaseDto {
    swLocation_Id: number | undefined;
    description: string | undefined;
    hardwareType: string | undefined;
    value: string | undefined;
    type: string | undefined;
    airplane_Id: number | undefined;
    size: number | undefined;
    createdBy: string | undefined;
    createdDate: Date | undefined;
    modifiedBy: string | undefined;
    modifiedDate: Date | undefined;
    isActive: number | undefined;
    loadableObj: LoadableSWDto | undefined;
}

@Injectable()
export class SWLocationDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): SWLocationDto {
        json = typeof json === 'object' ? json : {};
        const search = new SWLocationDto();

        search.swLocation_Id = json['SWLocation_Id'];
        search.description = json['Description'];
        search.hardwareType = json['HardwareType'];
        search.value = json['Value'];
        search.type = json['Type'];
        search.airplane_Id = json['Airplane_Id'];
        search.createdBy = json['CreatedBy'];
        search.createdDate = json['CreatedDate'];
        search.modifiedBy = json['ModifiedBy'];
        search.modifiedDate = json['ModifiedDate'];
        search.isActive = json['IsActive'];
        search.loadableObj = json['loadableObj'];


        return search;
    }

    toJson(resource: SWLocationDto) {
        const data = {};

        data['SWLocation_Id'] = resource.swLocation_Id;
        data['Description'] = resource.description;
        data['HardwareType'] = resource.hardwareType;
        data['Value'] = resource.value;
        data['Type'] = resource.type;
        data['Airplane_Id'] = resource.airplane_Id;
        data['CreatedBy'] = resource.createdBy;
        data['CreatedDate'] = resource.createdDate;
        data['ModifiedBy'] = resource.modifiedBy;
        data['ModifiedDate'] = resource.modifiedDate;
        data['IsActive'] = resource.isActive;
        data['loadableObj'] = resource.loadableObj;

        return data;
    }
}