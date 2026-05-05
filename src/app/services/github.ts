import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Github {
  http = inject(HttpClient);

  obtenerUsuarioGithub(apiGithub: string, usuario: string, signal: WritableSignal<any>){
    const peticion = this.http.get<any>(apiGithub + usuario);

    const suscripcion = peticion.subscribe((data) => {
      if(data)
      {
        signal.set(data);
      }

      suscripcion.unsubscribe();
    }); 
  }
}
