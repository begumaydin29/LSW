import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class SwLocationValueDto extends BaseDto {
    swLocationValue: string | undefined;
}

@Injectable()
export class SwLocationValueDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): SwLocationValueDto {
        json = typeof json === 'object' ? json : {};
        const search = new SwLocationValueDto();

        search.swLocationValue = json['SWLocationValue'];

        return search;
    }

    toJson(resource: SwLocationValueDto) {
        const data = {};

        data['SWLocationValue'] = resource.swLocationValue;

        return data;
    }
}