import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageEvent } from '@angular/material/paginator';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs';

import { CinemasApiService } from '../cinemas/api';
import { Cinema } from '../cinemas/models';
import { PageQueryArgs } from '../pagination';
import { createState } from '../utils/state';
import { ScreeningsApiService } from './api';
import { PaginatedScreenings } from './models';
import { ScreeningsFiltersComponent, ScreeningsListComponent } from './ui';

@Component({
  selector: 'app-screenings-container',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, ScreeningsListComponent, ScreeningsFiltersComponent],
  templateUrl: './screenings-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreeningsContainerComponent {
  private readonly cinemasApi = inject(CinemasApiService);

  private readonly screeningsApi = inject(ScreeningsApiService);

  readonly store = {
    cinemas: createState<Cinema[]>(),
    selectedCinemaId: createState<number>(),
    screenings: createState<PaginatedScreenings>(),
    loading: createState<boolean>(false),
    pagingParams: createState<PageQueryArgs>({ page: 0, size: 5 })
  };

  readonly fetchCinemas$ = this.cinemasApi.getAll({ page: 0, size: 99 }).pipe(
    map((data) => data.content),
    tap((data) => this.store.cinemas.setState(data))
  );

  readonly filterValueChanges$ = this.store.selectedCinemaId.state$.pipe(
    switchMap((cinemaId) => this.fetchData(cinemaId))
  );

  readonly pagingValueChanges$ = this.store.pagingParams.state$.pipe(
    withLatestFrom(this.store.selectedCinemaId.state$),
    filter(([_, id]) => !!id),
    tap(() => this.store.loading.setState(true)),
    switchMap(([paging, id]) => this.fetchData(id, paging)),
    tap(() => this.store.loading.setState(false))
  );

  readonly onPageChanged = ({ pageIndex, pageSize }: PageEvent) =>
    this.store.pagingParams.setState({ page: pageIndex, size: pageSize });

  readonly onSubmitFilters = (cinemaId: number) => this.store.selectedCinemaId.setState(cinemaId);

  private readonly fetchData = (
    cinemaId: number,
    pagingParams: PageQueryArgs = { page: 0, size: 5 }
  ) =>
    this.screeningsApi
      .getAll(cinemaId, pagingParams)
      .pipe(tap((data) => this.store.screenings.setState(data)));
}
