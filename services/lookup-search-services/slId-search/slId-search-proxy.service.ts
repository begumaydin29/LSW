import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { SlIdSearchDto } from '@app/lsw/models/lookup-search-models/slId-search-dto';
import { ApiResponse } from '@shared/models/api-response';
import { Observable } from 'rxjs';

@Injectable()
export class SlIdSearchProxyService extends ServiceCrudBase<SlIdSearchDto> {
  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getSlidList(searchModel, slid): Observable<ApiResponse> {
    return this.httpClientService.post<ApiResponse>(
      '/lsw/LookUp/SlId/Search?slId=' + slid,
      searchModel,
      slid
    );
  }

  getAllSlidListBySearchTerm(searchTerm): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/SlId/Search?slId=' + searchTerm
    );
  }

  getAllSlidList(startIndex): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/SlId/SearchAll?startIndex=' + startIndex
    );
  }
}
