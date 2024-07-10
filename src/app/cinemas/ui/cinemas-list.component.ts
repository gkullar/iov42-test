import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { PaginatedCinemas } from '../models';

@Component({
  selector: 'app-cinemas-list',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTableModule,
    MatTooltipModule
  ],
  templateUrl: './cinemas-list.component.html',
  styleUrl: './cinemas-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CinemasListComponent {
  @Input() data: PaginatedCinemas;

  @Input() loading: boolean;

  readonly pageChanged = output<PageEvent>();

  readonly displayedColumns = ['id', 'name', 'screens', 'actions'];
}
