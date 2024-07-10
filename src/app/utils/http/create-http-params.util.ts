import { HttpParams } from '@angular/common/http';

type Params = { [key: string]: number | undefined };

export const createHttpParams = (params: Params = {}): HttpParams => {
  let httpParams = new HttpParams();

  Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined)
    .forEach(([key, value]) => (httpParams = httpParams.append(key, value!.toString())));

  return httpParams;
};
