import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class AirplaneIdByTailNumberDto extends BaseDto {
    Airplane_Id: number | undefined;
    MajorModel: string | undefined;
    MinorModel: string | undefined;
    RegistrationNumber: string | undefined;
    TailNumber: string | undefined;
    AuthorizedAirplaneConfiguration_Id: string | undefined;
    CreatedBy: string | undefined;
    CreatedDate: Date | undefined;
    ModifiedBy: string | undefined;
    ModifiedDate: Date | undefined;
    IsActive: number | undefined;
}