const { COCINERO, ADMIN, MOZO } = require("../../constants/roles");

const usuarios = [
    {
        username: "admin",
        password: "superAdmin1234**",
        nombre: "Admin",
        apellido: "Habana",
        email: "admin@admin.com",
        role: ADMIN,
        activo: true,
    },
    {
        username: "cocina",
        password: "superAdmin1234**",
        nombre: "Lucas",
        apellido: "Habana",
        email: "cocina@cocina.com",
        role: COCINERO,
        activo: true,
    },
    {
        username: "mozo",
        password: "superAdmin1234**",
        nombre: "Moz@",
        apellido: "Habana",
        email: "admin@admin.com",
        role: MOZO,
        activo: true,
    },
];

module.exports = {
    usuarios,
};
