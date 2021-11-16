import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class ErdDescriptionDto extends BaseDto {
    tailNumber: string[] | undefined;
    referenceDesignator: string | undefined;
}

@Injectable()
export class ErdDescriptionDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): ErdDescriptionDto {
        json = typeof json === 'object' ? json : {};
        const search = new ErdDescriptionDto();

        search.tailNumber = json['TailNumber'];
        search.referenceDesignator = json['ReferenceDesignator'];

        return search;
    }

    toJson(resource: ErdDescriptionDto) {
        const data = {};

        data['TailNumber'] = resource.tailNumber;
        data['ReferenceDesignator'] = resource.referenceDesignator;

        return data;
    }
}