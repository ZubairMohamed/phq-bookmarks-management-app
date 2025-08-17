import { Component, computed, signal, WritableSignal } from '@angular/core';
import { Bookmark } from '../components/bookmark/bookmark';

@Component({
  selector: 'app-overview-page',
  imports: [Bookmark],
  templateUrl: './overview-page.html',
  styleUrl: './overview-page.less',
})
export class OverviewPage {
  // page number
  page: WritableSignal<number> = signal<number>(0);

  links: WritableSignal<string[]> = signal<string[]>([]);

  linksPerPage: WritableSignal<number> = signal(20); //this variable controls how many bookmarks to display per page

  protected readonly localStorage: Storage = localStorage;

  splitArray(originalArray: string[], size: number): string[][] {
    let result = [];
    for (let i = 0; i < originalArray.length; i = i + size) {
      result.push(originalArray.slice(i, i + size));
    }

    return result;
  }

  // create an array of chunks of 20 items per array of arrays
  chunkedArray = computed(() =>
    this.splitArray(this.links(), this.linksPerPage()),
  );

  handlePageChange(number: number): void {
    this.page.set(number);
  }

  handlePageDecrease(): void {
    const currentPage = this.page();
    if (currentPage - 1 < 0) {
      return;
    } else {
      this.page.set(currentPage - 1);
    }
  }

  handlePageIncrease(): void {
    const currentPage = this.page();
    if (currentPage + 1 >= this.chunkedArray().length) {
      // do nothing
    } else {
      this.page.set(currentPage + 1);
    }
  }

  updateLinks(newLinks: string[]): void {
    this.links.set(newLinks);
    // Reset to first page when links are updated
    this.page.set(0);

    this.logLinks();
  }

  ngOnInit(): void {
    //called after angular has initialized all data-bound properties of a directive
    let storedString: string | null = localStorage.getItem('bookmarks');
    let bookmarksArray: string[] = [];

    if (typeof storedString === 'string' && storedString.length > 0) {
      bookmarksArray = JSON.parse(storedString);
      this.links.set(bookmarksArray);
    }
  }

  private logLinks(): void {
    //   we are also saving to local storage the end result
    const arrayAsString = JSON.stringify(this.links());

    // Save the JSON string to local storage with a key 'myArrayKey'
    localStorage.setItem('bookmarks', arrayAsString);
  }

  calculateGlobalIndex(localIndex: number): number {
    return this.page() * this.linksPerPage() + localIndex;
  }

  fillLinksWithTestData(): void {
    this.updateLinks([
      'https://google.com',
      'https://youtube.com',
      'https://facebook.com',
      'https://amazon.com',
      'https://yahoo.com',
      'https://wikipedia.org',
      'https://twitter.com',
      'https://bing.com',
      'https://microsoft.com',
      'https://instagram.com',
      'https://linkedin.com',
      'https://pinterest.com',
      'https://ebay.com',
      'https://netflix.com',
      'https://reddit.com',
      'https://cnn.com',
      'https://apple.com',
      'https://nytimes.com',
      'https://imgur.com',
      'https://espn.com',
      'https://weather.com',
      'https://paypal.com',
      'https://github.com',
      'https://wordpress.com',
      'https://huffpost.com',
      'https://salesforce.com',
      'https://adobe.com',
      'https://imdb.com',
      'https://msn.com',
      'https://walmart.com',
      'https://craigslist.org',
      'https://bankofamerica.com',
      'https://fedex.com',
      'https://chase.com',
      'https://usps.com',
      'https://target.com',
      'https://wellsfargo.com',
      'https://zillow.com',
      'https://etsy.com',
      'https://quora.com',
      'https://webmd.com',
      'https://cnet.com',
      'https://fandom.com',
      'https://indeed.com',
      'https://spotify.com',
      'https://foxnews.com',
      'https://forbes.com',
      'https://theguardian.com',
      'https://stackoverflow.com',
      'https://twitch.tv',
    ]);
  }

  // function used by flight simulator to clear the database
  clearDatabase(): void {
    this.updateLinks([]);
  }
}
