import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { GanhosService } from 'src/app/services/ganhos.service';

@Component({
  selector: 'app-listagem-ganhos',
  templateUrl: './listagem-ganhos.component.html',
  styleUrls: ['./listagem-ganhos.component.css']
})
export class ListagemGanhosComponent implements OnInit {

  ganhos = new MatTableDataSource<any>();
  displayedColumns: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');
  autoCompleteInput = new FormControl();
  opcoesCategorias: string[] = [];
  nomesCategorias: Observable<string[]>;

@ViewChild(MatPaginator, {static: true})
paginator: MatPaginator;

@ViewChild(MatSort, {static: true})
sort: MatSort;
  
  constructor(private ganhosService: GanhosService, 
              private dialog: MatDialog) { }


  ngOnInit(): void {
    this.ganhosService.PegarGanhosPeloUsuarioId(this.usuarioId).subscribe(resultado => {
      resultado.forEach(ganho => {
        this.opcoesCategorias.push(ganho.categoria.nome);
      });
      this.ganhos.data = resultado;
      this.ganhos.paginator = this.paginator;
      this.ganhos.sort = this.sort;
    });

    this.displayedColumns = this.ExibirColunas();

    this.nomesCategorias = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(nome => this.FiltrarCategorias(nome)));

  }

  ExibirColunas(): string[]{
    return ['descricao', 'categoria', 'valor', 'data', 'acoes'];
  }

  FiltrarCategorias(nomeCategoria: string): string[]{
    if(nomeCategoria.trim().length >= 4){
      this.ganhosService.FiltrarGanhos(nomeCategoria.toLocaleLowerCase()).subscribe(resultado => {
        this.ganhos.data = resultado;
      });
    }
    else{
      if(nomeCategoria === ''){
        this.ganhosService.PegarGanhosPeloUsuarioId(this.usuarioId).subscribe(resultado => {
          this.ganhos.data = resultado;
        });
      }
    }

    return this.opcoesCategorias.filter(nome => nome.toLocaleLowerCase().includes(nomeCategoria.toLocaleLowerCase()));
  }

  AbrirDialog(ganhoId: any, valor: any): void{
    this.dialog.open(DialogExclusaoGanhosComponent,{
      data: {
        ganhoId: ganhoId,
        valor: valor
      },
    })
    .afterClosed().subscribe(resultado => {
      if(resultado === true){
        this.ganhosService.PegarGanhosPeloUsuarioId(this.usuarioId).subscribe(registros => {
          this.ganhos.data = registros;
          this.ganhos.paginator = this.paginator;
        });
        this.displayedColumns = this.ExibirColunas();
      }
    });
  }

}

@Component({
  selector: 'app-dialog-exclusao-ganhos',
  templateUrl: 'dialog-exclusao-ganhos.html'
})
export class DialogExclusaoGanhosComponent {
  constructor(@Inject (MAT_DIALOG_DATA) public data: any,
  private ganhosService: GanhosService,
  private snackBar: MatSnackBar
  ){}

  ExcluirGanho(ganhoId: any) : void{
    this.ganhosService.ExcluirGanho(ganhoId).subscribe(resultado => {
      this.snackBar.open(resultado.mensagem, null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });
  }
}
