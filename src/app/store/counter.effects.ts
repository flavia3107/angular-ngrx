import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { decrement, increment } from "./counter.action";

export class CounterEffects {
	saveCount = createEffect(() => this._actions$.pipe(
		ofType(increment, decrement),
		tap((action) => {
			console.log('Ac', action);
			//or local storage
		})
	), { dispatch: false });
	private _actions$: Actions = inject(Actions);

}