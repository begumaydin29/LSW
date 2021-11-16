import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class SlIdSearchDto extends BaseDto {
    value: string | undefined;
    name: string | undefined;
}

@Injectable()
export class SlIdSearchDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): SlIdSearchDto {
        json = typeof json === 'object' ? json : {};
        const search = new SlIdSearchDto();

        search.value = json['Value'];
        search.name = json['Name'];

        return search;
    }

    toJson(resource: SlIdSearchDto) {
        const data = {};

        data['Value'] = resource.value;
        data['Name'] = resource.name;

        return data;
    }
}