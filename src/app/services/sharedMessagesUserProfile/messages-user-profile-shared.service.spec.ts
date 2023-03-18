import { TestBed } from '@angular/core/testing';

import { MessagesUserProfileSharedService } from './messages-user-profile-shared.service';

describe('MessagesUserProfileSharedService', () => {
  let service: MessagesUserProfileSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesUserProfileSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
