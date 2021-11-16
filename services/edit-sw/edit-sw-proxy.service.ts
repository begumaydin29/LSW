import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { EditDto } from '@app/lsw/models/edit-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class EditSwProxyService extends ServiceCrudBase<EditDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/ListSw/Update'
    );
  };

}
