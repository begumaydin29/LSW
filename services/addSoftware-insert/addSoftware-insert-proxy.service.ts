import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { AddSoftwareInsertDto } from '@app/lsw/models/addSoftware-insert-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class AddSoftwareInsertProxyService extends ServiceCrudBase<AddSoftwareInsertDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/AddSW/SoftwareInsert'
    );
  };

}
