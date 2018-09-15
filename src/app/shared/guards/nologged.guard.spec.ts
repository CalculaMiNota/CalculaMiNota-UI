import { TestBed, async, inject } from '@angular/core/testing';

import { NologgedGuard } from './nologged.guard';

describe('NologgedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NologgedGuard]
    });
  });

  it('should ...', inject([NologgedGuard], (guard: NologgedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
