import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatListOptionHarness } from '@angular/material/list/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { softwareNameStateSelector } from '../../store/software.selectors';
import { SoftwareListComponent } from './software-list.component';

describe('SoftwareListComponent', () => {
  let component: SoftwareListComponent;
  let fixture: ComponentFixture<SoftwareListComponent>;
  let mockStore: MockStore;
  let loader: HarnessLoader;

  const initialState = {
    software: {
      assemblies: {
        software: {},
        filteredAssemblies: []
      },
      name: {
        softwareNames: []
      }
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        MatListModule,
        FormsModule,
      ],
      declarations: [SoftwareListComponent],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SoftwareListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit refreshSoftwaresRequest event', () => {
    const emitSpy = spyOn(component.refreshSoftwaresRequest, 'emit');
    component.refreshSoftwares();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit selectionChange event', () => {
    const emitSpy = spyOn(component.selectionChange, 'emit');
    component.selectionChanged();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should load data from store', fakeAsync(() => {

    const softwareNameStateSelectorMock = mockStore.overrideSelector(softwareNameStateSelector, initialState.software.name);

    const inputStore = {
      softwareNames: [
        { id: '1', name: 'name1', version: '1.0', isNative: false, isSoftware: false },
        { id: '2', name: 'name2', version: '1.0', isNative: false, isSoftware: false },
      ]
    };

    softwareNameStateSelectorMock.setResult(inputStore);
    mockStore.refreshState();

    expect(component.softwareNames).toEqual(inputStore.softwareNames);
  }));

  it('should update template', async () => {
    component.softwareNames = [
      { id: '1', name: 'name1', version: '1.0', isNative: false, isSoftware: false },
      { id: '2', name: 'name2', version: '1.0', isNative: false, isSoftware: false }
    ];

    fixture.detectChanges();

    const listItems = await loader.getAllHarnesses(MatListOptionHarness);

    expect(listItems.length).toBe(2);
  });

  it('should update selection from component', async () => {

    component.softwareNames = [
      { id: '1', name: 'name1', version: '1.0', isNative: false, isSoftware: false },
      { id: '2', name: 'name2', version: '1.0', isNative: false, isSoftware: false }
    ];
    fixture.detectChanges();

    component.selectedSoftwares = [component.softwareNames[0]];

    fixture.detectChanges();

    const firstItem = await loader.getHarness(MatListOptionHarness);
    expect(await firstItem.isSelected()).toBeTrue();
  });

  it('should set selected software', () => {
    component.softwareNames = [
      { id: '1', name: 'name1', version: '1.0', isNative: false, isSoftware: false },
      { id: '2', name: 'name2', version: '1.0', isNative: false, isSoftware: false }
    ];

    component.selectedId = '1';

    expect(component.selectedSoftwares.includes(component.softwareNames[0])).toBeTrue();
  });

  it('should update selection from template', async () => {

    const emitSpy = spyOn(component.selectionChange, 'emit');

    component.softwareNames = [
      { id: '1', name: 'name1', version: '1.0', isNative: false, isSoftware: false },
      { id: '2', name: 'name2', version: '1.0', isNative: false, isSoftware: false }
    ];
    fixture.detectChanges();

    const firstItem = await loader.getHarness(MatListOptionHarness);

    await firstItem.select();

    expect(component.selectedSoftwares).toEqual([component.softwareNames[0]]);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should update software names from template', async () => {

    const emitSpy = spyOn(component.refreshSoftwaresRequest, 'emit');

    const refreshButton = await loader.getHarness(MatButtonHarness);

    await refreshButton.click();

    expect(emitSpy).toHaveBeenCalled();
  });

});
