import { Injectable } from "@angular/core";
import {
  ToastController,
  AlertController,
  LoadingController,
} from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class ToastsService {
  constructor(
    private _alert: AlertController,
    public _toast: ToastController,
    public _loading: LoadingController,
  ) {}

  async presentToast(msj) {
    const toast = await this._toast.create({
      color: "tertiary",
      message: msj,
      duration: 2000,
    });
    toast.present();
  }

  async successToast(msj) {
    const toast = await this._toast.create({
      color: "success",
      message: msj,
      duration: 2000,
    });
    toast.present();
  }

  async errorToast(msj) {
    const toast = await this._toast.create({
      color: "danger",
      message: msj,
      duration: 2000,
    });
    toast.present();
  }

  async deleteToast(titulo: string, msg: string) {
    let alert = await this._alert.create({
      header: titulo,
      message: msg,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            alert.dismiss(false);
            return false;
          },
        },
        {
          text: "Confirmar",
          role: "confirm",
          handler: () => {
            alert.dismiss(true);
            return false;
          },
        },
      ],
    });
    return alert;
  }

  async mostrarLoading() {
    const loading = await this._loading.create({
      cssClass: "my-custom-class",
      message: "Por favor espere...",
    });
    loading.present();
  }

  esconderLoading() {
    this._loading
      .dismiss()
      .then((res) => {
        console.log("cerrando loading", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
}
