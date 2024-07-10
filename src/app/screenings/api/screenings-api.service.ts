import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PageQueryArgs } from '../../pagination';
import { createHttpParams } from '../../utils/http';
import { PaginatedScreenings } from '../models';

@Injectable({ providedIn: 'root' })
export class ScreeningsApiService {
  private http = inject(HttpClient);

  private readonly url = `${environment.api}/cinemas`;

  getAll(cinemaId: number, paging?: PageQueryArgs): Observable<PaginatedScreenings> {
    const params = createHttpParams(paging);

    return this.http.get<PaginatedScreenings>(`${this.url}/${cinemaId}/screenings`, { params });
  }
}
