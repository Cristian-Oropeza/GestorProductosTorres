import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-mensaje',
  templateUrl: './dialog-mensaje.component.html',
  styleUrls: ['./dialog-mensaje.component.css']
})
export class DialogMensajeComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      titulo: string; 
      mensaje: string;
      mostrarCancelar?: boolean; // Parámetro opcional para mostrar el botón Cancelar
    }
  ) {}

  cerrarDialog(): void {
    this.dialogRef.close(true); // Se cierra confirmando la acción
  }

  cancelar(): void {
    this.dialogRef.close(false); // Se cierra cancelando la acción
  }
}
