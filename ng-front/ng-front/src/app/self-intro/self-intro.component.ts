import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ResourcesService } from "../resources.service";

const ANIMATION_CHAR_INTERVAL = 50;
const ANIMATION_PARAGRAPH_INTERVAL = 1200;
const ANIMATION_INTERVAL = 5000;

@Component({
  selector: "app-self-intro",
  templateUrl: "./self-intro.component.html",
  styleUrls: ["./self-intro.component.css"],
})
export class SelfIntroComponent implements OnInit, AfterViewInit {
  githubUrl: string = this.resources.getGithubUrl();
  introTxt = this.resources.getIntroduction();
  intro: string[] = [];

  constructor(private resources: ResourcesService) {}

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
          // next paragraph
          this.intro[++paraIndex] = "";
          charIndex = 0;
          setTimeout(() => {
            setTimeout(typingHandler, charInterval);
          }, ANIMATION_PARAGRAPH_INTERVAL);
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
