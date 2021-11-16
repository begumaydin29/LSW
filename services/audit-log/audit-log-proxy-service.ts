import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClientService } from '@shared/http/http-client.service';
import { ApiResponseOfT } from '@shared/models/api-response';
import { Observable } from 'rxjs';
import { HistoryDto } from '@app/lsw/models/history-dto';
import { List } from '.pages/email/list/list';

@Injectable()

export class AuditLogProxyService extends ServiceCrudBase<HistoryDto> {
  constructor(http: HttpClientService) {
    super(
      http,
      '/lsw/'
    );
  };

  filterAuditLogs_BySoftware(data: any, tailNumber?: string[]): Observable<ApiResponseOfT<HistoryDto[]>> {

    this.endpoint = '/lsw/Audit/FilterAutLogsBySoftware?SwPnValue=' + data;
    tailNumber.forEach(tn => {

      this.endpoint = this.endpoint + '&TailNumber=' + tn;

    });

    return this.http.post<ApiResponseOfT<HistoryDto[]>>(this.endpoint, data);
  }

  filterAuditLogs_ByHardware(data: any, tailNumber?: string[]): Observable<ApiResponseOfT<HistoryDto[]>> {

    this.endpoint = '/lsw/Audit/FilterAutLogsByEquipmentKey?EquipmentKey=' + data;
    tailNumber.forEach(tn => {

      this.endpoint = this.endpoint + '&TailNumber=' + tn;

    });

    return this.http.post<ApiResponseOfT<HistoryDto[]>>(this.endpoint, data);
  }
}