import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { HOST } from "src/environments/host";
import { RepoDTO } from "./Repository";
import { CommentDTO, PostCommentDTO } from "./comment";

const BASE_URL = `http://${HOST.hostname}:${HOST.port}/api`;

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
   * Fetch all comments from the backend server
   */
  getAllComments(): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`${BASE_URL}/comments/all`);
  }

  /**
   * POST a new Comment to backend server
   * @param commnet
   */
  postComment(comment: PostCommentDTO): Observable<any> {
    return this.http.post(`${BASE_URL}/comments`, comment);
  }
}
