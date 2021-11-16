import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { CheckHwPnDto } from '@app/lsw/models/check-hwPn-dto';

@Injectable()
export class CheckHwPnProxyService extends ServiceCrudBase<CheckHwPnDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/Equipment/CheckHWPnByPartNumberAndReferenceDesignatorAndAirplaneId'
    );
  };

}
