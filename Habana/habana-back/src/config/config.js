// Puertos
// ============================================
process.env.PORT = process.env.PORT || 3001;

// Entornos
// ============================================
process.env.NODE_ENV = process.env.NODE_ENV || "DEV";

/* Mongodb config */
var mdbconf = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    db: process.env.MONGO_DATABASE,
};

module.exports.mdbconf = mdbconf;
