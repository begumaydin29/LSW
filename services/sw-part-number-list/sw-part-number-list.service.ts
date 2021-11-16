import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class SwPartNumberListService extends ServiceCrudBase<any>{

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/LoadableSW/GetLoadableSWPartNumberList',
    );
  };

}
