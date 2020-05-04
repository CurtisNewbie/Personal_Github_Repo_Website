import { Component, OnInit, AfterViewInit } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-self-intro",
  templateUrl: "./self-intro.component.html",
  styleUrls: ["./self-intro.component.css"],
})
export class SelfIntroComponent implements OnInit, AfterViewInit {
  githubUrl: string = this.http.getGithubUrl();
  intro: string[] = [];

  constructor(private http: HttpService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    let introTxt = this.http.getIntroduction();
    this.introTypingAnim(introTxt);
  }

  /**
   * Start typing animation for introduction
   */
  private introTypingAnim(txt: string[]): void {
    if (txt.length > 0) {
      const INTERVAL = 55;
      const typingHandler = () => {
        if (charIndex < txt[paraIndex].length) {
          this.intro[paraIndex] += txt[paraIndex].charAt(charIndex++);
        }
        if (charIndex < txt[paraIndex].length) {
          setTimeout(typingHandler, INTERVAL);
        } else if (paraIndex < numOfPara - 1) {
          this.intro[++paraIndex] = "";
          charIndex = 0;
          setTimeout(typingHandler, INTERVAL);
        }
      };
      let numOfPara = txt.length;
      let paraIndex = 0;
      let charIndex = 0;
      this.intro[paraIndex] = "";
      setTimeout(typingHandler, INTERVAL);
    }
  }
}
