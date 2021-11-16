import { Injectable } from '@angular/core';
import { ComparisonDto } from '@app/lsw/models/comparison-dto';
import { HttpClientService } from '@shared/http/http-client.service';
import { ApiResponse } from '@shared/models/api-response';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { Observable } from 'rxjs';

@Injectable()
export class ComparisonService extends ServiceCrudBase<ComparisonDto> {

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  listComparisonWithAirplaneandSystem(fileContent, check: boolean): Observable<ApiResponse> {

    const base = '/lsw/Comparison?check=' + check;
    return this.httpClientService.post(base, fileContent);
  }

}
