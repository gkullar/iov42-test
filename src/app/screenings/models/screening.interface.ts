import { Movie } from '../../movies/models';

export interface Screening {
  id: number;
  cinemaName: string;
  screenName: string;
  start: string;
  movie: Movie;
}
