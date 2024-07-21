import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import { Pedidos } from '../Entities/Pedidos';
import { Usuarios } from '../Entities/Usuarios';

export class TransactionalMailsController {
    constructor() {}

    public async createTransport(req: Request, res: Response) {
        let body = req.body;

        res.json({
            ok: true,
            msg: 'Mail enviado..',
        });

        // if (body.correo == "" || body.correo == null || body.correo == undefined) {
        //   res.json({
        //     ok: false,
        //     msg: "No ingresó ningún correo",
        //   });
        //   return null;
        // }

        // let transporter = nodemailer.createTransport({
        //   host: "vps-1761509-x.dattaweb.com",
        //   port: 465,
        //   secure: true, // true for 465, false for other ports
        //   auth: {
        //     user: "no-reply@mindeep.com.ar", // generated ethereal user
        //     pass: "1eCdsAWI6H", // generated ethereal password
        //   },
        // });

        // switch (body.role) {
        //   //Correo para el registro de usuarios
        //   case "RU":
        //     transporter
        //       .sendMail({
        //         from: '"Mindeep" <no-reply@mindeep.com.ar>',
        //         to: `${body.correo}`,
        //         subject: "Confirmación de registro",

        //         html: `
        //                 <!DOCTYPE html>
        //             <html lang="en">
        //             <head>
        //             <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        //                 <meta charset="UTF-8">
        //                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //                 <title>Email registro</title>
        //             </head>
        //             <body>
        //                 <div class="contenedor" style="" align="center">
        //                 <img style="max-height: 110px; width: auto;" src="https://mindeep.com.ar/imagenes/logo.jpeg" alt="" srcset="">
        //                     <h4 class="txt-title" style="color: #e7600f;">¡Bienvenido a Mindeep!</h4>
        //                     <br>
        //                     <p>Tu registro se ha realizado con exito.</p>
        //                     <p>Estás en el Nivel 1 y estás habilitado como comprador</p>
        //                     <br>
        //                     <br>
        //                 </div>
        //             </body>
        //             </html>
        //                 `,
        //       })
        //       .then((resp) => {
        //         res.json({
        //           ok: true,
        //           msg: "¡Mensaje enviado con exito!",
        //         });
        //       });
        //     break;

        //   //Correo para el registro de comercios
        //   case "RC":
        //     transporter
        //       .sendMail({
        //         from: '"Mindeep" <no-reply@mindeep.com.ar>',
        //         to: `${body.correo}`,
        //         subject: "Confirmación como vendedor",
        //         html: `
        //                     <!DOCTYPE html>
        //                     <html lang="en">
        //                     <head>
        //                         <meta charset="UTF-8">
        //                         <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //                         <title>Registro comercio</title>
        //                     </head>
        //                     <body>
        //                         <div align="center">
        //                             <img style="max-height: 110px; width: auto;" src="https://mindeep.com.ar/imagenes/logo.jpeg" alt="" srcset="">

        //                             <h4 style="color: #e7600f;">¡${body.nombre} ya podes vender!</h4>
        //                             <p>Estás en el Nivel 2 y estás habilitado como Vendedor</p>
        //                             <br>
        //                             <br>
        //                             <p>En los próximos días te enviaremos consejos útiles para vender más</p>
        //                         </div>
        //                     </body>
        //                     </html>
        //                     `,
        //       })
        //       .then((resp) => {
        //         res.json({
        //           ok: true,
        //           msg: "¡Mensaje enviado con éxito!",
        //         });
        //       });
        //     break;

        //   //Correo para enviar email del pedido al usuario.
        //   case "PU":
        //     let filas: String = "";
        //     let pedido: Pedidos = req.body.pedido;

        //     for (let i of pedido.pedido_lineas) {
        //       console.log(i);
        //       let tr: string = `
        //                 <tr>
        //                 <td style="border: 1px solid black;padding: 10px;">${i.nombre}</td>
        //                 <td style="border: 1px solid black;padding: 10px;"> x${i.cantidad}</td>
        //                 <td style="border: 1px solid black;padding: 10px;">$ ${i.precio_venta}</td>
        //                 </tr>
        //                 `;
        //       filas += tr;
        //     }

        //     transporter
        //       .sendMail({
        //         from: '"Mindeep" <no-reply@mindeep.com.ar>',
        //         to: `${body.correo}`,
        //         subject: "Procesando tu pedido",
        //         html: `
        //                 <!DOCTYPE html>
        //                 <html lang="en">
        //                 <head>
        //                     <meta charset="UTF-8">
        //                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //                     <title>Registro comercio</title>
        //                 </head>
        //                 <body>
        //                 <div style="max-width: 500px; border: solid 1px #CCC;" align="center">
        //                 <div style="width: 100%; background-color: #e7600f;"><img style="max-height: 70px; width: auto;" src="https://mindeep.com.ar/cliente/assets/imgs/logo-mindeep.png" srcset="" alt="" /></div>
        //                 <h4 style="color: #e7600f;">Gracias ${pedido.usuarioId.nombre} ${pedido.usuarioId.apellido} por tu compra!</h4>
        //                 <br />
        //                 <h4 style="color: #e7600f;">Tu pedido de ${pedido.comercioId.nombre} ya está siendo procesado</h4>
        //                 <br />
        //                 <p>En caso de que el comercio no tenga stock de alguno de los productos se pondrán en contacto contigo</p>
        //                 <br />
        //                 <p><strong>Informaci&oacute;n del pedido:</strong></p>
        //                 ProductoCantidadPrecio U.${filas}<hr />
        //                 <div align="center">
        //                 <p><strong>Opciones seleccionadas:</strong></p>
        //                 <p style="color: #e7600f;">Medio de pago: ${pedido.modo_pago}</p>
        //                 <p style="color: #e7600f;">Forma de envio: ${pedido.modo_entrega}</p>
        //                 <p style="color: #e7600f;">Domicilio: ${pedido.usuarioId.domicilio} <br /> ${pedido.usuarioId.localidad}</p>
        //                 </div>
        //                 <div style="width:90%; height:20px; background-color: #e7600f; padding:5%;"><a href="https://your-domain.com.ar" style="text-decoration:none; color:#FFF;">www.mindeep.com.ar</a></div>
        //                 </div>
        //                 </body>
        //                 </html>
        //                 `,
        //       })
        //       .then((resp) => {
        //         res.json({
        //           ok: true,
        //           msg: "¡Mensaje enviado con éxito!",
        //         });
        //       })
        //       .catch((err) => {
        //         res.json({
        //           ok: false,
        //           error: err,
        //         });
        //       });
        //     break;

        //   //Correo para enviar el pedido a los comercios
        //   case "PC":
        //     let filasPc: String = "";
        //     let pedidoPc: Pedidos = req.body.pedido;
        //     for (let i of pedidoPc.pedido_lineas) {
        //       console.log(i);
        //       let tr: string = `
        //                 <tr>
        //                 <td style="border: 1px solid black;padding: 10px;">${i.nombre}</td>
        //                 <td style="border: 1px solid black;padding: 10px;"> x${i.cantidad}</td>
        //                 <td style="border: 1px solid black;padding: 10px;">$ ${i.precio_venta}</td>
        //                 </tr>
        //                 `;
        //       filasPc += tr;
        //     }

        //     transporter
        //       .sendMail({
        //         from: '"Mindeep" <no-reply@mindeep.com.ar>',
        //         to: `${body.correo}`,
        //         subject: "¡Nuevo pedido!",

        //         html: `
        //                 <!DOCTYPE html>
        //                 <html lang="en">
        //                 <head>
        //                     <meta charset="UTF-8">
        //                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //                     <title>Registro comercio</title>
        //                 </head>
        //                 <body>
        //                 <div style="max-width: 500px; border: solid 1px #CCC;" align="center">
        //                 <div style="width: 100%; background-color: #e7600f;"><img style="max-height: 70px; width: auto;" src="https://mindeep.com.ar/cliente/assets/imgs/logo-mindeep.png" srcset="" alt="" /></div>
        //                 <h4 style="color: #e7600f;">¡Tenés un nuevo pedido de ${pedidoPc.usuarioId.nombre} ${pedidoPc.usuarioId.apellido}!</h4>
        //                     <p>Si no tenés stock de alguno de los productos dale una respuesta inmediata al comprador!,
        //                                             de este modo vas a generar una buena experiencia de compra y la fidelización de tu cliente.</p>
        //                 <br />
        //                   <p><strong>Informaci&oacute;n del Cliente:</strong></p>
        //                    <p>Teléfono de contacto: ${pedidoPc.usuarioId.telefono}</p>
        //                                             <p>Email contacto: ${pedidoPc.usuarioId.email}</p>

        //                 <br />
        //                 <p><strong>Informaci&oacute;n del pedido:</strong></p>
        //                      <table style="border-collapse: collapse;border: 0.5px solid black;padding: 7px;">
        //                                                 <th style="border: 1px solid black;padding: 7px;">Producto</th>
        //                                                 <th style="border: 1px solid black;padding: 7px;">Cantidad</th>
        //                                                 <th style="border: 1px solid black;padding: 7px;">Precio U.</th>
        //                                                     ${filasPc}
        //                                             </table>
        //                 <div align="center">
        //                 <p><strong>Opciones seleccionadas por el cliente:</strong></p>
        //                 <p style="color: #e7600f;">Medio de pago: ${pedidoPc.modo_pago}</p>
        //                 <p style="color: #e7600f;">Forma de envio: ${pedidoPc.modo_entrega}</p>
        //                 <p style="color: #e7600f;">Domicilio: ${pedidoPc.usuarioId.domicilio} <br /> ${pedidoPc.usuarioId.localidad}</p>
        //                 </div>
        //                 <div style="width:90%; height:20px; background-color: #e7600f; padding:5%;"><a href="https://your-domain.com.ar" style="text-decoration:none; color:#FFF;">www.mindeep.com.ar</a></div>
        //                 </div>

        //                 </body>
        //                 </html>

        //                         `,
        //       })
        //       .then((resp) => {
        //         res.json({
        //           ok: true,
        //           msg: "¡Mensaje enviado con éxito!",
        //         });
        //       })
        //       .catch((err) => {
        //         res.json({
        //           ok: false,
        //           error: err,
        //         });
        //       });
        //     break;

        //   case "RP":
        //     let email = req.body.correo;
        //     let recpass: string;
        //     // console.log(email);
        //     let user: Usuarios;
        //     Usuarios.findByEmail(email)
        //       .then((usuario) => {
        //         //   console.log("USUARIO",usuario);
        //         user = usuario;
        //         let cod = String(Date.now());
        //         recpass = String(cod.substring(7, 13));
        //         // console.log(recpass);

        //         if (user != undefined) {
        //           user.recpass = recpass;

        //           Usuarios.saveCodeRecPass(user)
        //             .then((resp) => {
        //               transporter
        //                 .sendMail({
        //                   from: '"Mindeep" <no-reply@mindeep.com.ar>',
        //                   to: `${body.correo}`,
        //                   subject: "Recupera tu contraseña",

        //                   html: `
        //                         <!DOCTYPE html>
        //                         <html lang="en">
        //                         <head>
        //                             <meta charset="UTF-8">
        //                             <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //                             <title>Registro comercio</title>
        //                         </head>
        //                         <body>

        //                             <div align="center">

        //                                 <h4 style="color: #e7600f;">¿Olvidaste tu contraseña?</h4>
        //                                 <p>No te preocupes, suele suceder :)</p>
        //                                 <p>¡Te enviamos el código de recuperación!</p>
        //                                 <br>
        //                                 <h2 style="background-color: #e7600f; color:white; max-width: 200px;">${recpass}</h2>
        //                                 <img style="max-height: 110px; width: auto;" src="https://mindeep.com.ar/imagenes/logo.png" alt="" srcset="">

        //                             </div>

        //                         </body>
        //                         </html>

        //                                 `,
        //                 })
        //                 .then((resp) => {
        //                   res.json({
        //                     ok: true,
        //                     msg: "¡Mensaje enviado con éxito!",
        //                   });
        //                 })
        //                 .catch((err) => {
        //                   res.send(err);
        //                 });
        //             })
        //             .catch((err) => {
        //               res.send(err);
        //             });
        //         } else {
        //           res.json({
        //             ok: false,
        //             msg: "El correo electrónico que ingresaste no está registrado.",
        //           });
        //         }
        //       })
        //       .catch((err) => {
        //         res.send({ err });
        //       });
        //     break;

        //   default:
        //     break;
        // }
    }
}
