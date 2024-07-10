import { BehaviorSubject, Subject } from 'rxjs';

export const createState = <T>(initalState?: T) => {
  const stateSubject =
    initalState !== undefined ? new BehaviorSubject<T>(initalState) : new Subject<T>();

  return {
    state$: stateSubject.asObservable(),
    setState: (state: T) => stateSubject.next(state)
  };
};
