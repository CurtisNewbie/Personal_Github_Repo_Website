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
  repos: Repository[][] = [];

  constructor() {}

  ngOnInit() {
    let demoRepos = DEMO_DATA;
    console.log(demoRepos.length);
    this.setIsActive(demoRepos);
    // sort the repo based on activeness first and then time second
    demoRepos.sort((a, b) => {
      return (a.isActive && b.isActive) || (!a.isActive && !b.isActive)
        ? b.updated_at.getTime() - a.updated_at.getTime()
        : a.isActive && !b.isActive
        ? -1
        : 1;
    });
    let i = 0;
    let j = 0;
    while (j < demoRepos.length) {
      // three repo for each row
      let temp = [];
      while (j < demoRepos.length && i < 3) {
        temp.push(demoRepos[j++]);
        i++;
      }
      this.repos.push(temp);
      i = 0;
    }
  }

  /**
   * TODO: this should be fixed.
   */
  setIsActive(repos: Repository[]) {
    let now = new Date();
    for (let r of repos) {
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
