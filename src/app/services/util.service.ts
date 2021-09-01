import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  navigateReplacingUrl(route: string) {
    this.navCtrl.navigateRoot([route], { replaceUrl: true });
  }

  /**
 * Muestra un mensaje en la parte inferior de la pantalla
 * @param message string, mensaje que mostrar
 */
  public async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  public setStorage(key: any, value: any) {
    return this.storage.set(key, value);
  }

  public getStorage(key: any) {
    return this.storage.get(key);
  }

  public removeStorage(key: any) {
    return this.storage.remove(key);
  }

}
