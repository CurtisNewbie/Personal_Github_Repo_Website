import { Injectable } from "@angular/core";

// TODO: not implemented, mock http service
@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor() {}

  getGithubUrl(): string {
    //TODO: fetch from backend
    let str = "https://github.com/curtisnewbie";
    return str;
  }
}
