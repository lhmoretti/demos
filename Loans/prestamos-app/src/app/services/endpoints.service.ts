import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class EndpointsService {
  public UrlRest = "http://localhost:8080/api/v1";

  constructor() {}
}
