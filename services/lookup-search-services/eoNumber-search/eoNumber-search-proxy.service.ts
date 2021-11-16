import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { EoNumberSearchDto } from '@app/lsw/models/lookup-search-models/eoNumber-search-dto';
import { ApiResponse } from '@shared/models/api-response';
import { Observable } from 'rxjs';

@Injectable()
export class EoNumberSearchProxyService extends ServiceCrudBase<EoNumberSearchDto> {
  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getEoNoList(searchModel, eoNo): Observable<ApiResponse> {
    return this.httpClientService.post<ApiResponse>(
      '/lsw/LookUp/EoNumber/Search?eoNumber=' + eoNo,
      searchModel,
      eoNo
    );
  }

  getAllEoNoListbySearchTerm(searchTerm): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/EoNumber/Search?eoNumber=' + searchTerm
    );
  }

  getAllEoNoList(startIndex): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/EoNumber/SearchAll?startIndex=' + startIndex
    );
  }
}
