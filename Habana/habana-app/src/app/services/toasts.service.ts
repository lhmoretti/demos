import { Injectable } from "@angular/core";
import {
    ToastController,
    LoadingController,
    AlertController,
} from "@ionic/angular";

@Injectable({
    providedIn: "root",
})
export class ToastsService {
    constructor(
        private alertCtl: AlertController,
        private toastController: ToastController,
        public loadingController: LoadingController
    ) {}

    async successToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            mode: "ios",
            color: "success",
            cssClass: "textColor",
            position: "bottom",
            duration: 2000,
        });
        toast.present();
    }

    async errorToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            mode: "ios",
            color: "danger",
            position: "bottom",
            duration: 2000,
        });
        toast.present();
    }

    async alertToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            mode: "ios",
            color: "primary",
            position: "bottom",
            duration: 2000,
        });
        toast.present();
    }

    async deleteToast(titulo: string, msg: string) {
        let alert = await this.alertCtl.create({
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
        const loading = await this.loadingController.create({
            cssClass: "my-custom-class",
            message: "Por favor espere...",
        });
        loading.present();
    }

    esconderLoading() {
        this.loadingController
            .dismiss()
            .then((res) => {
                // console.log('cerrando loading', res);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }
}
