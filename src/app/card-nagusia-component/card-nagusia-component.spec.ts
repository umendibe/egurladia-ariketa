import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardNagusiaComponent } from './card-nagusia-component';

describe('CardNagusiaComponent', () => {
  let component: CardNagusiaComponent;
  let fixture: ComponentFixture<CardNagusiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNagusiaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardNagusiaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
