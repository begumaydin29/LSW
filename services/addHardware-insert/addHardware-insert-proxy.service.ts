import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { AddHardwareInsertDto } from '@app/lsw/models/addHardware-insert-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class AddHardwareInsertProxyService extends ServiceCrudBase<AddHardwareInsertDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/Equipment/EquipmentInsertOrUpdate'
    );
  };
}
