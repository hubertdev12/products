import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../model/Produit';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host = 'http://localhost:8080/produits';
  private headers: HttpHeaders;
  private options: object;

  constructor(private httpClient: HttpClient) { }

  // service pour afficher les produits
  public getProduits(pages: number, size: number): Observable<any>{
    return this.httpClient.get(this.host + '?page=' + pages + '&size=' + size);
  }

  // service pour afficher les produits par mot clé
  public getProduitByKeyword(mc: string, pages: number, size: number): Observable<any>{
    return this.httpClient.get(this.host + '/search/pagedesignation?mc=' + mc + '&page=' + pages + '&size=' + size);
  }

  // delete
  public deleteProduct(id: number): Observable<any>{
    return this.httpClient.delete(this.host + '/' + id);
  }

  // save new product
  public saveProduct(url, data: Produit): Observable<any>{
    return this.httpClient.post(url, data);
  }

  // get id du produit
  public getIdProduct(id): Observable<any>{
    return this.httpClient.get(this.host + '/' + id);
  }

  // update du produit éditer
  public updateProduct(id, data){
    return this.httpClient.put(this.host + '/' + id, data);
  }

  // editer un produit
  public edit(id: number, p: Produit): Observable<any>{
    const o: Object = {
      designation: {
        designation: p.designation
      },
      prix: {
        prix: p.prix
      },
      quantite: {
        quantite: p.quantite
      }
    };
    return this.httpClient.put(this.host + '/' + id, o);
  }
}
