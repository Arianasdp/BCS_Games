import { Component, inject, signal } from '@angular/core';
import { Github } from '../../services/github';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sobre-mi',
  imports: [RouterModule],
  templateUrl: './sobre-mi.html',
  styleUrl: './sobre-mi.css',
})
export class SobreMi {
  githubService = inject(Github);
  usuario = "Arianasdp";
  apiGithub = "https://api.github.com/users/";
  usuarioGit = signal<any | null>(null);

  ngOnInit(){
    this.githubService.obtenerUsuarioGithub(this.apiGithub, this.usuario, this.usuarioGit);
  }

  traerUsuario(){
    console.log(this.usuarioGit());
  }
}
