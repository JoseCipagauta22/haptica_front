import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HapticaComponent } from './haptica.component';

describe('HapticaComponent', () => {
  let component: HapticaComponent;
  let fixture: ComponentFixture<HapticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HapticaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HapticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
