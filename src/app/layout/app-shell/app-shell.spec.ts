import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppShell } from './app-shell';
import { provideRouter } from '@angular/router';

describe('AppShell', () => {
  let component: AppShell;
  let fixture: ComponentFixture<AppShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShell],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AppShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the app title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo')?.textContent).toContain('AulaMatriz');
  });

  it('should render 3 navegation links', ()=>{
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.menu a');
    expect(links.length).toBe(3);
  })
});
