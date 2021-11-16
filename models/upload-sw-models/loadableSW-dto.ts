import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';
import { AtaDto } from './ata-dto';
import { EquipmentRefDto } from './equipmentRef-dto';
import { DataLoadDto } from './data-load-dto';

export class LoadableSWDto extends BaseDto {
    loadableSW_Id: number | undefined;
    partNumber: string | undefined;
    name: string | undefined;
    description: string | undefined;
    interfaceVersionNumber: string | undefined;
    installedAndActive: string | undefined;
    size: number | undefined;
    type: number | undefined;
    swLocation_Id: number | undefined;
    createdBy: string | undefined;
    createdDate: Date | undefined;
    modifiedBy: string | undefined;
    modifiedDate: Date | undefined;
    isActive: number | undefined;
    eoRevision: string | undefined;
    eoNumber: string | undefined;
    parentId: number | undefined;
    efStatus: string | undefined;
    equipmentRefObj: EquipmentRefDto | undefined;
    dataLoadObj: DataLoadDto | undefined;
}

@Injectable()
export class LoadableSWDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): LoadableSWDto {
        json = typeof json === 'object' ? json : {};
        const search = new LoadableSWDto();

        search.loadableSW_Id = json['LoadableSW_Id'];
        search.partNumber = json['PartNumber'];
        search.name = json['Name'];
        search.description = json['Description'];
        search.interfaceVersionNumber = json['InterfaceVersionNumber'];
        search.installedAndActive = json['InstalledAndActive'];
        search.size = json['Size'];
        search.type = json['Type'];
        search.swLocation_Id = json['SWLocation_Id'];
        search.createdBy = json['CreatedBy'];
        search.createdDate = json['CreatedDate'];
        search.modifiedBy = json['ModifiedBy'];
        search.modifiedDate = json['ModifiedDate'];
        search.isActive = json['IsActive'];
        search.eoRevision = json['EoRevision'];
        search.eoNumber = json['EoNumber'];
        search.parentId = json['ParentId'];
        search.efStatus = json['EfStatus'];
        search.equipmentRefObj = json['EquipmentRefObj'];
        search.dataLoadObj = json['DataLoadObj'];

        return search;
    }

    toJson(resource: LoadableSWDto) {
        const data = {};

        data['LoadableSW_Id'] = resource.loadableSW_Id;
        data['PartNumber'] = resource.partNumber;
        data['Name'] = resource.name;
        data['Description'] = resource.description;
        data['InterfaceVersionNumber'] = resource.interfaceVersionNumber;
        data['InstalledAndActive'] = resource.installedAndActive;
        data['Size'] = resource.size;
        data['Type'] = resource.type;
        data['SWLocation_Id'] = resource.swLocation_Id;
        data['CreatedBy'] = resource.createdBy;
        data['CreatedDate'] = resource.createdDate;
        data['ModifiedBy'] = resource.modifiedBy;
        data['ModifiedDate'] = resource.modifiedDate;
        data['IsActive'] = resource.isActive;
        data['EoRevision'] = resource.eoRevision;
        data['EoNumber'] = resource.eoNumber;
        data['ParentId'] = resource.parentId;
        data['EfStatus'] = resource.efStatus;
        data['EquipmentRefObj'] = resource.equipmentRefObj;
        data['DataLoadObj'] = resource.dataLoadObj;

        return data;
    }
}