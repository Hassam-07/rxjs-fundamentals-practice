import { fromEvent, interval, merge, NEVER } from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

const counter$ = merge(
  start$.pipe(
    switchMap(() => interval(1000).pipe(startWith(0))),
    takeUntil(pause$),
  ),
  NEVER,
);

counter$.subscribe((count) => {
  setCount(count);
});
