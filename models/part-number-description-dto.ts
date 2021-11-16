import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class PartNumberDescriptionDto extends BaseDto {
    airplaneList: number[] | undefined;
    referenceDesignator: string | undefined;
    partNumber: string | undefined;

}

@Injectable()
export class PartNumberDescriptionDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): PartNumberDescriptionDto {
        json = typeof json === 'object' ? json : {};
        const search = new PartNumberDescriptionDto();

        search.airplaneList = json['AirplaneList'];
        search.referenceDesignator = json['ReferenceDesignator'];
        search.partNumber = json['PartNumber'];

        return search;
    }

    toJson(resource: PartNumberDescriptionDto) {
        const data = {};

        data['AirplaneList'] = resource.airplaneList;
        data['ReferenceDesignator'] = resource.referenceDesignator;
        data['PartNumber'] = resource.partNumber;

        return data;
    }
}