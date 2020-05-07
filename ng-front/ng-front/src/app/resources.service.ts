import { Injectable } from "@angular/core";

const GITHUB_PROFILE_URL = "https://github.com/curtisnewbie";
const LINKEDIN_URL = "https://www.linkedin.com/in/yongjie-zhuang/";
const INTRODUCTION = [
  "A noob backend developer trying to learn as much as possible.",
  "I use Java, JavaScript, TypeScript, SQL and very little C :D",
];
/**
 * Class that stores the constant values (resources)
 */
@Injectable({
  providedIn: "root",
})
export class ResourcesService {
  constructor() {}

  /**
   * Get the url of the github profile
   */
  getGithubUrl(): string {
    return GITHUB_PROFILE_URL;
  }

  /**
   * Get the url of the linkedin profile
   */
  getLinkedInUrl(): string {
    return LINKEDIN_URL;
  }

  /**
   * Get a list of paragraphs which make up of an introduction
   */
  getIntroduction(): string[] {
    return INTRODUCTION;
  }
}
