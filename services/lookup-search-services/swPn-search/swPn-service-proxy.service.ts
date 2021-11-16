import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { SwPnSearchDto } from '@app/lsw/models/lookup-search-models/swPn-search-dto';
import { Observable } from 'rxjs';
import { ApiResponse } from '@shared/models/api-response';

@Injectable()
export class SwPnServiceProxyService extends ServiceCrudBase<SwPnSearchDto> {
  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getSwPnList(searchModel, swPn): Observable<ApiResponse> {
    return this.httpClientService.post<ApiResponse>(
      '/lsw/LookUp/SwPn/Search?swPn=' + swPn,
      searchModel,
      swPn
    );
  }
  getAllSwPnList(startIndex: number): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/SwPn/SearchAll?startIndex=' + startIndex
    );
  }
  getAllSwPnListBySearchTerm(swPn: string) {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/SwPn/Search?swPn=' + swPn
    );
  }
  getSwPnDescriptionBySwPn(swPn): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LoadableSW/GetLoadableSWPartNumberDescriptionByPartNumber?PartNumber=' +
        swPn
    );
  }
}
