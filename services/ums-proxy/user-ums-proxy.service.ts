import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '@shared/models/api-response';
import { Observable } from 'rxjs';
import { UserUmsDto, UserUmsSerializer } from '@app/lsw/models/ums/user-ums-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class UserUmsProxyService extends ServiceCrudBase<UserUmsDto> {

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/ums/Users/');
  }

  getUserByRegisterId(registerId: string): Observable<ApiResponse> {
    return this.http.get(this.endpoint + registerId);

  }
}      
