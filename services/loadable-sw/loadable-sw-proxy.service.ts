import { Injectable } from '@angular/core';
import { ErdDescriptionDto } from '@app/lsw/models/erd-description-dto';
import { HttpClientService } from '@shared/http/http-client.service';
import { ApiResponse } from '@shared/models/api-response';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { Observable } from 'rxjs';

@Injectable()
export class LoadableSwProxyService extends ServiceCrudBase<ErdDescriptionDto> {
  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getLoadableSwAllPartNumbers(): Observable<ApiResponse> {
    const base = '/lsw/LoadableSW/GetLoadableSWAllPartNumberList';
    return this.httpClientService.get<ApiResponse>(base);
  }

  getLoadableSwAllDescriptionsBySearchTerm(
    searchTerm
  ): Observable<ApiResponse> {
    const base = '/lsw/LookUp/SwDescription/Search?swDesc=' + searchTerm;
    return this.httpClientService.get<ApiResponse>(base);
  }

  getLoadableSwAllDescriptions(startIndex): Observable<ApiResponse> {
    const base = '/lsw/LookUp/SwDescription/SearchAll?startIndex=' + startIndex;
    return this.httpClientService.get<ApiResponse>(base);
  }

  getSwDescList(searchModel, swDesc): Observable<ApiResponse> {
    return this.httpClientService.post<ApiResponse>(
      '/lsw/LookUp/SwDescription/Search?swDesc=' + swDesc,
      searchModel,
      swDesc
    );
  }
}
