import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HwDescDto } from '@app/lsw/models/hwDesc-dto';
import { HttpClientService } from '@shared/http/http-client.service';
import { ApiResponse, ApiResponseOfT } from '@shared/models/api-response';
import { Observable } from 'rxjs';

@Injectable()
export class HwDescProxyService extends ServiceCrudBase<HwDescDto>{

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getHwPnDescription(hwpn): Observable<ApiResponse> {
    const base = '/lsw/Equipment/GetHWPNDescriptionByPartNumber?PartNumber=' + hwpn;
    return this.httpClientService.get<ApiResponse>(base);
  }
}
