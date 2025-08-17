import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  @Input() localIndex!: number; //this is the position of the element in the subdivided array
  @Input() globalIndex!: number; //this is the position of the element in the master copy of the array. This is required so that we can easily make edits and deletes
  @Input() isFirst: boolean = false; //this works out if we are rendering the first saved bookmark on the page

  // this is a prop passed from child to parent so that the parent listens to changes in the links arrays in the child component
  @Output() originalArrayChange: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  constructor(private router: Router) {}

  handleSave(newURL: string, indexOfArrayElementToUpdate: number): void {
    this.bookMarkIsEditable.set(false);
    this.modifyOriginalArrayFromParent(
      'edit',
      indexOfArrayElementToUpdate,
      newURL,
    );
  }
  handleEdit(): void {
    this.bookMarkIsEditable.set(true);
  }
  handleDelete(indexOfArrayElementToDelete: number) {
    this.modifyOriginalArrayFromParent('delete', indexOfArrayElementToDelete);
  }
  // properties unique to add bookmark component
  bookmark: WritableSignal<string> = signal<string>('');
  isButtonDisabled: WritableSignal<boolean> = signal<boolean>(true);
  isNewBookmarkValid: WritableSignal<boolean> = signal<boolean>(false);
  isEditableLinkValid: WritableSignal<boolean> = signal<boolean>(true);
  bookMarkIsEditable: WritableSignal<boolean> = signal<boolean>(false);
  savedBookmarkText: WritableSignal<string> = signal<string>('');

  ngOnInit(): void {
    this.savedBookmarkText.set(this.value ? this.value : 'https://example.com');
  }

  // tests to see if the text inside the input text field is valid
  isValidHttpUrl(str: string): boolean {
    // is the text inside the input empty
    if (str.length <= 0 || str == '') {
      return false;
    }

    // we are enforcing that the url begins with http:// or https://
    if (
      !str.toString().toLowerCase().startsWith('http://') &&
      !str.toString().toLowerCase().startsWith('https://')
    ) {
      return false;
    }

    let a = document.createElement('a');
    a.href = str;
    let result = a.host && a.host != window.location.host;

    // if the result is not equal to a boolean value return false i.e. undefined or null
    if (result !== true && result !== false) {
      return false;
    } else {
      return result;
    }
  }

  // on input of the input text field we are checking to see if the URL is valid and setting the bool value
  validateAddBookmarkLink(): void {
    this.isNewBookmarkValid.set(this.isValidHttpUrl(this.bookmark()));
    this.isButtonDisabled.set(
      this.isValidHttpUrl(this.bookmark()) === false ? true : false,
    );
  }

  // on input of the input text field we are checking to see if the URL is valid and setting the bool value
  validateEditBookmarkLink(): void {
    this.isEditableLinkValid.set(
      this.isValidHttpUrl(this.savedBookmarkText()) === false ? false : true,
    );
  }

  // this is an event triggered on clicking the add bookmark button.
  // it uses an event emitter that the parent detects and acts accordingly to update the master copy of the links
  modifyOriginalArrayFromParent(
    actionToPerform: string = 'add',
    indexOfArrayElementToModify: number = 0,
    newBookmarkLink: string = '',
  ): void {
    switch (actionToPerform) {
      case 'add':
        this.originalArrayChange.emit([...this.originalArray, this.bookmark()]);
        break;
      case 'edit':
        // create a temp copy of the original array
        let tempArrayForUpdate: string[] = [...this.originalArray];
        tempArrayForUpdate[indexOfArrayElementToModify] = newBookmarkLink;
        this.originalArrayChange.emit([...tempArrayForUpdate]);
        break;
      case 'delete':
        // create a temp copy of the original array
        let tempArrayForDeletion: string[] = [...this.originalArray];
        // now modify the temp copy to remove the element we no longer need
        tempArrayForDeletion.splice(indexOfArrayElementToModify, 1);
        // now we are notifying the parent element to modify the original copy of the array and propagate changes back to the child components
        this.originalArrayChange.emit([...tempArrayForDeletion]);
        break;
    }
  }

  // this event happens when the add bookmark button is clicked on
  handleAddBookmark(): void {
    this.validateAddBookmarkLink();
    // we are adding a new bookmark to the original array of bookmarks
    // this.originalArray.push(this.bookmark);
    this.modifyOriginalArrayFromParent();

    // we are encoding the current bookmark as url Text string
    let encodedBookmarkText = encodeURIComponent(this.bookmark());

    // Clear the input field after adding
    this.bookmark.set('');
    this.isButtonDisabled.set(true);

    this.router
      .navigate(['/results'], {
        queryParams: { url: encodedBookmarkText },
      })
      .then(() => {
        //do nothing further
      });
  }
}
