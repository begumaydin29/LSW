import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class AtaChapterSearchDto extends BaseDto {
    value: string | undefined;
    name: string | undefined;
}

@Injectable()
export class AtaChapterDtoSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): AtaChapterSearchDto {
        json = typeof json === 'object' ? json : {};
        const search = new AtaChapterSearchDto();

        search.value = json['Value'];
        search.name = json['Name'];

        return search;
    }

    toJson(resource: AtaChapterSearchDto) {
        const data = {};

        data['Value'] = resource.value;
        data['Name'] = resource.name;

        return data;
    }
}