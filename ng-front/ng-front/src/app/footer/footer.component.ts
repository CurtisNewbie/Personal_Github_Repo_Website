import { Component, OnInit } from "@angular/core";
import { ResourcesService } from "../resources.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  githubUrl = this.resources.getGithubUrl();
  linkedInUrl = this.resources.getLinkedInUrl();

  constructor(private resources: ResourcesService) {}

  ngOnInit() {}
}
