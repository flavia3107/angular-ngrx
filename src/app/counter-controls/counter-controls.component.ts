import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment } from '../store/counter.action';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css'],
  standalone: true,
})
export class CounterControlsComponent {
  private _store: Store<{ counter: number }> = inject(Store);

  increment() {
    this._store.dispatch(increment({ value: 1 }));
  }

  decrement() {
    this._store.dispatch(decrement({ value: 1 }));
  }
}
