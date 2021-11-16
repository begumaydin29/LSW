import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class HwDescDto extends BaseDto {
    airPlaneIdList: number[] | undefined;
    referenceDesignator: string | undefined;
    partNumber: string | undefined;
}

@Injectable()
export class HwDescDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): HwDescDto {
        json = typeof json === 'object' ? json : {};
        const search = new HwDescDto();

        search.airPlaneIdList = json['AirPlaneIdList'];
        search.referenceDesignator = json['ReferenceDesignator'];
        search.partNumber = json['PartNumber'];

        return search;
    }

    toJson(resource: HwDescDto) {
        const data = {};

        data['AirPlaneIdList'] = resource.airPlaneIdList;
        data['ReferenceDesignator'] = resource.referenceDesignator;
        data['PartNumber'] = resource.partNumber;

        return data;
    }
}