import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { ProtoTypesDto } from '@app/lsw/models/proto-types-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class InsertXmlDataProxyService extends ServiceCrudBase<ProtoTypesDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/Insert'
    );
  };

}
