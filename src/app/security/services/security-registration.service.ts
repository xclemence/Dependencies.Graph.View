import { Inject, Injectable, InjectionToken } from '@angular/core';
import { addFeatureConfigurationAction, setNoRightPathAction } from '@app/core/store/actions';
import { Store } from '@ngrx/store';

import { SecurityConfig } from '../models/security-config';

export const featureSecurityToken = new InjectionToken<SecurityConfig>('Configuration for components');
export const redirectSecurityToken = new InjectionToken<string>('redirect url if no right');

@Injectable({
  providedIn: 'root'
})
export class SecurityRegistrationService {

  constructor(
    @Inject(featureSecurityToken) private config: SecurityConfig[],
    @Inject(redirectSecurityToken) private redirectPath: string,
    private store: Store,
    ) {
  }

  register() {

    this.store.dispatch(setNoRightPathAction({ path: this.redirectPath }));

    for (const item of this.config.map(x => x.features).reduce((x, y) => x.concat(y))) {
      this.store.dispatch(addFeatureConfigurationAction({ feature: item.feature, rights: item.rights }));
    }
  }
}
