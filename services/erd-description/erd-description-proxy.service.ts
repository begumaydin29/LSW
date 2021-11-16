import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { ErdDescriptionDto } from '@app/lsw/models/erd-description-dto';
import { HttpClientService } from '@shared/http/http-client.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '@shared/models/api-response';

@Injectable()
export class ErdDescriptionProxyService extends ServiceCrudBase<ErdDescriptionDto> {

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getErdDescriptionByErd(erd): Observable<ApiResponse> {
    const base = '/lsw/Equipment/GetERDDescriptionByReferenceDesignator?ReferenceDesignator=' + erd;
    return this.httpClientService.get<ApiResponse>(base);
  }

}
