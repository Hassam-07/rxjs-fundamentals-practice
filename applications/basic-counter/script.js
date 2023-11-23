import { fromEvent, interval, merge, NEVER } from 'rxjs';
import {
  switchMap,
  takeUntil,
  startWith,
  skipUntil,
  scan,
} from 'rxjs/operators';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

console.log('message');
const counter$ = start$.pipe(
  switchMap(() =>
    interval(1000).pipe(
      skipUntil(start$),
      startWith(0),
      scan((acc) => acc + 1, 0),
      takeUntil(pause$),
    ),
  ),
);

counter$.subscribe((count) => {
  setCount(count);
});

start$.subscribe(() => {
  interval(1000).subscribe(count);
});
