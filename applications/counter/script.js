import { fromEvent, interval, merge, NEVER } from 'rxjs';
import {
  switchMap,
  mapTo,
  scan,
  startWith,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import {
  setCount,
  startButton,
  pauseButton,
  setButton,
  resetButton,
  countUpButton,
  countDownButton,
  setAmountInput,
} from './utilities';

const start$ = fromEvent(startButton, 'click').pipe(mapTo(true));
const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));

const countUp$ = fromEvent(countUpButton, 'click').pipe(mapTo(1));
const countDown$ = fromEvent(countDownButton, 'click').pipe(mapTo(-1));

const set$ = fromEvent(setButton, 'click').pipe(
  withLatestFrom(
    fromEvent(setAmountInput, 'input').pipe(
      map((event) => event.targett.value),
    ),
  ),
  map(([_, value]) => parseInt(value, 10)),
  startWith(1),
);

const reset$ = fromEvent(resetButton, 'click').pipe(mapTo(0));

const counter$ = merge(start$, pause$, countUp$, countDown$, set$, reset$).pipe(
  switchMap((action) => {
    if (action === true) {
      return interval(1000).pipe(startWith(0));
    } else if (action === false) {
      return NEVER;
    } else {
      return NEVER.pipe(startWith(action));
    }
  }),
  scan((acc, curr) => (typeof curr === 'number' ? curr : acc + curr), 0),
);

counter$.subscribe(setCount);
