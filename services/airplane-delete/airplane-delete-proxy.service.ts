
import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { AirplaneDeleteDto } from '@app/lsw/models/airplane-delete-dto';
import { Observable } from 'rxjs';
import { ApiResponse } from '@shared/models/api-response';

@Injectable()
export class AirplaneDeleteService extends ServiceCrudBase<AirplaneDeleteDto> {

    constructor(private httpClientService: HttpClientService) {
        super(httpClientService, '/lsw/');
    }

    deleteAirplane(TailNumber): Observable<ApiResponse> {
        return this.httpClientService.post<ApiResponse>('/lsw/DeleteAirplane?TailNumber='
            + TailNumber, TailNumber);
    }
}