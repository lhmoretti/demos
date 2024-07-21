// SDK de Mercado Pago
import mercadopago from 'mercadopago';
import { Request, Response, response } from 'express';
import { UsuariosController } from '../controllers/usuarios.controller';
import { Comercios } from '../Entities/Comercios';
import { report } from 'process';
var axios = require('axios');

export class MercadoPagoController {
    private userController: UsuariosController = new UsuariosController();

    constructor() {}

    public generarCheckOut(req: Request, res: Response) {
        let payer: any = {};
        let items: any[] = [];
        let idPedido: any;
        let idComercio: any;
        payer = req.body.payer;
        items = req.body.items;
        idPedido = req.body.idPedido;
        idComercio = req.body.idComercio;
        let mpfee = 0;

        // Agrega credenciales

        Comercios.findById(idComercio).then(async (resp) => {
            console.log(resp.plan);

            mercadopago.configure({
                access_token: resp.access_token,
            });

            if (resp.plan == 'Negocio') {
                console.log('entro negocio');
                mpfee = 2.0;
            } else if (resp.plan == 'Corporativo') {
                console.log('entro corporativo');
                mpfee = 1.0;
            } else if (resp.plan == 'Empresa') {
                console.log('entro empresa');
                mpfee = 0.5;
            } else {
                return res.json({
                    ok: false,
                    msg: 'El comercio no tiene un plan elegido.',
                });
            }

            // Crea un objeto de preferencia
            let preference = {
                payer: payer,
                items: items,
                back_urls: {
                    success:
                        'https://your-domain.com.ar/api/v1/mercadopago/success',
                    failure:
                        'https://your-domain.com.ar/api/v1/mercadopago/failure',
                    pending:
                        'https://your-domain.com.ar/api/v1/mercadopago/pending',
                },
                auto_return: 'approved',
                external_reference: `recoshop_${idPedido}`,
                marketplace_fee: mpfee,

                notification_url:
                    'https://your-domain.com.ar/api/v1/mercadopago/notificationipn',
            };

            mercadopago.preferences
                .create(preference)
                .then(function (response) {
                    // console.log(response);
                    // Este valor reemplazará el string "$$init_point$$" en tu HTML
                    res.json({ response });
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

    public notificacionesIPN(req: Request, res: Response, idPago: number) {
        mercadopago.ipn
            .manage(req)
            .then(function (response) {
                console.log('Reponse OK', response);
                res.json({ response });
            })
            .catch(function (error) {
                console.log('Response Error', error);
            });
    }

    public AdhesionAlMarketplace(req: Request, res: Response) {
        console.log('Se ejecutó adhesion');

        let idComercio = Number(req.query.state);
        let code = String(req.query.code);
        let comercio: Comercios;

        console.log('idUsuario', idComercio);
        console.log('Code', code);

        Comercios.findById(idComercio).then(async (comercio) => {
            // console.log(comercio);
            let acc_tok =
                'APP_USR-4783444611080351-081411-c09d3ecc5205f6124cdd2fa436bde56f-577061695';
            let red_uri =
                'https://your-domain.com.ar/api/v1/mercadopago/adhesionmarketplace';

            if (comercio != null) {
                let data = '';

                var config = {
                    method: 'post',
                    url: `https://api.mercadopago.com/oauth/token?client_secret=${acc_tok}&grant_type=authorization_code&code=${code}&redirect_uri=${red_uri}`,
                    headers: {},
                    data: data,
                };

                axios(config)
                    .then(async (response) => {
                        let respData = await response.data;

                        let date = new Date();
                        let acc_tok = await respData.access_token;

                        console.log('refresh token', respData.refresh_token);
                        console.log('date', date);
                        console.log('access token', respData.access_token);

                        comercio.auth_code = code;
                        comercio.last_update_token = date;
                        comercio.refresh_token = await respData.refresh_token;
                        comercio.access_token = acc_tok;

                        console.log(comercio);

                        let resp = await Comercios.saveTokens(comercio);
                        if (resp) {
                            console.log('Actualizado con exito');
                            res.writeHead(301, {
                                Location: 'https://your-domain.com.ar/admin',
                            });
                            res.end();
                        }
                    })
                    .catch(function (error) {
                        console.log(error.data);
                    });
            } else {
                res.json({
                    ok: false,
                    msg: 'No existe ningun comercio con ese ID',
                });
            }
        });

        // request.post(url,(resp)=>{console.log("RESP",resp)})
    }

    public successPayment(req: Request, res: Response) {
        res.writeHead(301, {
            Location: 'https://your-domain.com.ar/cliente/checkout2',
        });
        res.end();
    }

    public pendingPayment(req: Request, res: Response) {
        res.writeHead(301, {
            Location: 'https://your-domain.com.ar/cliente/checkout2',
        });
        res.end();
    }

    public failurePayment(req: Request, res: Response) {
        res.writeHead(301, {
            Location: 'https://your-domain.com.ar/cliente/checkout2',
        });
        res.end();
    }
}
