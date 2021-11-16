import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class EoRelationSlidDto extends BaseDto {
    partNumber: string | undefined;
    beforeSWPN: string | undefined;
}

@Injectable()
export class EoRelationSlidDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): EoRelationSlidDto {
        json = typeof json === 'object' ? json : {};
        const search = new EoRelationSlidDto();

        search.partNumber = json['PartNumber'];
        search.beforeSWPN = json['BeforeSWPN'];


        return search;
    }

    toJson(resource: EoRelationSlidDto) {
        const data = {};

        data['PartNumber'] = resource.partNumber;
        data['BeforeSWPN'] = resource.beforeSWPN;

        return data;
    }
}