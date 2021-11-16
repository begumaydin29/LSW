import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { SwLocationDescriptionDto } from '@app/lsw/models/swLocation-description-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class SwLocationDescriptionProxyService extends ServiceCrudBase<SwLocationDescriptionDto>{

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/SWLocation/SoftwareLocationDescription',
    );
  };

}
