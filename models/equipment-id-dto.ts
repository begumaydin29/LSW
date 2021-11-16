import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class EquipmentIdDto extends BaseDto {
    partNumber: string | undefined;
}

@Injectable()
export class EquipmentIdDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): EquipmentIdDto {
        json = typeof json === 'object' ? json : {};
        const search = new EquipmentIdDto();

        search.partNumber = json['PartNumber'];

        return search;
    }

    toJson(resource: EquipmentIdDto) {
        const data = {};

        data['PartNumber'] = resource.partNumber;

        return data;
    }
}