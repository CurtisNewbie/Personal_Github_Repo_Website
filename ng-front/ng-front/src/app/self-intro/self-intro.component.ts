import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-self-intro",
  templateUrl: "./self-intro.component.html",
  styleUrls: ["./self-intro.component.css"],
})
export class SelfIntroComponent implements OnInit {
  githubUrl: string = this.http.getGithubUrl();

  constructor(private http: HttpService) {}

  ngOnInit() {}
}
