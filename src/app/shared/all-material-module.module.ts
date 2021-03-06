import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [MatToolbarModule, MatListModule, MatCardModule, MatTabsModule, MatInputModule, MatCheckboxModule, MatButtonToggleModule,
    MatIconModule, MatSnackBarModule, MatSidenavModule, MatTableModule, MatDialogModule, ScrollingModule,
    MatSliderModule, MatSortModule, MatButtonModule, MatMenuModule, MatTooltipModule, MatPaginatorModule ],
  exports: [MatToolbarModule, MatListModule, MatCardModule, MatTabsModule, MatInputModule, MatCheckboxModule, MatButtonToggleModule,
    MatIconModule, MatSnackBarModule, MatSidenavModule, MatTableModule, MatDialogModule, ScrollingModule,
    MatSliderModule, MatSortModule, MatButtonModule, MatMenuModule, MatTooltipModule, MatPaginatorModule],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 8000 } }
  ]
})
export class AllMaterialModuleModule { }
