import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class ActiveTailNumberDto extends BaseDto {
    Id: number | undefined;
    LineNumber: number | undefined;
    MajorModel: string | undefined;
    MinorModel: string | undefined;
    RegistrationNumber: string | undefined;
    TailNumber: string | undefined;
    AirplaneConfigurationId: number | undefined;
    CreatedBy: string | undefined;
    CreatedDate: Date | undefined;
    ModifiedBy: string | undefined;
    ModifiedDate: Date | undefined;
    IsActive: number | undefined;
}
