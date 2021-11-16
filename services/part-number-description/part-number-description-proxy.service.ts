import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { PartNumberDescriptionDto } from '@app/lsw/models/part-number-description-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class PartNumberDescriptionProxyService extends ServiceCrudBase<PartNumberDescriptionDto>{

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/Equipment/GetHWDescriptionByAirPlaneIdAndReferenceDesignatorAndPartNumber',
    );
  };
}
