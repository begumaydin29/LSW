import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class HwPnDto extends BaseDto {
    tailNumber: string[] | undefined;
    referenceDesignator: string | undefined;
}

@Injectable()
export class HwPnDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): HwPnDto {
        json = typeof json === 'object' ? json : {};
        const search = new HwPnDto();

        search.tailNumber = json['TailNumber'];
        search.referenceDesignator = json['ReferenceDesignator'];

        return search;
    }

    toJson(resource: HwPnDto) {
        const data = {};

        data['TailNumber'] = resource.tailNumber;
        data['ReferenceDesignator'] = resource.referenceDesignator;

        return data;
    }
}