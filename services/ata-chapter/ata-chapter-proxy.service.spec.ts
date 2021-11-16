/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AtaChapterProxyService } from './ata-chapter-proxy.service';

describe('Service: AtaChapterProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtaChapterProxyService]
    });
  });

  it('should ...', inject([AtaChapterProxyService], (service: AtaChapterProxyService) => {
    expect(service).toBeTruthy();
  }));
});
