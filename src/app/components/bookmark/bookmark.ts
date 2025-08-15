import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookmark',
  imports: [FormsModule],
  templateUrl: './bookmark.html',
  styleUrl: './bookmark.less',
})
export class Bookmark {
  // bookmark props
  // this is to control whether to show the add bookmark button
  @Input() showAdd: boolean = true;
  // these are additional buttons for update and delete functionality
  @Input() showEdit: boolean = false;
  @Input() showDelete: boolean = false;
  @Input() value!: string;
  @Input() originalArray!: string[];
  @Input() index!: number;

  handleSave(indexOfArrayElementToUpdate: number) {
    this.bookMarkIsEditable = false;
  }
  handleEdit() {
    this.bookMarkIsEditable = true;
  }
  handleDelete(indexOfArrayElementToDelete: number) {
    console.log('handle delete clicked');
    // throw new Error('Method handleDelete implemented.');
  }
  // properties unique to add bookmark component
  bookmark: string = '';
  isButtonDisabled: boolean = false;
  isEditableLinkValid: boolean = true;
  bookMarkIsEditable: boolean = false;
  savedBookmarkText: string = '';

  ngOnInit(): void {
    this.savedBookmarkText = this.value ? this.value : 'http://example.com';
  }

  // tests to see if the text inside the input text field is valid
  isValidHttpUrl(str: string) {
    // is the text inside the input empty
    if (str.length <= 0 || str == '') {
      return false;
    }

    var a = document.createElement('a');
    a.href = str;
    let result = a.host && a.host != window.location.host;

    // if the result is not equal to a boolean value return false i.e undefined or null
    if (result !== true && result !== false) {
      return false;
    } else {
      return result;
    }
  }

  // on input of the input text field we are checking to see if the URL is valid and setting the bool value
  validateAddBookmarkLink() {
    this.isButtonDisabled =
      this.isValidHttpUrl(this.bookmark) === false ? false : true;
  }

  // on input of the input text field we are checking to see if the URL is valid and setting the bool value
  validateEditBookmarkLink() {
    this.isEditableLinkValid =
      this.isValidHttpUrl(this.savedBookmarkText) === false ? false : true;
  }

  // this event happens when the add bookmark button is clicked on
  handleAddBookmark() {
    this.validateAddBookmarkLink();
    // we are adding a new bookmark to the original array of bookmarks
    this.originalArray.push(this.bookmark);
    //   we are also saving to local storage the end result
    //TODO
  }
}
