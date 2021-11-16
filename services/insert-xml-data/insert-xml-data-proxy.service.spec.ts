/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InsertXmlDataProxyService } from './insert-xml-data-proxy.service';

describe('Service: InsertXmlDataProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsertXmlDataProxyService]
    });
  });

  it('should ...', inject([InsertXmlDataProxyService], (service: InsertXmlDataProxyService) => {
    expect(service).toBeTruthy();
  }));
});
