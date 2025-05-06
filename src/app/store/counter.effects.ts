import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap, withLatestFrom } from "rxjs";
import { decrement, increment } from "./counter.action";
import { selectCount } from "./counter.selectors";

@Injectable()
export class CounterEffects {
	private _actions$: Actions = inject(Actions);
	private _store: Store<{ counter: number }> = inject(Store);

	saveCount = createEffect(() => this._actions$.pipe(
		ofType(increment, decrement),
		withLatestFrom(this._store.select(selectCount)),
		tap(([action, counter]) => {
			console.log('Action', action, counter);
			//or local storage
		})
	), { dispatch: false });
}