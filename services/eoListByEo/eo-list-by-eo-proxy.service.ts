import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { EoListByEoDto } from '@app/lsw/models/eo-list-by-eo-dto';
import { Observable } from 'rxjs';
import { ApiResponse } from '@shared/models/api-response';

@Injectable()
export class EoListByEoProxyService extends ServiceCrudBase<EoListByEoDto> {

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getEoListByEo(eo: string): Observable<ApiResponse> {
    this.endpoint = '/lsw/VwEngineeringOrder/EOListByEo?';

    this.endpoint = this.endpoint + 'Eo=' + eo;

    return this.http.get(this.endpoint);
  }
}
