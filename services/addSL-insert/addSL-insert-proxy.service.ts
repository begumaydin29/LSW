import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';

import { HttpClientService } from '@shared/http/http-client.service';
import { AddSLInsertDto } from '@app/lsw/models/addSL-insert-dto';

@Injectable()
export class AddSLInsertProxyService extends ServiceCrudBase<AddSLInsertDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/SWLocation/LocationInsert'
    );
  };

}
