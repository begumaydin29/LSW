import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class CheckHwPnDto extends BaseDto {
    airPlaneIdList: number[] | undefined;
    referenceDesignator: string | undefined;
    partNumber: string | undefined;
}

@Injectable()
export class CheckHwPnDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): CheckHwPnDto {
        json = typeof json === 'object' ? json : {};
        const search = new CheckHwPnDto();

        search.airPlaneIdList = json['AirPlaneIdList'];
        search.referenceDesignator = json['ReferenceDesignator'];
        search.partNumber = json['PartNumber'];

        return search;
    }

    toJson(resource: CheckHwPnDto) {
        const data = {};

        data['AirPlaneIdList'] = resource.airPlaneIdList;
        data['ReferenceDesignator'] = resource.referenceDesignator;
        data['PartNumber'] = resource.partNumber;

        return data;
    }
}