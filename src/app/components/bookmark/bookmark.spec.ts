import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookmark } from './bookmark';

describe('AddBookmark', () => {
  let component: Bookmark;
  let fixture: ComponentFixture<Bookmark>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookmark],
    }).compileComponents();

    fixture = TestBed.createComponent(Bookmark);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
