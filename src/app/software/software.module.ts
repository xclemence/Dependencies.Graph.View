import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AllMaterialModuleModule, SharedModule } from '@app/shared';

import { AssembliesVisibilityComponent } from './assemblies-visibility/assemblies-visibility.component';
import { SoftwareListComponent } from './software-list/software-list.component';
import { SoftwareMainComponent } from './software-main/software-main.component';
import { SoftwareReferencesComponent } from './software-references/software-references.component';
import { SoftwareRoutingModule } from './software-routing.module';
import { SoftwareSecurityModule } from './software-security.module';
import { SoftwareStatisticsComponent } from './software-statistics/software-statistics.component';
import { SoftwareStoreModule } from './software-store.module';

@NgModule({
  declarations: [
    SoftwareMainComponent,
    SoftwareListComponent,
    SoftwareReferencesComponent,
    SoftwareStatisticsComponent,
    AssembliesVisibilityComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SoftwareRoutingModule,
    AllMaterialModuleModule,
    FormsModule,
    SoftwareSecurityModule,
    SoftwareStoreModule
  ],
  exports: [
    SoftwareMainComponent
  ]
})
export class SoftwareModule { }
