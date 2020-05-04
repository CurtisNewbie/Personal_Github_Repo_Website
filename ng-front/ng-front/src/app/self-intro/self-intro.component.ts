import { Component, OnInit, AfterViewInit } from "@angular/core";
import { HttpService } from "../http.service";

const ANIMATION_CHAR_INTERVAL = 50;
const ANIMATION_INTERVAL = 5000;

@Component({
  selector: "app-self-intro",
  templateUrl: "./self-intro.component.html",
  styleUrls: ["./self-intro.component.css"],
})
export class SelfIntroComponent implements OnInit, AfterViewInit {
  githubUrl: string = this.http.getGithubUrl();
  introTxt = this.http.getIntroduction();
  intro: string[] = [];

  constructor(private http: HttpService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.introTypingAnim(ANIMATION_INTERVAL, ANIMATION_CHAR_INTERVAL);
  }

  /**
   * Start typing animation for introduction. When current animation finishes, it will wait for a moment
   * and repeat again.
   *
   * @param animInterval interval for the whole animation
   * @param charInterval interval for each character (i.e., how fast each character is typed)
   */
  private introTypingAnim(animInterval: number, charInterval: number): void {
    if (this.introTxt.length > 0) {
      const typingHandler = () => {
        if (charIndex < this.introTxt[paraIndex].length) {
          this.intro[paraIndex] += this.introTxt[paraIndex].charAt(charIndex++);
        }
        if (charIndex < this.introTxt[paraIndex].length) {
          setTimeout(typingHandler, charInterval);
        } else if (paraIndex < numOfPara - 1) {
          this.intro[++paraIndex] = "";
          charIndex = 0;
          setTimeout(typingHandler, charInterval);
        } else {
          // reset animation, and do it again
          setTimeout(() => {
            this.intro = [];
            this.introTypingAnim(animInterval, charInterval);
          }, 5000);
        }
      };
      let numOfPara = this.introTxt.length;
      let paraIndex = 0;
      let charIndex = 0;
      this.intro[paraIndex] = "";
      setTimeout(typingHandler, charInterval);
    }
  }
}
