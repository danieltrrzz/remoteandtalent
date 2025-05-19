import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a country to favorites', () => {
    service.add('Mexico');
    expect(service.favorites()).toContain('Mexico');
  });

  it('should not add duplicate countries', () => {
    service.add('Mexico');
    service.add('Mexico');
    expect(service.favorites()).toEqual(['Mexico']);
  });

  it('should remove a country from favorites', () => {
    service.add('Mexico');
    service.remove('Mexico');
    expect(service.favorites()).not.toContain('Mexico');
  });

  it('should toggle a country (add if not present, remove if present)', () => {
    service.toggle('Canada');
    expect(service.favorites()).toContain('Canada');
    service.toggle('Canada');
    expect(service.favorites()).not.toContain('Canada');
  });

  it('should return true if a country is favorite', () => {
    service.add('Brazil');
    expect(service.isFavorite('Brazil')()).toBeTrue();
  });

  it('should return false if a country is not favorite', () => {
    expect(service.isFavorite('Argentina')()).toBeFalse();
  });
});
