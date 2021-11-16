import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { EoInsertDto } from '@app/lsw/models/eo-insert-dto';
import { Observable } from 'rxjs';
import { ApiResponse } from '@shared/models/api-response';

@Injectable()
export class EoListProxyService extends ServiceCrudBase<EoInsertDto> {

  // constructor(http: HttpClientService) {
  //   super(
  //     http,
  //     '/lsw/EoSoftwareRelation/GetEoRelationList'
  //   );
  // };

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  listEoSwRelation(): Observable<ApiResponse> {
    const base = '/lsw/EoSoftwareRelation/GetEoRelationList';
    return this.httpClientService.get<ApiResponse>(base);
  }

}
