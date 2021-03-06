import { AssemblyStat } from '@app/core/models/assembly';
import { SortDirection } from '@app/shared/models';
import { Action, createAction, props } from '@ngrx/store';

export const loadAssemblies = createAction(
  '[Assemblies] Load Assemblies',
  props<{
    take: number,
    page: number,
    filter: string,
    order: {[key:string]: SortDirection}
  }>()
);

export const loadAssembliesSuccess = createAction(
  '[Assemblies] Load Assemblies Success',
  props<{ data: AssemblyStat[], assembliesCount: number, origin: Action }>()
);
