import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { AirplaneIdByTailNumberDto } from '@app/lsw/models/airplaneId-by-tailNumber-dto';
import { Observable } from 'rxjs';
import { ApiResponse } from '@shared/models/api-response';

@Injectable()
export class AirplaneIdByTailNumberProxyService extends ServiceCrudBase<AirplaneIdByTailNumberDto> {

  // constructor(http: HttpClientService) {
  //   super(
  //     http,
  //     '/lsw/Airplane/GetAirplaneByTailNumber'
  //   );
  // };

  constructor(private httpClientService: HttpClientService) {
    super(httpClientService, '/lsw/');
  }

  getAirplaneIdByTailNumber(tailNumber: string): Observable<ApiResponse> {
    this.endpoint = '/lsw/Airplane/GetAirplaneByTailNumber?';

    this.endpoint = this.endpoint + 'TailNumber=' + tailNumber;

    return this.http.get(this.endpoint);
  }

  getAirplaneInfo(): Observable<ApiResponse> {

    const endpoint = '/lsw/Airplane/GetAirplaneInfo';

    return this.http.get(endpoint);
  }





}
