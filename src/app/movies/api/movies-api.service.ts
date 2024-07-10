import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PageQueryArgs } from '../../pagination';
import { createHttpParams } from '../../utils/http';
import { PaginatedMovies } from '../models';

@Injectable({ providedIn: 'root' })
export class MoviesApiService {
  private http = inject(HttpClient);

  private readonly url = `${environment.api}/movies`;

  getAll(paging?: PageQueryArgs): Observable<PaginatedMovies> {
    const params = createHttpParams(paging);

    return this.http.get<PaginatedMovies>(`${this.url}/`, { params });
  }
}
