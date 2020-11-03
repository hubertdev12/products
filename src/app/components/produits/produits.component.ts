import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  listProduit;
  public size: number = 5;
  public currentPage: number = 0;
  public totalPage: number;
  public pages: Array<number>;
  public currentKeyword: string="";

  constructor(private catalogueService: CatalogueService, private router: Router) { }

  ngOnInit(): void {
    this.onGetProduit();
  }

  // afficher les produits
  onGetProduit(){
    // this.onPageProduct(this.currentPage);
    this.catalogueService.getProduits(this.currentPage, this.size)
    .subscribe(data => {
      this.listProduit = data;
      this.totalPage = data.page.totalPages; // recuperer le nombre total des pages
      this.pages = new Array<number>(this.totalPage); // l'affecter dans un tableau
    }, err => {
      console.error('erreur', err);
    });
  }

  // afficher la page courrante à l'index i
  onPageProduct(i){
    this.currentPage = i;
    this.chercherProduit();
    // this.onGetProduit(); // recharger les produits
  }

  onChercher(ref: any){
    this.currentPage = 0;
    this.currentKeyword = ref.keyword; // recuperer le mot en cours
    this.chercherProduit();
  }

  // rechercher un produit par mot clé
  chercherProduit(){
    this.catalogueService.getProduitByKeyword(this.currentKeyword, this.currentPage, this.size)
    .subscribe(data => {
      this.listProduit = data;
      this.totalPage = data.page.totalPages; // recuperer le nombre total des pages
      this.pages = new Array<number>(this.totalPage); // l'affecter dans un tableau
    }, err => {
      console.log('erreur', err);
    });
  }

  // supprimer un produit
  onDeleteProduct(id: number){
    let conf = confirm("Etes vous sûr ?");
    if(conf){
      // console.log(p);
      this.catalogueService.deleteProduct(id)
        .subscribe(data => {
          this.chercherProduit();
          // this.listProduit = data;
        },
        err => {
          console.log('Erreur', err);
        }
      );
    }
  }

  // editer un produit
  onEditProduct(id: number){
    this.router.navigateByUrl('/produits/edit-product/' + id);
  }
}
