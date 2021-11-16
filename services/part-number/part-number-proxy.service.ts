import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { PartNumberDto } from '@app/lsw/models/part-number-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class PartNumberProxyService extends ServiceCrudBase<PartNumberDto>{

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/Equipment/GetPartNumberByAirplaneIdAndReferenceDesignator',
    );
  };
}
