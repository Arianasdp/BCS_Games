import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {

  isNight = signal(false);
  gameActive = signal(false);
}
