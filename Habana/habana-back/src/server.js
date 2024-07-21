/* Librerias necesarias para la aplicación */
const dotenv = require("dotenv");
dotenv.config();
const config = require("./config/config");
const cors = require("cors");
const app = require("express")();

// Opción HTTPS (SSL no controlado por NGINX)
// const { readFileSync } = require("fs");
// const { createServer } = require("https");
// const { Server } = require("socket.io");
// const KEY = "/etc/letsencrypt/live/mindeep.com.ar/privkey.pem";
// const CERT = "/etc/letsencrypt/live/mindeep.com.ar/cert.pem";

// const httpsServer = createServer({
//     key: readFileSync(KEY),
//     cert: readFileSync(CERT),
// });

// const io = new Server(httpsServer, { cors: { origin: "*" } });

// Opción HTTP
const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: { origin: "*" },
});

app.use(cors());

const MongoClient = require("mongodb").MongoClient;
const morgan = require("morgan");
const bodyParser = require("body-parser");
/* Mongodb config */
const mdbconf = config.mdbconf;

// IMPORTACION DE LOS DAO´S
const userDAO = require("./dao/UsersDAO").UserDAO;
const mesaDAO = require("./dao/MesasDAO").MesasDAO;
const prodDAO = require("./dao/ProductosDAO").ProductosDAO;
const pedidoDAO = require("./dao/PedidosDAO").PedidosDAO;
const mockDAO = require("./mock/mock.dao").MockDAO;

app.use(morgan("combined"));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

/* Get a mongodb connection and start application */
MongoClient.connect(
    "mongodb://" + mdbconf.host + ":" + mdbconf.port + "/" + mdbconf.db,
    {
        useUnifiedTopology: true,
    },
    function (err, db) {
        if (err)
            throw new Error(
                "Se ha producido un error al conectar la Base de Datos",
                err
            );

        console.log("Conectado a la Base de Datos");

        const usersDAO = new userDAO(db); // Initialize userDAO
        const mesasDAO = new mesaDAO(db);
        const prodsDAO = new prodDAO(db);
        const pedidosDAO = new pedidoDAO(db);
        let mocksDAO = null;
        if (process.env.NODE_ENV === "DEV") {
            mocksDAO = new mockDAO(db);
        }

        module.exports = {
            usersDAO,
            mesasDAO,
            prodsDAO,
            pedidosDAO,
            mocksDAO,
        };

        app.use(require("../src/routes/index"));

        io.on("connection", (socket) => {
            console.log("Socket conectado");
            socket.on("disconnect", function () {
                console.log("Socket desconectado");
            });

            socket.on("getAll", function () {
                pedidosDAO.getAll(function (err, peds) {
                    if (err) return console.log("Error al obtener los pedidos");

                    io.emit("getAll", peds);
                });
            });
        });

        http.listen(process.env.PORT, () => {
            console.log("Escuchando en el puerto:", process.env.PORT);
        });
    }
);
