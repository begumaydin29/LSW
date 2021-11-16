import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { EquipmentDto } from '@app/lsw/models/equipment-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class EquipmentProxyService extends ServiceCrudBase<EquipmentDto>{

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/Equipment/GetERDsByAirplaneIds',
    );
  };

}
