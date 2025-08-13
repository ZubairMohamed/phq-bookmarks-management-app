import { Component } from '@angular/core';
import { Bookmark } from '../components/bookmark/bookmark';

@Component({
  selector: 'app-overview-page',
  imports: [ Bookmark],
  templateUrl: './overview-page.html',
  styleUrl: './overview-page.less',
})
export class OverviewPage {}
