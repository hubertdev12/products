import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/model/Produit';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-new-produit',
  templateUrl: './new-produit.component.html',
  styleUrls: ['./new-produit.component.css']
})
export class NewProduitComponent implements OnInit {

  public currentProduct: Produit;
  public mode: number = 1;

  constructor(private catalogueService: CatalogueService) { }

  ngOnInit(): void {
  }
  onAddNewProduct(refNewP: any){
    // console.log(refNewP);
    this.catalogueService.saveProduct(this.catalogueService.host + '/', refNewP)
      .subscribe(data => {
        console.log(data);
        this.currentProduct = data;
        this.mode = 2;
      },
      err => {
        console.log('erreur', err);
      });
  }

  onCancel(){

  }

  onRetourNewProduct(){
    this.mode = 1;
  }
}
