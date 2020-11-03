import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/model/Produit';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent implements OnInit {

  private produit: Produit;
  public currentProduct: Produit;
  public id: number;
  // public mode: number = 1;

  constructor(private catalogueService: CatalogueService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductUpdate();
  }

  // recuperation du produit à mettre à jour
  getProductUpdate(){
    this.id = this.activatedRouter.snapshot.params.id;
    this.catalogueService.getIdProduct(this.id)
      .subscribe(data => {
        this.currentProduct = data;
      },
      err => {
        console.log('erreur', err);
      });
  }

  // enregistrement de la mise à jour du produit
  onUpdateProduct(refNewP){
    this.catalogueService.updateProduct(this.id, refNewP)
      .subscribe(data => {
        // this.mode=2;
        console.log(data);
        this.router.navigateByUrl('/produits');
      },
      err => {
        console.log('erreur', err);
      });
  }

  // onRetourNewProduct(){
  //   this.mode = 1;
  // }

  // // enregistrement du produit editer
  // public saveProductEdit(){
  //   return this.catalogueService.edit(this.produit, this.produit.id)
  //     .subscribe(resp => {
  //       console.log(resp);
  //     },
  //     err => {
  //       console.log('erreur', err);
  //     });
  // }

}
