import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { ErdSearchDto } from '@app/lsw/models/lookup-search-models/erd-search-dto';
import { ApiResponse } from '@shared/models/api-response';
import { Observable } from 'rxjs';

@Injectable()
export class ErdSearchProxyService extends ServiceCrudBase<ErdSearchDto> {
  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getErdList(searchModel, erd): Observable<ApiResponse> {
    return this.httpClientService.post<ApiResponse>(
      '/lsw/LookUp/Erd/Search?Erd=' + erd,
      searchModel,
      erd
    );
  }

  getAllErdListBySearchTerm(searchTerm): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/Erd/Search?Erd=' + searchTerm
    );
  }

  getAllErdList(startIndex): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/Erd/SearchAll?startIndex=' + startIndex
    );
  }
}
