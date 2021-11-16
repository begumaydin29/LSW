import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { EoInsertDto } from '@app/lsw/models/eo-insert-dto';
import { HttpClientService } from '@shared/http/http-client.service';
import { ApiResponse } from '@shared/models/api-response';
import { Observable } from 'rxjs';

@Injectable()
export class EoInsertProxyService extends ServiceCrudBase<EoInsertDto> {

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  insertEo(data): Observable<ApiResponse> {
    const base = '/lsw/EoSoftwareRelation/Insert';
    return this.httpClientService.post<ApiResponse>(base, data);
  }


}
