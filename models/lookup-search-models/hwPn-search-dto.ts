import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class HwPnSearchDto extends BaseDto {
    value: string | undefined;
    name: string | undefined;
}

@Injectable()
export class HwPnSearchDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): HwPnSearchDto {
        json = typeof json === 'object' ? json : {};
        const search = new HwPnSearchDto();

        search.value = json['Value'];
        search.name = json['Name'];

        return search;
    }

    toJson(resource: HwPnSearchDto) {
        const data = {};

        data['Value'] = resource.value;
        data['Name'] = resource.name;

        return data;
    }
}