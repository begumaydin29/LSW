import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { KeySearchDto } from '@app/lsw/models/lookup-search-models/key-search-dto';
import { HttpClientService } from '@shared/http/http-client.service';

@Injectable()
export class KeySearchProxyService extends ServiceCrudBase<KeySearchDto>{

  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/LookUp/Key/Search?pagesize=23&pagenumber=1',
    );
  };
}
