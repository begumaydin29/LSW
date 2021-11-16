import { Injectable } from '@angular/core';
import { ErdDescriptionDto } from '@app/lsw/models/erd-description-dto';
import { HttpClientService } from '@shared/http/http-client.service';
import { ApiResponse } from '@shared/models/api-response';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { Observable } from 'rxjs';

@Injectable()
export class EquipmentKeyProxyService extends ServiceCrudBase<ErdDescriptionDto> {

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getAllEquipmentKeys(): Observable<ApiResponse> {
    const base = '/lsw/Equipment/GetEquipmentList';
    return this.httpClientService.get<ApiResponse>(base);
  }
}
