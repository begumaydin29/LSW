import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class CheckSlidDto extends BaseDto {
    airPlaneIdList: number[] | undefined;
    swLocationValue: string | undefined;
}

@Injectable()
export class CheckSlidDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): CheckSlidDto {
        json = typeof json === 'object' ? json : {};
        const search = new CheckSlidDto();

        search.airPlaneIdList = json['AirPlaneIdList'];
        search.swLocationValue = json['SwLocationValue'];

        return search;
    }

    toJson(resource: CheckSlidDto) {
        const data = {};

        data['AirPlaneIdList'] = resource.airPlaneIdList;
        data['SwLocationValue'] = resource.swLocationValue;

        return data;
    }
}