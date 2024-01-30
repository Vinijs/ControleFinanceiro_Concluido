import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria';
import { Mes } from 'src/app/models/Mes';
import { CategoriasService } from 'src/app/services/categorias.service';
import { GanhosService } from 'src/app/services/ganhos.service';
import { MesService } from 'src/app/services/mes.service';

@Component({
  selector: 'app-novo-ganho',
  templateUrl: './novo-ganho.component.html',
  //styleUrls: ['./novo-ganho.component.css']
  styleUrls: ['../listagem-ganhos/listagem-ganhos.component.css']
})
export class NovoGanhoComponent implements OnInit {

  formulario: any;
  categorias: Categoria[];
  meses: Mes[];
  usuarioId: string = localStorage.getItem("UsuarioId");
  erros: string[];

  
  constructor(private router: Router,
              private ganhosService: GanhosService,
              private categoriasService: CategoriasService,
              private mesesService: MesService,
              private snackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
    this.erros = [];

    this.categoriasService.FiltrarCategoriasGanhos().subscribe(resultado => {
      this.categorias = resultado;
    });

    this.mesesService.PegarTodos().subscribe(resultado => {
      this.meses = resultado;
    });

    this.formulario = new FormGroup({
      descricao: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      categoriaId: new FormControl(null, [Validators.required]),
      valor: new FormControl(null, [Validators.required]),
      dia: new FormControl(null, [Validators.required]),
      mesId: new FormControl(null, [Validators.required]),
      ano: new FormControl(null, [Validators.required]),
      usuarioId: new FormControl(this.usuarioId)
    });
  }

  get propriedade(){
    return this.formulario.controls;
  }

  EnviarFormulario() : void{
    const ganho = this.formulario.value;
    this.ganhosService.NovoGanho(ganho).subscribe(resultado => {
      this.router.navigate(['/ganhos/listagemganhos']);
      this.snackBar.open(resultado.mensagem, null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    },
    err => {
      if(err.status === 400){
        for(const campo in err.error.errors){
          if(err.error.errors.hasOwnProperty(campo)){
            this.erros.push(err.error.errors[campo]);
          }
        }
      }
    });
  }

  VoltarListagem(): void{
    this.router.navigate(['/ganhos/listagemganhos']);
  }

}
