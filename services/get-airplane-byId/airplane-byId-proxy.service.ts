import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { AirplaneByIdDto } from '@app/lsw/models/get-airplane-byId-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class AirplaneByIdProxyService extends ServiceCrudBase<AirplaneByIdDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/Airplane/GetById'
    );
  };

}
