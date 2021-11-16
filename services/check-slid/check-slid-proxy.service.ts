import { Injectable } from '@angular/core';
import { CheckSlidDto } from '@app/lsw/models/check-slid-dto';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class CheckSlidProxyService extends ServiceCrudBase<CheckSlidDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/SWLocation/CheckSLIDBySwLocationValueAndAirplaneId'
    );
  };

}
