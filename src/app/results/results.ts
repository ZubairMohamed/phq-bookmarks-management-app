import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-results',
  imports: [RouterLink],
  templateUrl: './results.html',
  styleUrl: './results.less',
})
export class Results {
  queryParams = signal<string | null>(null);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.queryParams.set(params.get('url'));
    });

    if (this.queryParams() !== null) {
      this.queryParams.set(decodeURIComponent(<string>this.queryParams()));
    }
  }
}
