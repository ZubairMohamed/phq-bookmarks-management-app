import { Component } from '@angular/core';
import { Links } from '../components/links/links';
import { AddBookmark } from '../components/add-bookmark/add-bookmark';

@Component({
  selector: 'app-overview-page',
  imports: [Links, AddBookmark],
  templateUrl: './overview-page.html',
  styleUrl: './overview-page.less',
})
export class OverviewPage {}
