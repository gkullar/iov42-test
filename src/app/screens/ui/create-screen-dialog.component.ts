import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ScreenParams } from '../models';

export interface CreateScreenDialogData {
  onSubmit: (params: ScreenParams) => void;
}

@Component({
  selector: 'app-create-screen-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './create-screen-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateScreenDialogComponent {
  private readonly fb = inject(FormBuilder);

  private readonly dialogRef: MatDialogRef<CreateScreenDialogComponent> = inject(MatDialogRef);

  private readonly data: CreateScreenDialogData = inject(MAT_DIALOG_DATA);

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
