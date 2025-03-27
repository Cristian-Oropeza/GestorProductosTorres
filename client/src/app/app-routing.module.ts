import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pantallas/home/home.component';

import { InicioAlmacenistaComponent } from './pantallas/almacenista/inicio-almacenista/inicio-almacenista.component';
import { AddProductosComponent } from './pantallas/almacenista/add-productos/add-productos.component';
import { ActualizarProductoComponent } from './pantallas/almacenista/actualizar-producto/actualizar-producto.component';
import { DetalleProductoComponent } from './pantallas/almacenista/detalle-producto/detalle-producto.component';

import { InicioRepositorComponent } from './pantallas/repositor/inicio-repositor/inicio-repositor.component';
import { DetalleProductoRepositorComponent } from './pantallas/repositor/detalle-producto-repositor/detalle-producto-repositor.component';

import { InicioClienteComponent } from './pantallas/cliente/inicio-cliente/inicio-cliente.component';
import { DetalleClienteComponent } from './pantallas/cliente/detalle-cliente/detalle-cliente.component';

import { HistorialLotesComponent } from './pantallas/historial-lotes/historial-lotes.component';
import { HistorialPreciosComponent } from './pantallas/historial-precios/historial-precios.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicioAlmacenista', component: InicioAlmacenistaComponent },
  { path: 'addProducto', component: AddProductosComponent },
  { path: 'actualizarProducto/:codigo', component: ActualizarProductoComponent },
  { path: 'detalleProducto/:codigo', component: DetalleProductoComponent },  
  
  { path: 'inicioRepositor', component: InicioRepositorComponent },
  { path: 'detalleProductoRepositor/:codigo', component: DetalleProductoRepositorComponent },


  { path: 'inicioCliente', component: InicioClienteComponent },
  { path: 'detalleCliente/:codigo', component: DetalleClienteComponent },

    { path: 'historial-precios', component: HistorialPreciosComponent },
    { path: 'historial-lotes', component: HistorialLotesComponent },
    

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}