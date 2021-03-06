import { Injectable } from '@angular/core';
import { AssemblyService } from '@app/assembly/services/assembly.service';
import { empty } from '@app/core/store/actions/empty.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { loadAssemblies, loadAssembliesSuccess } from './../actions';

@Injectable()
export class AssembliesEffects {

  constructor(
    private readonly actions: Actions,
    private readonly assemblyService: AssemblyService
  ) { }

  loadAssemblies = createEffect(() => {
    return this.actions.pipe(
      ofType(loadAssemblies),
      switchMap(action => this.assemblyService.assemblyStatistics(action.take, action.page, action.filter, action.order).pipe(
        map(data => loadAssembliesSuccess({ data: data.assemblies, assembliesCount: data.count, origin: action })),
        catchError(() => of(empty({origin: action }))),
      )),
    );
  });
}
