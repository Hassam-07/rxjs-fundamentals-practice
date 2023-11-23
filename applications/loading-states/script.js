import { fromEvent, concat, of, race, timer } from 'rxjs';
import { tap, exhaustMap, delay, shareReplay, first } from 'rxjs/operators';

import {
  responseTimeField,
  showLoadingAfterField,
  showLoadingForAtLeastField,
  loadingStatus,
  showLoading,
  form,
  fetchData,
} from './utilities';

console.log('data');

const loading$ = fromEvent(form, 'submit').pipe(
  exhaustMap(() => {
    const data$ = fetchData().pipe(shareReplay(1));

    const showLoading$ = of(true).pipe(
      delay(+showLoadingAfterField.value),
      tap(() => showLoading(true)),
    );

    const hideLoading$ = timer(+showLoadingForAtLeastField.value).pipe(first());

    const loading$ = concat(
      showLoading$,
      hideLoading$,
      data$.pipe(tap(() => showLoading(false))),
    );

    return race(data$, loading$);
  }),
);
