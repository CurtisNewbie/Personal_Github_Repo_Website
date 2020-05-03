import { Injectable } from "@angular/core";

// TODO: not implemented, mock http service
@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor() {}

  /**
   * Get the url of the github user
   */
  getGithubUrl(): string {
    //TODO: fetch from backend
    let str = "https://github.com/curtisnewbie";
    return str;
  }

  /**
   * Get a list of paragraphs which make up of an introduction
   */
  getIntroduction(): string[] {
    return [
      "A real noob programmer trying to learn as much as possible.",
      "I love programming! :D",
    ];
  }
}
