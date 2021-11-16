import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class UserUmsDto extends BaseDto {
    registerId: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    title: string | undefined;
    email: string | undefined;

}

@Injectable()
export class UserUmsSerializer extends BaseSerializer implements Serializer {
    constructor() {
        super();
    }

    fromJson(json: any): UserUmsDto {
        json = typeof json === 'object' ? json : {};
        const userUms = new UserUmsDto();

        userUms.registerId = json['REGISTER_ID'];
        userUms.first_name = json['FIRST_NAME'];
        userUms.last_name = json['LAST_NAME'];
        userUms.title = json['TITLE'];
        userUms.email = json['EMAIL'];

        return userUms;
    }

    toJson(resource: UserUmsDto) {
        const data = {};

        return data;
    }
}