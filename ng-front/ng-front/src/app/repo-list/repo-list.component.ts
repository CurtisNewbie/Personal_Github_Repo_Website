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

  /**
   * Set up Repository.updatedTime to display how long has the repository been udpated.
   * E.g., 'Updated 2 days ago'.
   * @param repos
   */
  setUpdatedTimeStr(repos: Repository[]) {
    let now = new Date();
    for (let r of repos) {
      let prev = r.updated_at;
      let year, month, week, day, hour, min, sec;
      if (prev.getFullYear() != now.getFullYear()) {
        year = now.getFullYear() - prev.getFullYear();
      } else if (
        prev.getMonth() != now.getMonth() ||
        prev.getDate() != now.getDate()
      ) {
        let numOfDays = null;
        // set up month
        if (prev.getMonth() != now.getMonth()) {
          numOfDays =
            new Date(prev.getFullYear(), prev.getMonth() + 1, 0).getDate() -
            prev.getDate() +
            now.getDate();
          if (numOfDays >= 30) month = now.getMonth() - prev.getMonth();
        }
        // set up day if month is not set up
        if (month == null) {
          if (numOfDays == null) numOfDays = now.getDate() - prev.getDate();

          if (numOfDays < 7) day = numOfDays;
          else week = (numOfDays / 7).toFixed(0);
        }
      } else if (prev.getHours() != now.getHours()) {
        hour = now.getHours() - prev.getHours();
      } else if (prev.getMinutes() != now.getMinutes()) {
        min = now.getMinutes() - prev.getMinutes();
      } else if (prev.getSeconds() != now.getSeconds()) {
        sec = now.getSeconds() - prev.getSeconds();
      }
      r.updatedTime =
        "Updated " +
        (year ? year + " year" + (year > 1 ? "s " : " ") : "") +
        (month ? month + " month" + (month > 1 ? "s " : " ") : "") +
        (week ? week + " week" + (week > 1 ? "s " : " ") : "") +
        (day ? day + " day" + (day > 1 ? "s " : " ") : "") +
        (hour ? hour + " hour" + (hour > 1 ? "s " : " ") : "") +
        (min ? min + " minute" + (min > 1 ? "s " : " ") : "") +
        (sec ? sec + " second" + (sec > 1 ? "s " : " ") : "") +
        "ago";
    }
  }
}
