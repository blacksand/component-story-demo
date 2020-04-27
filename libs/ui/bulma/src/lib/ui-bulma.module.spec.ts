import { async, TestBed } from '@angular/core/testing';
import { UiBulmaModule } from './ui-bulma.module';

describe('UiBulmaModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiBulmaModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiBulmaModule).toBeDefined();
  });
});
