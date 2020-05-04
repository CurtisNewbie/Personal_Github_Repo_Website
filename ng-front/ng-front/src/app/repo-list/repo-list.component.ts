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

  ngOnInit() {}

  /**
   * Check whether the repository is active by checking the date. If the repo is updated
   * within a month, it's still active.
   *
   * @param date
   */
  isActive(date: Date): boolean {
    let now = new Date();
    if (
      date.getUTCFullYear() == now.getUTCFullYear() &&
      (date.getUTCMonth() == now.getUTCMonth() ||
        now.getTime() - date.getTime() < MONTH_IN_MILISEC)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
