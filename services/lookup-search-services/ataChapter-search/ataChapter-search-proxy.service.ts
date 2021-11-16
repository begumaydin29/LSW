import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { AcRegSearchDto } from '@app/lsw/models/lookup-search-models/acReg-search-dto';
import { HttpClientService } from '@shared/http/http-client.service';
import { ApiResponse } from '@shared/models/api-response';
import { Observable } from 'rxjs';

@Injectable()
export class AtaChapterSearchProxyService extends ServiceCrudBase<AcRegSearchDto> {
  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getAtaChapterList(searchModel, ataCh): Observable<ApiResponse> {
    return this.httpClientService.post<ApiResponse>(
      '/lsw/LookUp/AtaChapter/Search?ataCh=' + ataCh,
      searchModel,
      ataCh
    );
  }

  getAllAtaChapterListBySearchTerm(ataCh): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/AtaChapter/Search?ataCh=' + ataCh
    );
  }

  getAllAtaChapterList(startIndex): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>(
      '/lsw/LookUp/AtaChapter/SearchAll?startIndex=' + startIndex
    );
  }
}
