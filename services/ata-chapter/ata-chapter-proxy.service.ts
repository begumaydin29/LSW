import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { AtaChapterDto } from '@app/lsw/models/ata-chapter-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class AtaChapterProxyService extends ServiceCrudBase<AtaChapterDto> {

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/Ata/GetATAChapterByEquipmentId'
    );
  };

}
