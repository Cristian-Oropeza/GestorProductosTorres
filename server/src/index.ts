import express, { Application } from 'express';

class Server {
    public app: Application;

    constructor() {
        this.app = express();  
        this.config();  // Configura el servidor
        this.routes();  // Configura las rutas
    }

    // Método para configurar el servidor
    private config(): void {
        this.app.set('port', process.env.PORT || 3000);
    }

    // Método para definir rutas (vacío por ahora)
    private routes(): void {
        // Aquí irán las rutas más adelante
    }

    // Método para iniciar el servidor
    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

// Instancia del servidor y ejecución
const server = new Server();
server.start();
