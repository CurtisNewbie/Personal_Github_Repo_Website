import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { HOST } from "src/environments/host";
import { RepoDTO } from "./Repository";

const BASE_URL = `http://${HOST.hostname}:${HOST.port}/api`;

// TODO: not implemented, mock http service
@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch all github repositories from backend server
   */
  getAllRepos(): Observable<RepoDTO[]> {
    return this.http.get<RepoDTO[]>(`${BASE_URL}/github/repo/all`);
  }

  /**
   * Get the url of the github profile
   */
  getGithubUrl(): string {
    //TODO: fetch from backend
    let str = "https://github.com/curtisnewbie";
    return str;
  }

  /**
   * Get the url of the linkedin profile
   */
  getLinkedInUrl(): string {
    return "https://www.linkedin.com/in/yongjie-zhuang/";
  }

  /**
   * Get a list of paragraphs which make up of an introduction
   */
  getIntroduction(): string[] {
    return [
      "A noob backend developer trying to learn as much as possible.",
      "I know Java, JavaScript, TypeScript, and very little C. :D",
    ];
  }
}
