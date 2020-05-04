import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  githubUrl = this.http.getGithubUrl();
  linkedInUrl = this.http.getLinkedInUrl();

  constructor(private http: HttpService) {}

  ngOnInit() {}
}
