import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

import { PaginatedScreenings } from '../models';

@Component({
  selector: 'app-screenings-list',
  standalone: true,
  imports: [DatePipe, MatPaginatorModule, MatProgressBarModule, MatTableModule],
  templateUrl: './screenings-list.component.html',
  styleUrl: './screenings-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreeningsListComponent {
  @Input() data: PaginatedScreenings;

  @Input() loading: boolean;

  readonly pageChanged = output<PageEvent>();

  readonly displayedColumns = ['id', 'cinema', 'screen', 'movie', 'start'];
}
