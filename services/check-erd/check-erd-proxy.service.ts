import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { CheckErdDto } from '@app/lsw/models/check-erd-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class CheckErdProxyService extends ServiceCrudBase<CheckErdDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/Equipment/CheckERDdescriptionByReferenceDesignatorAndAirplaneId'
    );
  };

}
