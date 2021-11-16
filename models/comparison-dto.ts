import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class ComparisonDto extends BaseDto {
    LoadableSw_Description: string | undefined;
    LoadableSw_PartNumber: string | undefined;
    SwLocationValue: string | undefined;
    SwLocationValue_Description: string | undefined;
    AtaChapter: string | undefined;
    EqKey: string | undefined;
}