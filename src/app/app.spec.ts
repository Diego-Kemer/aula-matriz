import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes'

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the app shell', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should render dashboard page on default route', async ()=>{
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router)

    await router.navigateByUrl('/')
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Dashboard')
  })

  it('should navigate to lesson form page when clicking /nueva-clase link', async ()=>{
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router)

    await router.navigateByUrl('/')
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.menu a');

    const newClassLink = links[1] as HTMLAnchorElement;
    newClassLink.click();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Nueva clase');
  })
});
