import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cartao } from 'src/app/models/Cartao';
import { Categoria } from 'src/app/models/Categoria';
import { Mes } from 'src/app/models/Mes';
import { CartoesService } from 'src/app/services/cartoes.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { DespesasService } from 'src/app/services/despesas.service';
import { MesService } from 'src/app/services/mes.service';

@Component({
  selector: 'app-nova-despesa',
  templateUrl: './nova-despesa.component.html',
  //styleUrls: ['./nova-despesa.component.css']
  styleUrls: ['../listagem-despesas/listagem-despesas.component.css']

})
export class NovaDespesaComponent implements OnInit {

  formulario: any;
  cartoes: Cartao[];
  categorias: Categoria[];
  meses: Mes[];
  usuarioId: string = localStorage.getItem('UsuarioId');
  erros: string[];
 
  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private despesasService: DespesasService,
              private cartoesService: CartoesService,
              private categoriasService: CategoriasService,
              private mesesService: MesService) { }

  ngOnInit(): void {
    this.erros = [];
    
    this.cartoesService.PegarCartoesPeloUsuarioId(this.usuarioId).subscribe(resultado => {
      this.cartoes = resultado;
    });

    this.categoriasService.FiltrarCategoriasDespesas().subscribe(resultado => {
      this.categorias = resultado;
    });

    this.mesesService.PegarTodos().subscribe(resultado => {
      this.meses = resultado;
    });

    this.formulario = new FormGroup({
      cartaoId: new FormControl(null, [Validators.required]),
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

  VoltarListagem(): void{
    this.router.navigate(['/despesas/listagemdespesas']);
  }

  EnviarFormulario(): void{
    const despesa = this.formulario.value;

    this.despesasService.NovaDespesa(despesa).subscribe(resultado => {
      this.router.navigate(['/despesas/listagemdespesas']);
      this.snackBar.open(resultado.mensagem, null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    },
    err => {
      if(err.status === 400){
        for(const campo in err.error.errors){
          if(err.error.errors.hasOwnProperty(campo))
          {
            this.erros.push(err.error.errors[campo]);
          }
        }
      }
    });
  }

}
