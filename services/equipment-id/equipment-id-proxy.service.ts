import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { EquipmentIdDto } from '@app/lsw/models/equipment-id-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class EquipmentIdProxyService extends ServiceCrudBase<EquipmentIdDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/Equipment/GetEquipmentIdByPartNumber'
    );
  };

}
