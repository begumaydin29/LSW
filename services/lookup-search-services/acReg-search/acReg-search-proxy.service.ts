import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { AcRegSearchDto } from '@app/lsw/models/lookup-search-models/acReg-search-dto';
import { HttpClientService } from '@shared/http/http-client.service';
import { ApiResponse } from '@shared/models/api-response';
import { Observable } from 'rxjs';

@Injectable()
export class AcRegSearchProxyService extends ServiceCrudBase<AcRegSearchDto> {
  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getAirplaneList(searchModel, tailNumber): Observable<ApiResponse> {
    return this.httpClientService.post<ApiResponse>(
      '/lsw/LookUp/AcReg/Search?TailNumber=' + tailNumber,
      searchModel,
      tailNumber
    );
  }

  getAllAirplaneList(startIndex): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/AcReg/SearchAll?startIndex=' + startIndex
    );
  }

  getAllAirplaneListBySearchTerm(acReg): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/AcReg/Search?TailNumber=' + acReg
    );
  }
}
