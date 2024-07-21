const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mw = require("../middlewares/isAllowed");
const { ADMIN, COCINERO, MOZO } = require("../constants/roles");
const { mocksDAO } = require("../server");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mw.isAllowed([]),
app.get("/mock",  function (req, res) {
    mocksDAO.mock(function (err, mock) {
        if (err) {
            return res.status(400).json(err);
        }
        res.json(mock);
    });
});

module.exports = app;
