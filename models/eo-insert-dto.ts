import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';
import { EoInsertModel } from './eo-insert-model';

export class EoInsertDto extends BaseDto {
    Id: number | undefined;
    EoNumber: string | undefined;
    OldPartNumber: string | undefined;
    NewPartNumber: string | undefined;
    SoftwareLocationSWvalue: string | undefined;
    SoftwareLocationId: number | undefined;
    EfStatus: string | undefined;
    CreatedBy: string | undefined;
    CreatedDate: Date | undefined;
    ModifiedBy: string | undefined;
    ModifiedDate: Date | undefined;
    IsActive: number | undefined;
    EoCategory: string | undefined;
    EoStatus: string | undefined;
    AirplaneId: number | undefined;
    EoEffectiveDate: Date | undefined;
    EfEffectiveDate: Date | undefined;
    PnEo: string | undefined;
    EoRevision: string | undefined;
    ParentId: number | undefined;
    SoftwareLocationSWvalueList: string[] | undefined;
    Description: string | undefined;

}