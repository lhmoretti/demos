const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const { usuarios } = require("./constants/users");
const { products } = require("./constants/products");

function MockDAO(db) {
    let ObjectId = require("mongodb").ObjectId;

    if (false == this instanceof MockDAO) {
        console.log(
            'WARNING: MockDAO constructor called without "new" operator'
        );
        return new MockDAO(db);
    }

    const database = db.db("app_habb");
    const users = database.collection("users");

    const createUsers = async () => {
        usuarios.map(async (user) => {
            try {
                const hashPass = await bcrypt.hash(user.password, 10);
                const result = await users.updateOne(
                    { username: user.username },
                    { $set: { ...user, password: hashPass } },
                    { $upsert: true }
                );
                console.log("Usuario actualizado: ", result);
            } catch (error) {
                return console.log("Error al actualizar usuario: ", error);
            }
        });
    };

    const createProducts = async () => {
        products.map(async (prod) => {
            try {
                const result = await users.updateOne(
                    { codigo: prod.codigo },
                    { $set: { ...prod } },
                    { $upsert: true }
                );
                console.log("Producto actualizado: ", result);
            } catch (error) {
                return console.log("Error al actualizar Producto: ", error);
            }
        });
    };

    this.mock = async function (callback) {
        await createUsers();
        await createProducts();

        callback(null, "Mock finalizado");
    };
}

module.exports.MockDAO = MockDAO;
