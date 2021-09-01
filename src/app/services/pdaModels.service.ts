import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PDAs {
  public NO_PDA: number = -1
  public GENERICA: number = 0
  public HONEYWELL: number = 1
  public ZEBRA: number = 2
  public SPP_VERTICAL: number = 3
  public SPP_HORIZONTAL: number = 4
  public WEDGE_VERTICAL: number = 5
  public WEDGE_HORIZONTAL: number = 6
  public IDATA: number = 7
  public SEUIC: number = 8
  public HONEYWELL_WEARABLE: number = 9
  public PICKING_SOLUTIONS: number = 10

  public BARCODE_SCANNERS: number = 10
  public RFID_SCANNERS: number = 11

  public ZEBRA_RFID: number = 11
  public HONEYWELL_RFID: number = 12

  public nullScanner = {
    "id": "-1",
    "nombre": ""
  }

  public avaibleScanners: Array<any> = [
    {
      "id": "1",
      "nombre": "Barcode Honeywell",
      "wearable": true
    },
    {
      "id": "2",
      "nombre": "Barcode Zebra",
      "wearable": true
    },
    {
      "id": "10",
      "nombre": "Barcode Wepoy",
      "wearable": false
    },
    {
      "id": "11",
      "nombre": "Rfid Zebra",
      "wearable": false
    },
    {
      "id": "12",
      "nombre": "Rfid Honeywell",
      "wearable": false
    }
  ];

  constructor() { }

}
