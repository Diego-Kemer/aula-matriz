import { TestBed } from '@angular/core/testing';

import { LessonsStorage } from './lessons.storage';

describe('LessonsStorage', () => {
  let service: LessonsStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonsStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
