const express = require("express");
const app = express();
const { pedidosDAO } = require("../server");
const bodyParser = require("body-parser");
const mw = require("../middlewares/isAllowed");
const { ADMIN, COCINERO, MOZO } = require("../constants/roles");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.post(
    "/pedidos",
    mw.isAllowed([COCINERO, MOZO]),
    function (req, res) {
        let pedido = req.body;

        pedidosDAO.post(pedido, function (err, pedido) {
            if (err) {
                res.send({
                    error: true,
                    err: err,
                });
            } else {
                res.json(pedido);
            }
        });
    }
);

app.get("/pedidos", mw.isAllowed([COCINERO, MOZO]), function (req, res) {
    pedidosDAO.getAll(function (err, pedidos) {
        if (err) return res.status(400).json(err);

        res.json(pedidos);
    });
});

app.get(
    "/pedido/:id",
    mw.isAllowed([COCINERO, MOZO]),
    function (req, res) {
        let id = req.params.id;

        pedidosDAO.getById(id, function (err, pedido) {
            if (err) return res.status(400).json(err);

            res.json(pedido);
        });
    }
);

app.get(
    "/pedidos/PendAndEnt",
    mw.isAllowed([COCINERO, MOZO]),
    function (req, res) {
        pedidosDAO.getPendAndEnt(function (err, pedidos) {
            if (err) return res.status(400).json(err);

            res.json(pedidos);
        });
    }
);

app.get(
    "/pedidos/pendientes",
    mw.isAllowed([COCINERO, MOZO]),
    function (req, res) {
        pedidosDAO.getPendientes(function (err, pedidos) {
            if (err) return res.status(400).json(err);

            res.json(pedidos);
        });
    }
);

app.get(
    "/pedidos/entregados",
    mw.isAllowed([COCINERO, MOZO]),
    function (req, res) {
        pedidosDAO.getEntregados(function (err, pedidos) {
            if (err) return res.status(400).json(err);

            res.json(pedidos);
        });
    }
);

app.get(
    "/pedidos/listos",
    mw.isAllowed([COCINERO, MOZO]),
    function (req, res) {
        pedidosDAO.getListos(function (err, pedidos) {
            if (err) return res.status(400).json(err);

            res.json(pedidos);
        });
    }
);

app.get(
    "/pedidos/mozo/:id",
    mw.isAllowed([COCINERO, MOZO]),
    function (req, res) {
        let id = req.params.id;
        pedidosDAO.getPedidoMozo(id, function (err, pedidos) {
            if (err) return res.status(400).json(err);

            res.json(pedidos);
        });
    }
);

app.put("/pedidos", mw.isAllowed([COCINERO, MOZO]), function (req, res) {
    let pedido = req.body;
    pedidosDAO.put(pedido, function (err, pedidos) {
        if (err) return res.status(400).json(err);

        res.json(pedidos);
    });
});

app.delete(
    "/pedido/:id",
    mw.isAllowed([COCINERO, MOZO]),
    function (req, res) {
        let id = req.params.id;

        pedidosDAO.deleteOne(id, function (err, pedido) {
            if (err) return res.status(400).json(err);

            res.json(pedido);
        });
    }
);

app.delete(
    "/pedidos/deleteAll",
    mw.isAllowed([ADMIN]),
    function (req, res) {
        pedidosDAO.deleteAll(function (err, pedidos) {
            if (err) return res.status(400).json(err);

            res.json(pedidos.deletedCount);
        });
    }
);

module.exports = app;
