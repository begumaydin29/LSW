import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class SwPnSearchDto extends BaseDto {
    value: string | undefined;
    name: string | undefined;
}

@Injectable()
export class SwPnSearchDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): SwPnSearchDto {
        json = typeof json === 'object' ? json : {};
        const search = new SwPnSearchDto();

        search.value = json['Value'];
        search.name = json['Name'];

        return search;
    }

    toJson(resource: SwPnSearchDto) {
        const data = {};

        data['Value'] = resource.value;
        data['Name'] = resource.name;

        return data;
    }
}