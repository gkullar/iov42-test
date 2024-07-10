import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PageQueryArgs } from '../../pagination';
import { createHttpParams } from '../../utils/http';
import { PaginatedScreens, Screen, ScreenParams } from '../models';

@Injectable({ providedIn: 'root' })
export class ScreensApiService {
  private http = inject(HttpClient);

  private readonly url = `${environment.api}/cinemas`;

  getAll(cinemaId: number, paging?: PageQueryArgs): Observable<PaginatedScreens> {
    const params = createHttpParams(paging);

    return this.http.get<PaginatedScreens>(`${this.url}/${cinemaId}/screens`, { params });
  }

  create(cinemaId: number, params: ScreenParams): Observable<Screen> {
    return this.http.put<Screen>(`${this.url}/${cinemaId}/screens`, params);
  }
}
