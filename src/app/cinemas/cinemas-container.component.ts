import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { switchMap, tap } from 'rxjs';

import { PageQueryArgs } from '../pagination';
import { createState } from '../utils/state';
import { CinemasApiService } from './api';
import { CinemaParams, PaginatedCinemas } from './models';
import { CinemasListComponent, CreateCinemaDialogComponent, CreateCinemaDialogData } from './ui';

@Component({
  selector: 'app-cinemas-container',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatDialogModule, CinemasListComponent],
  templateUrl: './cinemas-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CinemasContainerComponent {
  private readonly dialog = inject(MatDialog);

  private readonly cinemasApi = inject(CinemasApiService);

  readonly store = {
    data: createState<PaginatedCinemas>(),
    loading: createState<boolean>(false),
    pagingParams: createState<PageQueryArgs>({ page: 0, size: 5 }),
    createParams: createState<CinemaParams>()
  };

  readonly fetchData$ = this.store.pagingParams.state$.pipe(
    tap(() => this.store.loading.setState(true)),
    switchMap((paging) => this.cinemasApi.getAll(paging)),
    tap((data) => {
      this.store.data.setState(data);
      this.store.loading.setState(false);
    })
  );

  readonly create$ = this.store.createParams.state$.pipe(
    switchMap((params) => this.cinemasApi.create(params)),
    switchMap(() => this.fetchData$)
  );

  readonly onPageChanged = ({ pageIndex, pageSize }: PageEvent) =>
    this.store.pagingParams.setState({ page: pageIndex, size: pageSize });

  readonly openDialog = () => {
    this.dialog.open<CreateCinemaDialogComponent, CreateCinemaDialogData>(
      CreateCinemaDialogComponent,
      {
        data: {
          onSubmit: (params) => this.store.createParams.setState(params)
        }
      }
    );
  };
}
