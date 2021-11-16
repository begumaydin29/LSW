import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class AcRegSearchDto extends BaseDto {
    Value: string | undefined;
    Name: string | undefined;
}

@Injectable()
export class AcRegSearchDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): AcRegSearchDto {
        json = typeof json === 'object' ? json : {};
        const search = new AcRegSearchDto();

        search.Value = json['Value'];
        search.Name = json['Name'];

        return search;
    }

    toJson(resource: AcRegSearchDto) {
        const data = {};

        data['Value'] = resource.Value;
        data['Name'] = resource.Name;

        return data;
    }
}