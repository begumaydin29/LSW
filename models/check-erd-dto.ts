import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class CheckErdDto extends BaseDto {
    airPlaneIdList: number[] | undefined;
    referenceDesignator: string | undefined;
}

@Injectable()
export class CheckErdDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): CheckErdDto {
        json = typeof json === 'object' ? json : {};
        const search = new CheckErdDto();

        search.airPlaneIdList = json['AirPlaneIdList'];
        search.referenceDesignator = json['ReferenceDesignator'];

        return search;
    }

    toJson(resource: CheckErdDto) {
        const data = {};

        data['AirPlaneIdList'] = resource.airPlaneIdList;
        data['ReferenceDesignator'] = resource.referenceDesignator;

        return data;
    }
}