import { AssemblyBase } from '@app/core/models/assembly';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { UrlService } from '@app/core/services/tech';
import { Store } from '@ngrx/store';
import { SoftwareState } from './store/software.reducer';
import { loadSoftwareAssemblies, loadSoftwareNames } from './store/actions';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss']
})
export class SoftwareComponent implements OnInit {

  selectedSoftwareId: string;

  constructor(private urlService: UrlService,
              private route: ActivatedRoute,
              private store: Store<SoftwareState>) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.selectedSoftwareId = params.get('id');
      }
    });

    this.store.dispatch(loadSoftwareNames());
  }

  selectedSoftwareChanged(software: AssemblyBase) {
    if (software !== undefined) {
      this.urlService.replaceSegment(1, software.id.toString(), this.route);
      this.store.dispatch(loadSoftwareAssemblies({ assemblyName: software }));
    }
  }
}
