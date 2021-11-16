import { Injectable } from '@angular/core';
import { EoInsertDto } from '@app/lsw/models/eo-insert-dto';
import { HttpClientService } from '@shared/http/http-client.service';
import { ApiResponse } from '@shared/models/api-response';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RunUpdateJobService extends ServiceCrudBase<EoInsertDto> {

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  runUpdateJob(): Observable<ApiResponse> {
    return this.httpClientService.get<ApiResponse>('/lsw/EoSoftwareRelation/InsertSoftwareJob');
  }

}
