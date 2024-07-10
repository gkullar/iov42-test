import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

import { PaginatedScreens } from '../models';

@Component({
  selector: 'app-screens-list',
  standalone: true,
  imports: [MatPaginatorModule, MatProgressBarModule, MatTableModule],
  templateUrl: './screens-list.component.html',
  styleUrl: './screens-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreensListComponent {
  @Input() data: PaginatedScreens;

  @Input() loading: boolean;

  readonly pageChanged = output<PageEvent>();

  readonly displayedColumns = ['id', 'name'];
}
