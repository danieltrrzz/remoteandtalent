import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryScrollComponent } from './country-scroll.component';
import { FavoritesService } from '../../../core/services/favorites/favorites.service';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('CountryScrollComponent', () => {
  let component: CountryScrollComponent;
  let fixture: ComponentFixture<CountryScrollComponent>;
  let favoritesService: FavoritesService;

  const mockCountry = {
    name: { common: 'Mexico' },
    region: 'Americas',
    flags: { svg: 'flag.svg' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CountryScrollComponent],
      providers: [FavoritesService]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryScrollComponent);
    component = fixture.componentInstance;
    favoritesService = TestBed.inject(FavoritesService);
    component.country = mockCountry;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display country name and region', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Mexico');
    expect(compiled.textContent).toContain('Americas');
  });

  it('should display the flag image', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toContain('flag.svg');
    expect(img.alt).toContain('Mexico');
  });

  it('should toggle favorite when button is clicked', () => {
    spyOn(component, 'toggleFavorite').and.callThrough();
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(component.toggleFavorite).toHaveBeenCalledWith('Mexico');
  });

  it('should show ❤️ if country is favorite', () => {
    favoritesService.add('Mexico');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('❤️');
  });

  it('should show 🤍 if country is not favorite', () => {
    favoritesService.remove('Mexico');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('🤍');
  });

  it('should have a link to country detail', () => {
    const link = fixture.nativeElement.querySelector('a');
    expect(link.getAttribute('ng-reflect-router-link')).toContain('Mexico');
    expect(link.textContent).toContain('Ver detalle');
  });
});
