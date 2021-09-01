import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ObserverService } from 'services/observer.service';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss'],
})
export class FilterSelectComponent implements OnInit, OnDestroy {

  @Input() public dropdownOptions: Array<string>;
  @Input() public filterParam: any;
  @Input() public placeholderText: string;
  @Input() public dynamicValuesQuery: string;

  @Output() private outputEmitter: EventEmitter<any> = new EventEmitter();

  public searchPlaceHolder: string = "";
  private anySubscription: Subscription;

  /** control for the selected option */
  public optionsCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public optionsFilterCtrl: FormControl = new FormControl();

  /** list of options filtered by search keyword */
  public filteredOptions: ReplaySubject<Array<string>> = new ReplaySubject<Array<string>>(1);

  @ViewChild("singleSelect", { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    private observerService: ObserverService,
    private languageService: TranslateService
  ) { }

  /**
   * Recibe los valores de las opciones y la opción inicial, inicializa los valores necesarios y abilita un observer
   * si ese desplegable al cambiar de valor puede desencadenar que otros desplegables cambien de valor automáticamente
   */
  ngOnInit() {
    this.searchPlaceHolder = this.languageService.instant('find') + " " + this.languageService.instant(this.placeholderText);

    this.initDropdown();

    if (this.filterParam) {
      let selectedValue = this.setDefaultValues((this.filterParam["initialValue"]),
        this.filterParam["attributeName"]);
      this.outputEmitter.emit(selectedValue);
    }

    if (this.dynamicValuesQuery) {
      this.anySubscription = this.observerService.anyEmitter.subscribe((queryData: string) => {
        if (this.dynamicValuesQuery == "refresh") {
          this.setDefaultValues(queryData['attributeName'], queryData['initialValue']);
        }
      });
    }
  }

  /**
   * Carga en el desplegable todos los valores disponibles y abilita un observer para filtrar automáticamente los
   * resultados si se busca una opción en el filtro
   */
  initDropdown() {
    // load the initial options list
    this.filteredOptions.next(this.dropdownOptions.slice());

    // listen for search field value changes
    this.optionsFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterOptions();
      });
  }

  /**
   * Establece la opción inicial del desplegable
   * @param initialValue string, valor inicial a buscar
   * @param attributeName string, atributo por el cuál se buscará el valor inicial (id / nombre)
   * @returns string, valor inicial buscado (y ya encontrado)
   */
  setDefaultValues(initialValue: string, attributeName: string) {
    let initialValueIndex = this.dropdownOptions.findIndex(function (item) {
      return item[attributeName] == initialValue;
    });

    let selectedValue = this.dropdownOptions[initialValueIndex];
    this.optionsCtrl.setValue(selectedValue);

    return selectedValue;
  }

  /**
   * Destruye el observer que se activaba cuando había valores dinámicos y el observer del filtro del desplegable
   */
  ngOnDestroy() {
    if (this.anySubscription) this.anySubscription.unsubscribe();
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Comprueba si el desplegable tiene valores y si hay algo en el input de filtrar, si se cumplen dichas condiciones
   * busca en los valores del desplegable algún valor que coincida con el texto introducido como filtro, si encuentra
   * alguna coincidencia la muestra en el desplegable
   * @returns void, el return se usa para salir del método si no se cumplen las condiones necesarias
   */
  protected filterOptions() {
    if (!this.dropdownOptions) {
      return;
    }

    // get the search keyword
    let search = this.optionsFilterCtrl.value;
    if (!search) {
      this.filteredOptions.next(this.dropdownOptions.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    // filter the options
    this.filteredOptions.next(
      this.dropdownOptions.filter(currentOption => currentOption['nombre'].toLowerCase().includes(search))
    );
  }

  /**
   * Notifica la opción elegida
   * @param event any, opción elegida
   */
  changeOption(event: any) {
    if (event.isUserInput) {
      this.outputEmitter.emit(event.source.value);
    }
  }
}
