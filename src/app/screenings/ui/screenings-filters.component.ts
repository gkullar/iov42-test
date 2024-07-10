import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { Cinema } from '../../cinemas/models';
import { distinctUntilChanged, debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-screenings-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './screenings-filters.component.html',
  styleUrl: './screenings-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreeningsFiltersComponent {
  @Input() cinemas: Cinema[];

  readonly submitFilters = output<number>();

  private fb = inject(FormBuilder);

  readonly form = this.fb.group({
    cinemaId: this.fb.nonNullable.control<number>(0)
  });

  readonly filtersTrigger$ = this.form.valueChanges.pipe(
    distinctUntilChanged(),
    debounceTime(100),
    tap(() => this.form.valid && this.submitFilters.emit(this.form.getRawValue().cinemaId))
  );
}
