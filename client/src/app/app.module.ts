import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pantallas/home/home.component';
import { InicioAlmacenistaComponent } from './pantallas/almacenista/inicio-almacenista/inicio-almacenista.component';
import { InicioRepositorComponent } from './pantallas/repositor/inicio-repositor/inicio-repositor.component';
import { InicioClienteComponent } from './pantallas/inicio-cliente/inicio-cliente.component';
import { AddProductosComponent } from './pantallas/almacenista/add-productos/add-productos.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';


import { DialogMensajeComponent } from './pantallas/dialog-mensaje/dialog-mensaje.component';
import { ActualizarProductoComponent } from './pantallas/almacenista/actualizar-producto/actualizar-producto.component';
import { DetalleProductoComponent } from './pantallas/almacenista/detalle-producto/detalle-producto.component';
import { DetalleProductoRepositorComponent } from './pantallas/repositor/detalle-producto-repositor/detalle-producto-repositor.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InicioAlmacenistaComponent,
    InicioRepositorComponent,
    InicioClienteComponent,
    AddProductosComponent,
    DialogMensajeComponent,
    ActualizarProductoComponent,
    DetalleProductoComponent,
    DetalleProductoRepositorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
