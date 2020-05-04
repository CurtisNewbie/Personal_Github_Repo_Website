import { Component, OnInit } from "@angular/core";
import { Repository } from "../Repository";
import { DEMO_DATA } from "../demodata";

// 30 days in milisec
const MONTH_IN_MILISEC = 1000 * 60 * 60 * 24 * 30;

@Component({
  selector: "app-repo-list",
  templateUrl: "./repo-list.component.html",
  styleUrls: ["./repo-list.component.css"],
})
export class RepoListComponent implements OnInit {
  // TODO: fix mock data
  repos: Repository[] = DEMO_DATA;

  constructor() {}

  ngOnInit() {
    this.setIsActive();
  }

  /**
   * TODO: this should be fixed.
   */
  setIsActive() {
    let now = new Date();
    for (let r of this.repos) {
      let date = r.updated_at;
      if (
        date.getUTCFullYear() == now.getUTCFullYear() &&
        (date.getUTCMonth() == now.getUTCMonth() ||
          now.getTime() - date.getTime() < MONTH_IN_MILISEC)
      ) {
        r.isActive = true;
      } else {
        r.isActive = false;
      }
    }
  }
}
