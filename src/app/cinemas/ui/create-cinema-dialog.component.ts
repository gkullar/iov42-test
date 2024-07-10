import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CinemaParams } from '../models';

export interface CreateCinemaDialogData {
  onSubmit: (params: CinemaParams) => void;
}

@Component({
  selector: 'app-create-cinema-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './create-cinema-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCinemaDialogComponent {
  private readonly fb = inject(FormBuilder);

  private readonly dialogRef: MatDialogRef<CreateCinemaDialogComponent> = inject(MatDialogRef);

  private readonly data: CreateCinemaDialogData = inject(MAT_DIALOG_DATA);

  readonly form = this.fb.group({
    name: this.fb.nonNullable.control('', [Validators.required])
  });

  onSubmit() {
    if (this.form.valid) {
      this.data.onSubmit(this.form.getRawValue());
      this.dialogRef.close();
    }
  }
}
