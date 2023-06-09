import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { CrearCursoPayload, Curso } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/envoronments';


@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private cursos$ = new BehaviorSubject<Curso[]>([])
  
  constructor(
    private httpClient: HttpClient
  ) { }

  get cursos(): Observable<Curso[]> {
    return this.cursos$.asObservable();
  }

  obtenerCursos(): void {
    // this.cursos$.next(CURSOS_MOCKS);
    // return this.cursos$.asObservable();
    this.httpClient.get<Curso[]>(`${environment.apiBaseUrl}/cursos`)
      .subscribe({
        next: (cursos) => {
          this.cursos$.next(cursos);
        }
      })
  }

  obtenerCursoPorId(id: number): Observable<Curso | undefined> {
    return this.cursos$.asObservable()
      .pipe(
        map((cursos) => cursos.find((c) => c.id === id))
      )
  }

  crearCurso(payload: CrearCursoPayload): Observable<Curso[]> {
    this.cursos$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (cursos) => {
        this.cursos$.next([
          ...cursos,
          {
            id: cursos.length + 1,
            ...payload
          },
        ])
      }
    })
    return this.cursos$.asObservable();
  }

  eliminarCurso(cursoId: number): Observable<Curso[]> {
    this.cursos$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (cursos) => {
        const cursosActualizados = cursos.filter((curso) => curso.id !== cursoId)
        this.cursos$.next(cursosActualizados);
      },
      complete: () => {},
      error: () => {}
    });

    return this.cursos$.asObservable();
  }

  editarCurso(cursoId: number, actualizacion: Partial<Curso>): Observable<Curso[]> {
    this.cursos$
      .pipe(
        take(1),
      )

      .subscribe({
        next: (cursos) => {

          const cursosActualizados = cursos.map((curso) => {
            if (curso.id === cursoId) {
              return {
                ...curso,
                ...actualizacion,
              }
            } else {
              return curso;
            }
          })

          this.cursos$.next(cursosActualizados);
        },
        complete: () => {},
        error: () => {}
      });

    return this.cursos$.asObservable();
  }

}
