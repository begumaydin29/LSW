import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { EoInsertDto } from '@app/lsw/models/eo-insert-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class DeleteEoProxyService extends ServiceCrudBase<EoInsertDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/EoSoftwareRelation/Delete'
    );
  };

}
