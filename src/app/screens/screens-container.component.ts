import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';

import { PageQueryArgs } from '../pagination';
import { createState } from '../utils/state';
import { ScreensApiService } from './api';
import { PaginatedScreens, ScreenParams } from './models';
import { CreateScreenDialogComponent, CreateScreenDialogData, ScreensListComponent } from './ui';

@Component({
  selector: 'app-screens-container',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatDialogModule,
    ScreensListComponent,
    CreateScreenDialogComponent
  ],
  templateUrl: './screens-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreensContainerComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly dialog = inject(MatDialog);

  private readonly screensApi = inject(ScreensApiService);

  readonly store = {
    data: createState<PaginatedScreens>(),
    loading: createState<boolean>(false),
    createParams: createState<ScreenParams>(),
    pagingParams: createState<PageQueryArgs>({ page: 0, size: 5 })
  };

  readonly cinemaId$ = this.route.params.pipe(map((params) => params['id']));

  readonly fetchData$ = this.store.pagingParams.state$.pipe(
    withLatestFrom(this.cinemaId$),
    tap(() => this.store.loading.setState(true)),
    switchMap(([paging, id]) => this.screensApi.getAll(id, paging)),
    tap((data) => {
      this.store.data.setState(data);
      this.store.loading.setState(false);
    })
  );

  readonly create$ = this.store.createParams.state$.pipe(
    withLatestFrom(this.cinemaId$),
    switchMap(([params, id]) => this.screensApi.create(id, params)),
    switchMap(() => this.fetchData$)
  );

  readonly onPageChanged = ({ pageIndex, pageSize }: PageEvent) =>
    this.store.pagingParams.setState({ page: pageIndex, size: pageSize });

  readonly openDialog = () => {
    this.dialog.open<CreateScreenDialogComponent, CreateScreenDialogData>(
      CreateScreenDialogComponent,
      {
        data: {
          onSubmit: (params) => this.store.createParams.setState(params)
        }
      }
    );
  };
}
