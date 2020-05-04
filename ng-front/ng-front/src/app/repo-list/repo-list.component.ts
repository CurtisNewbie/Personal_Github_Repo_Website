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
    this.setUpdatedTimeStr(demoRepos);
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

  //TODO: Improve this
  setUpdatedTimeStr(repos: Repository[]) {
    let now = new Date();
    for (let r of repos) {
      let year, month, day, hour, min, sec;
      year = month = day = hour = min = sec = null;
      if (r.updated_at.getFullYear() != now.getFullYear())
        year = now.getFullYear() - r.updated_at.getFullYear();
      else if (r.updated_at.getMonth() != now.getMonth())
        month = now.getMonth() - r.updated_at.getMonth();
      else if (r.updated_at.getDay() != now.getDay())
        day = now.getDay() - r.updated_at.getDay();
      else if (r.updated_at.getHours() != now.getHours())
        hour = now.getHours() - r.updated_at.getHours();
      else if (r.updated_at.getMinutes() != now.getMinutes())
        min = now.getMinutes() - r.updated_at.getMinutes();
      else if (r.updated_at.getSeconds() != now.getSeconds())
        sec = now.getSeconds() - r.updated_at.getSeconds();
      r.updatedTime =
        "Updated " +
        (year ? year + " year" + (year > 1 ? "s " : " ") : "") +
        (month ? month + " month" + (month > 1 ? "s " : " ") : "") +
        (day ? day + " day" + (day > 1 ? "s " : " ") : "") +
        (hour ? hour + " hour" + (hour > 1 ? "s " : " ") : "") +
        (min ? min + " minute" + (min > 1 ? "s " : " ") : "") +
        (sec ? sec + " second" + (sec > 1 ? "s " : " ") : "") +
        "ago";
    }
  }
}
