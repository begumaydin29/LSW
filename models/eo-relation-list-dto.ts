import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class EoRelationListDto extends BaseDto {
    id: number | undefined;
    eoNumber: string | undefined;
    oldPartNumber: string | undefined;
    newPartNumber: string | undefined;
    softwareLocationSWvalue: string | undefined;
    softwareLocationId: string | undefined;
    efStatus: string | undefined;
    createdBy: string | undefined;
    createdDate: Date | undefined;
    modifiedBy: string | undefined;
    modifiedDate: Date | undefined;
    isActive: boolean | undefined;
    eoCategory: string | undefined;
    eoStatus: string | undefined;
    airplaneId: number | undefined;
    eoEffectiveDate: Date | undefined;
    efEffectiveDate: Date | undefined;
    pnEo: string | undefined;
    eoRevision: string | undefined;
    parentId: number | undefined;
    softwareLocationSWvalueList: any[] | undefined;
    description: string | undefined;
}

@Injectable()
export class EoRelationListDtoDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): EoRelationListDto {
        json = typeof json === 'object' ? json : {};
        const search = new EoRelationListDto();

        search.id = json['Id'];
        search.eoNumber = json['EoNumber'];
        search.oldPartNumber = json['OldPartNumber'];
        search.newPartNumber = json['NewPartNumber'];
        search.softwareLocationSWvalue = json['SoftwareLocationSWvalue'];
        search.softwareLocationId = json['SoftwareLocationId'];
        search.efStatus = json['EfStatus'];
        search.createdBy = json['CreatedBy'];
        search.createdDate = json['CreatedDate'];
        search.modifiedBy = json['ModifiedBy'];
        search.modifiedDate = json['ModifiedDate'];
        search.isActive = json['IsActive'];
        search.eoCategory = json['EoCategory'];
        search.eoStatus = json['EoStatus'];
        search.airplaneId = json['AirplaneId'];
        search.eoEffectiveDate = json['EoEffectiveDate'];
        search.efEffectiveDate = json['EfEffectiveDate'];
        search.pnEo = json['PnEo'];
        search.eoRevision = json['EoRevision'];
        search.parentId = json['ParentId'];
        search.softwareLocationSWvalueList = json['SoftwareLocationSWvalueList'];
        search.description = json['Description'];

        return search;
    }

    toJson(resource: EoRelationListDto) {
        const data = {};

        data['Id'] = resource.id;
        data['EoNumber'] = resource.eoNumber;
        data['OldPartNumber'] = resource.oldPartNumber;
        data['NewPartNumber'] = resource.newPartNumber;
        data['SoftwareLocationSWvalue'] = resource.softwareLocationSWvalue;
        data['SoftwareLocationId'] = resource.softwareLocationId;
        data['EfStatus'] = resource.efStatus;
        data['CreatedBy'] = resource.createdBy;
        data['CreatedDate'] = resource.createdDate;
        data['ModifiedBy'] = resource.modifiedBy;
        data['ModifiedDate'] = resource.modifiedDate;
        data['IsActive'] = resource.isActive;
        data['EoCategory'] = resource.eoCategory;
        data['EoStatus'] = resource.eoStatus;
        data['AirplaneId'] = resource.airplaneId;
        data['EoEffectiveDate'] = resource.eoEffectiveDate;
        data['EfEffectiveDate'] = resource.efEffectiveDate;
        data['PnEo'] = resource.pnEo;
        data['EoRevision'] = resource.eoRevision;
        data['ParentId'] = resource.parentId;
        data['SoftwareLocationSWvalueList'] = resource.softwareLocationSWvalueList;
        data['Description'] = resource.description;

        return data;
    }
}