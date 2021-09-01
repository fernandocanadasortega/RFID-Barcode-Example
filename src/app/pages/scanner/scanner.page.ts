import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { BarcodePlugin } from "barcode-plugin";
import { ObserverService } from 'services/observer.service';
import { PDAs } from 'services/pdaModels.service';
import { UtilService } from 'services/util.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class LoginPage implements OnInit {

  public barcodeData: Array<string> = [];
  public zebraRfidData: Array<any> = [];
  public honeywellRfidData: Array<any> = [];

  public selectedScanner: any;
  public defaultScanner: any;
  public wearable: boolean = false;

  constructor(
    private zone: NgZone,
    public pdaModel: PDAs,
    private utils: UtilService,
    private ref: ChangeDetectorRef,
    private observerService: ObserverService
  ) { }

  ngOnInit() {
    this.utils.getStorage('scanners').then((res: any) => {
      console.log(res);
      if (res && res['currentScanner'] && res['currentScanner']["id"] != -1) {
        this.defaultScanner = {
          attributeName: "id",
          initialValue: res['currentScanner']["id"]
        }
      }
      else {
        this.defaultScanner = {
          attributeName: "id",
          initialValue: -1
        }
      }

      if (res && res['wearable']) {
        if (+res["wearable"] == 1) {
          this.wearable = true;
        }
        else {
          this.wearable = false;
        }
      }
    });
  }

  public saveScanner(scanner: any) {
    this.selectedScanner = scanner;
    this.ref.detectChanges();

    this.utils.getStorage('scanners').then((res: any) => {
      let scanners: any = {};

      if (res && res['wearable']) {
        scanners['wearable'] = res['wearable'];
      } else {
        scanners['wearable'] = "0";
      }

      if (res && res['lastScanner'] && res['currentScanner']) {
        scanners['lastScanner'] = res['currentScanner'];
        scanners['currentScanner'] = scanner;
      }
      else {
        scanners['lastScanner'] = this.pdaModel.nullScanner;
        scanners['currentScanner'] = scanner;
      }

      this.utils.setStorage('scanners', scanners).then(() => { });
    });
  }

  public saveWearable(wearable: boolean) {
    this.utils.getStorage('scanners').then((res: any) => {
      let scanners: any = {};

      if (wearable) scanners['wearable'] = "1";
      else scanners['wearable'] = "0";

      if (res) {
        scanners['lastScanner'] = res['lastScanner'];
        scanners['currentScanner'] = res['currentScanner'];
      }

      this.utils.setStorage('scanners', scanners).then(() => { });
    });
  }

  public deleteSavedScanners() {
    this.utils.removeStorage('scanners').then(() => {
      console.log("Escaner storage borrado");
      this.utils.showToast("Borrando los valores guardados en el storage");

      this.observerService.anyEmitter.emit({
        attributeName: "id",
        initialValue: -1
      });

      this.barcodeData = undefined;
      this.zebraRfidData = undefined;
      this.honeywellRfidData = undefined;
      this.wearable = false;
    });
  }

  /**
   * Inicia el escaner deseado
   */
  public scan() {
    try {
      this.utils.getStorage('scanners').then((scanners: any) => {
        if (scanners && scanners['currentScanner']) {
          BarcodePlugin.startScanner(
            {
              currentPda: scanners['lastScanner']["id"], newPda: scanners['currentScanner']["id"], wearable: scanners['wearable']
            }, this.getScannersData.bind(this)
          );
        }
      });
    }
    catch (error) { }
  }

  public closeScan() {
    BarcodePlugin.closeScanner();
  }

  /**
   * Recibe los datos del escaner
   * @param data any, this con la instancia de la clase
   */
  private getScannersData(data: any) {
    if (data) {
      if (data['barcodeData']) {
        this.barcodeData.push(data['barcodeData']);
        this.utils.showToast("Datos de código de barras añadidos a la tabla");
      }

      else if (data['honeywell']) {
        this.honeywellRfidData = [];

        let parsedHoneywell = JSON.parse(data['honeywell']);
        for (let honeywell in parsedHoneywell) {
          this.honeywellRfidData.push(JSON.stringify(parsedHoneywell[honeywell]));
        }

        this.utils.showToast("Datos de Honeywell RFID añadidos a la tabla");
      }

      else if (data['zebra']) {
        this.zebraRfidData = [];

        let parsedZebra = JSON.parse(data['zebra']);
        for (let zebra in parsedZebra) {
          this.zebraRfidData.push(JSON.stringify(parsedZebra[zebra]));
        }

        this.utils.showToast("Datos de zebra RFID añadidos a la tabla");
      }

      this.zone.run(() => { });
    }
  }

  public settings() {
    this.utils.navigateReplacingUrl("/settings")
  }
}
