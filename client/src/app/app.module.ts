import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { HomeComponent } from './pantallas/home/home.component';
import { DialogMensajeComponent } from './pantallas/dialog-mensaje/dialog-mensaje.component';

import { InicioAlmacenistaComponent } from './pantallas/almacenista/inicio-almacenista/inicio-almacenista.component';
import { AddProductosComponent } from './pantallas/almacenista/add-productos/add-productos.component';

import { ActualizarProductoComponent } from './pantallas/almacenista/actualizar-producto/actualizar-producto.component';
import { DetalleProductoComponent } from './pantallas/almacenista/detalle-producto/detalle-producto.component';
import { HistorialLotesComponent } from './pantallas/historial-lotes/historial-lotes.component';
import { HistorialPreciosComponent } from './pantallas/historial-precios/historial-precios.component';

//import { DetalleProductoRepositorComponent } from './pantallas/repositor/detalle-producto-repositor/detalle-producto-repositor.component';
//import { InicioRepositorComponent } from './pantallas/repositor/inicio-repositor/inicio-repositor.component';

//import { InicioClienteComponent } from './pantallas/inicio-cliente/inicio-cliente.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InicioAlmacenistaComponent,
    DialogMensajeComponent,
    HistorialLotesComponent,
    HistorialPreciosComponent,
    //DetalleProductoRepositorComponent,
    //InicioRepositorComponent,
    //InicioClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    AddProductosComponent,
    ActualizarProductoComponent,
    DetalleProductoComponent,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
