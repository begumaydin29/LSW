import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { StatusSearchDto } from '@app/lsw/models/lookup-search-models/status-search-dto';
import { ApiResponse } from '@shared/models/api-response';
import { Observable } from 'rxjs';

@Injectable()
export class StatusSearchProxyService extends ServiceCrudBase<StatusSearchDto> {
  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getStatusList(searchModel, status): Observable<ApiResponse> {
    return this.httpClientService.post<ApiResponse>(
      '/lsw/LookUp/Status/Search?status=' + status,
      searchModel,
      status
    );
  }

  getAllStatusListBySearchTerm(searchTerm): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/Status/Search?status=' + searchTerm
    );
  }

  getAllStatusList(startIndex): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/Status/SearchAll?startIndex=' + startIndex
    );
  }
}
