import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { LandingpageService } from "./landingpage.service";
import { Category } from "../interfaces/categories";

@Injectable({ providedIn: 'root' })
export class TitleResolver implements Resolve<Category> {
  constructor(private service: LandingpageService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.service.prueba();
  }
}