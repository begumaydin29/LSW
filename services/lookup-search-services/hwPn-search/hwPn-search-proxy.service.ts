import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { HwPnSearchDto } from '@app/lsw/models/lookup-search-models/hwPn-search-dto';
import { ApiResponse } from '@shared/models/api-response';
import { Observable } from 'rxjs';

@Injectable()
export class HwPnSearchProxyService extends ServiceCrudBase<HwPnSearchDto> {
  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getHwPnList(searchModel, hwPn): Observable<ApiResponse> {
    return this.httpClientService.post<ApiResponse>(
      '/lsw/LookUp/HwPn/Search?hwPn=' + hwPn,
      searchModel,
      hwPn
    );
  }

  getAllHwPnListBySearchTerm(searchTerm): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/HwPn/Search?hwPn=' + searchTerm
    );
  }

  getAllHwPnList(startIndex): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/HwPn/SearchAll?startIndex=' + startIndex
    );
  }
}
