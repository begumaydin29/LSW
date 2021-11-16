import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class ErdDto extends BaseDto {
    tailNumber: string[] | undefined;
}

@Injectable()
export class ErdDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): ErdDto {
        json = typeof json === 'object' ? json : {};
        const search = new ErdDto();

        search.tailNumber = json['TailNumber'];

        return search;
    }

    toJson(resource: ErdDto) {
        const data = {};

        data['TailNumber'] = resource.tailNumber;

        return data;
    }
}