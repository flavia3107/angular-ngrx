import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of, switchMap, tap, withLatestFrom } from "rxjs";
import { decrement, increment, init, set } from "./counter.action";
import { selectCount } from "./counter.selectors";

@Injectable()
export class CounterEffects {
	private _actions$: Actions = inject(Actions);
	private _store: Store<{ counter: number }> = inject(Store);

	saveCount = createEffect(
		() =>
			this._actions$.pipe(
				ofType(increment, decrement),
				withLatestFrom(this._store.select(selectCount)),
				tap(([action, counter]) => {
					console.log(action);
					localStorage.setItem('count', counter.toString());
				})
			),
		{ dispatch: false }
	);

	loadCount = createEffect(() =>
		this._actions$.pipe(
			ofType(init),
			switchMap(() => {
				const storedCounter = localStorage.getItem('count');
				if (storedCounter) {
					return of(set({ value: +storedCounter }));
				}
				return of(set({ value: 0 }));
			})
		)
	);
}