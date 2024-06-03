import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgCircleComponent } from './svg-circle.component';

describe('SvgCircleComponent', () => {
  let component: SvgCircleComponent;
  let fixture: ComponentFixture<SvgCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgCircleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SvgCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
