import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookmark } from './add-bookmark';

describe('AddBookmark', () => {
  let component: AddBookmark;
  let fixture: ComponentFixture<AddBookmark>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookmark],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookmark);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
