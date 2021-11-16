import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class EoListByEoDto extends BaseDto {
    eo: string | undefined;
}

@Injectable()
export class EoListByEoDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): EoListByEoDto {
        json = typeof json === 'object' ? json : {};
        const search = new EoListByEoDto();

        search.eo = json['Eo'];

        return search;
    }

    toJson(resource: EoListByEoDto) {
        const data = {};

        data['Eo'] = resource.eo;

        return data;
    }
}