"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config(); // Configura el servidor
        this.routes(); // Configura las rutas
    }
    // Método para configurar el servidor
    config() {
        this.app.set('port', process.env.PORT || 3000);
    }
    // Método para definir rutas (vacío por ahora)
    routes() {
        // Aquí irán las rutas más adelante
    }
    // Método para iniciar el servidor
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
// Instancia del servidor y ejecución
const server = new Server();
server.start();
