import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class BeforeSwPnDescriptionDto extends BaseDto {
    partNumber: string | undefined;
}

@Injectable()
export class BeforeSwPnDescriptionDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): BeforeSwPnDescriptionDto {
        json = typeof json === 'object' ? json : {};
        const search = new BeforeSwPnDescriptionDto();

        search.partNumber = json['PartNumber'];

        return search;
    }

    toJson(resource: BeforeSwPnDescriptionDto) {
        const data = {};

        data['PartNumber'] = resource.partNumber;

        return data;
    }
}