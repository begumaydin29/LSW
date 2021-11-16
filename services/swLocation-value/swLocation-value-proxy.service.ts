import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { SwLocationValueDto } from '@app/lsw/models/swLocation-value-dto';

@Injectable()
export class SwLocationValueProxyService extends ServiceCrudBase<SwLocationValueDto>{

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/SWLocation/SoftwareLocationSWLOCATION_VALUE/',
    );
  };
}
