import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { ListSoftwareDto } from '@app/lsw/models/list-software-dto';
import { HttpClientService } from '@shared/http/http-client.service';
import { ApiResponse } from '@shared/models/api-response';

@Injectable()
export class ListSoftwareService extends ServiceCrudBase<ListSoftwareDto> {

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  listSoftware() {

    const base = '/lsw/AddSW/ListSoftwareSearch';
    return this.httpClientService.get<ApiResponse>(base);

  }

}
