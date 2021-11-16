import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HwPnDto } from '@app/lsw/models/hwPn-dto';
import { HttpClientService } from '@shared/http/http-client.service';
import { ApiResponse } from '@shared/models/api-response';
import { Observable } from 'rxjs';

@Injectable()
export class HwPnProxyService extends ServiceCrudBase<HwPnDto>{

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getHwPnList(searchModels, hwpn): Observable<ApiResponse> {
    const base = '/lsw/Equipment/GetHWPN?HwPn=' + hwpn;
    return this.httpClientService.post<ApiResponse>(base, searchModels, hwpn);
  }

}
