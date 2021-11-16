import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { ErdDto } from '@app/lsw/models/erd-dto';
import { HttpClientService } from '@shared/http/http-client.service';
import { ApiResponse } from '@shared/models/api-response';
import { Observable } from 'rxjs';

@Injectable()
export class ErdProxyService extends ServiceCrudBase<ErdDto> {

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getEquipmentReferenceDesignatorList(searchModels, erd): Observable<ApiResponse> {
    const base = '/lsw/Equipment/GetReferenceDesignator?Erd=' + erd;
    return this.httpClientService.post<ApiResponse>(base, searchModels, erd);
  }
}
