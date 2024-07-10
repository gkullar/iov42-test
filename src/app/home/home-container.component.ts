import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable, forkJoin, map } from 'rxjs';

import { BookingsApiService } from '../bookings/api';
import { CinemasApiService } from '../cinemas/api';
import { MoviesApiService } from '../movies/api';

interface Stat {
  title: string;
  count: number;
}

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, MatGridListModule],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent {
  private readonly cinemasApi = inject(CinemasApiService);

  private readonly moviesApi = inject(MoviesApiService);

  private readonly bookingsApi = inject(BookingsApiService);

  readonly stats$: Observable<Stat[]> = forkJoin([
    this.cinemasApi.getAll({ page: 0, size: 99 }).pipe(
      map((data) => ({
        cinemasCount: data.totalElements,
        screensCount: data.content.reduce((acc, cinema) => acc + cinema.screens.length, 0)
      }))
    ),
    this.moviesApi.getAll({ page: 0, size: 1 }).pipe(map((data) => data.totalElements)),
    this.bookingsApi.getAll({ page: 0, size: 1 }).pipe(map((data) => data.totalElements))
  ]).pipe(
    map(([cinemasData, moviesCount, bookingsCount]) => [
      { title: 'Cinemas', count: cinemasData.cinemasCount },
      { title: 'Screens', count: cinemasData.screensCount },
      { title: 'Movies', count: moviesCount },
      { title: 'Bookings', count: bookingsCount }
    ])
  );
}
