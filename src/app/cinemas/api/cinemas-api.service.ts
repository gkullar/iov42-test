import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PageQueryArgs } from '../../pagination';
import { createHttpParams } from '../../utils/http';
import { Cinema, CinemaParams, PaginatedCinemas } from '../models';

@Injectable({ providedIn: 'root' })
export class CinemasApiService {
  private http = inject(HttpClient);

  private readonly url = `${environment.api}/cinemas`;

  getAll(paging?: PageQueryArgs): Observable<PaginatedCinemas> {
    const params = createHttpParams(paging);

    return this.http.get<PaginatedCinemas>(`${this.url}/`, { params });
  }

  create(params: CinemaParams): Observable<Cinema> {
    return this.http.put<Cinema>(`${this.url}/`, params);
  }
}
