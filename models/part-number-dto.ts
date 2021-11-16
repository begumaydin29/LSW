import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class PartNumberDto extends BaseDto {
    airplaneList: number[] | undefined;
    referenceDesignator: string | undefined;
}

@Injectable()
export class PartNumberDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): PartNumberDto {
        json = typeof json === 'object' ? json : {};
        const search = new PartNumberDto();

        search.airplaneList = json['AirplaneList'];
        search.referenceDesignator = json['ReferenceDesignator'];

        return search;
    }

    toJson(resource: PartNumberDto) {
        const data = {};

        data['AirplaneList'] = resource.airplaneList;
        data['ReferenceDesignator'] = resource.referenceDesignator;

        return data;
    }
}