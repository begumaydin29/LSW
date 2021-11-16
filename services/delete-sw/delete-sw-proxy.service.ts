import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { DeleteDto } from '@app/lsw/models/delete-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class DeleteSwProxyService extends ServiceCrudBase<DeleteDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/ListSw/Delete'
    );
  };

}
