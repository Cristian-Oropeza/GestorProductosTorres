import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { HomeComponent } from './pantallas/home/home.component';
import { DialogMensajeComponent } from './pantallas/dialog-mensaje/dialog-mensaje.component';

import { InicioAlmacenistaComponent } from './pantallas/almacenista/inicio-almacenista/inicio-almacenista.component';
import { AddProductosComponent } from './pantallas/almacenista/add-productos/add-productos.component';

import { ActualizarProductoComponent } from './pantallas/almacenista/actualizar-producto/actualizar-producto.component';
import { DetalleProductoComponent } from './pantallas/almacenista/detalle-producto/detalle-producto.component';
import { HistorialLotesComponent } from './pantallas/historial-lotes/historial-lotes.component';
import { HistorialPreciosComponent } from './pantallas/historial-precios/historial-precios.component';

import { DetalleProductoRepositorComponent } from './pantallas/repositor/detalle-producto-repositor/detalle-producto-repositor.component';
import { InicioRepositorComponent } from './pantallas/repositor/inicio-repositor/inicio-repositor.component';

import { InicioClienteComponent } from './pantallas/cliente/inicio-cliente/inicio-cliente.component';
import { DetalleClienteComponent } from './pantallas/cliente/detalle-cliente/detalle-cliente.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InicioAlmacenistaComponent,
    DialogMensajeComponent,
    HistorialLotesComponent,
    HistorialPreciosComponent,
    DetalleProductoRepositorComponent,
    InicioRepositorComponent,
    InicioClienteComponent,
    DetalleClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    AddProductosComponent,
    ActualizarProductoComponent,
    DetalleProductoComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
