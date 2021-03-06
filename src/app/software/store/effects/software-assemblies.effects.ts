import { Injectable } from '@angular/core';
import { SoftwareService } from '@app/software/services/software.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { iif, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { loadSoftwareAssemblies, loadSoftwareAssembliesSuccess } from '../actions';
import { SoftwareState } from '../models';
import { operationCanceled } from '@app/core/store/actions/cancel.actions';
import { softwareAssembliesStateSelector } from './../software.selectors';
import { empty } from '@app/core/store/actions/empty.actions';

@Injectable()
export class SoftwareAssembliesEffects {

  constructor(
    private readonly store: Store<SoftwareState>,
    private readonly actions: Actions,
    private readonly softwareService: SoftwareService) { }

  loadSoftwareAssemblies = createEffect(() => {
    return this.actions.pipe(
      ofType(loadSoftwareAssemblies),
      withLatestFrom(this.store.select(softwareAssembliesStateSelector)),
      switchMap(([action, state]) => iif(
        () => action.assemblyId === state?.software?.id,
        of(operationCanceled({ origin: action })),
        this.softwareService.software(action.assemblyId).pipe(
          map(data => loadSoftwareAssembliesSuccess({ data, origin: action })),
          catchError(() => of(empty({ origin: action }))),
        )),
      )
    );
  });
}
