import { TestBed } from '@angular/core/testing';

import { SoundCloudService } from './sound-cloud.service';

describe('SoundCloudService', () => {
  let service: SoundCloudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundCloudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
