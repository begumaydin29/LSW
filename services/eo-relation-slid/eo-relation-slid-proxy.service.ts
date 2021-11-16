import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { EoRelationSlidDto } from '@app/lsw/models/eo-relation-slid-dto';

@Injectable()
export class EoRelationSlidProxyService extends ServiceCrudBase<EoRelationSlidDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/SWLocation/EORelationSLID'
    );
  };
}
