/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AtaChapterSearchProxyService } from './ataChapter-search-proxy.service';

describe('Service: AtaChapterSearchProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtaChapterSearchProxyService]
    });
  });

  it('should ...', inject([AtaChapterSearchProxyService], (service: AtaChapterSearchProxyService) => {
    expect(service).toBeTruthy();
  }));
});
