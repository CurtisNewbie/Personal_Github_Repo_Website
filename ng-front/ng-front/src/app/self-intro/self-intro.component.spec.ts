import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfIntroComponent } from './self-intro.component';

describe('SelfIntroComponent', () => {
  let component: SelfIntroComponent;
  let fixture: ComponentFixture<SelfIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
