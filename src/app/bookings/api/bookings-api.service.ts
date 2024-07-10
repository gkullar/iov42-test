import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PageQueryArgs } from '../../pagination';
import { createHttpParams } from '../../utils/http';
import { PaginatedBookings } from '../models';

@Injectable({ providedIn: 'root' })
export class BookingsApiService {
  private http = inject(HttpClient);

  private readonly url = `${environment.api}/bookings`;

  getAll(paging: PageQueryArgs): Observable<PaginatedBookings> {
    const params = createHttpParams(paging);

    return this.http.get<PaginatedBookings>(`${this.url}/`, { params });
  }
}
