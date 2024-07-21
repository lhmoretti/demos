const express = require("express");
const app = express();
const { usersDAO } = require("../server");
const bodyParser = require("body-parser");
const mw = require("../middlewares/isAllowed");
const { ADMIN } = require("../constants/roles");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/usuarios", mw.isAllowed([ADMIN]), function (req, res) {
    let usuario = req.body;
    let fc_alta = new Date();
    usuario.fecha_alta = fc_alta;

    usersDAO.post(usuario, function (err, user) {
        if (err) {
            return res.send({
                error: true,
                msg: err,
            });
        } else {
            res.json(user);
        }
    });
});

app.get("/usuarios", mw.isAllowed([ADMIN]), function (req, res) {
    usersDAO.getAll(function (err, user) {
        if (err) {
            return res.send({
                error: true,
                err: err,
            });
        } else {
            res.json(user);
        }
    });
});

app.get("/usuarios/:id", mw.isAllowed([ADMIN]), function (req, res) {
    let id = req.params.id;

    usersDAO.getById(id, function (err, user) {
        if (err) {
            return res.send({
                error: true,
                msg: err,
            });
        } else {
            res.json(user);
        }
    });
});

app.put("/usuarios", mw.isAllowed([ADMIN]), function (req, res) {
    usersDAO.put(req.body, function (err, userUpdated) {
        if (err) {
            return res.send({
                error: true,
                msg: err,
            });
        } else {
            res.json(userUpdated);
        }
    });
});

app.delete("/usuarios/:id", mw.isAllowed([ADMIN]), function (req, res) {
    let id = req.params.id;

    usersDAO.delete(id, function (err, usuario) {
        if (err) {
            return res.status(400).json(err);
        }
        res.json(usuario);
    });
});

module.exports = app;
