import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { ActiveTailNumberDto } from '@app/lsw/models/active-tail-number-dto';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from '@shared/http/http-client.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '@shared/models/api-response';

@Injectable()
export class ActiveTailNumberProxyService extends ServiceCrudBase<ActiveTailNumberDto> {

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  listAcReg(): Observable<ApiResponse> {
    const base = '/lsw/Airplane/GetActiveTailNumber/Search';
    return this.httpClientService.get<ApiResponse>(base);
  }

}
