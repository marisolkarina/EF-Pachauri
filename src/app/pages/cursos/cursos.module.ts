import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AbmCursosComponent } from './abm-cursos/abm-cursos.component';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { CursoDetalleComponent } from './curso-detalle/curso-detalle.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CursosComponent,
    AbmCursosComponent,
    CursoDetalleComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    DirectivesModule,
    MatCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: CursosComponent
      },
      {
        path: ':id',
        component: CursoDetalleComponent
      }
    ])
    
  ],
  exports: [
    CursosComponent
  ]
})
export class CursosModule { }
