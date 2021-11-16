import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { BeforeSwPnDescriptionDto } from '@app/lsw/models/beforeSwPn-description-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class BeforeSwPnDescriptionProxyService extends ServiceCrudBase<BeforeSwPnDescriptionDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/LoadableSW/GetLoadableSWPartNumberDescriptionByPartNumber'
    );
  };
}
