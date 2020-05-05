import { Component, OnInit } from "@angular/core";
import { Repository, toRepository } from "../Repository";
import { HttpService } from "../http.service";

// 30 days in milisec
const MONTH_IN_MILISEC = 1000 * 60 * 60 * 24 * 30;

@Component({
  selector: "app-repo-list",
  templateUrl: "./repo-list.component.html",
  styleUrls: ["./repo-list.component.css"],
})
export class RepoListComponent implements OnInit {
  // TODO: fix mock data
  repos: Repository[] = [];

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.fetchRepos();
  }

  private fetchRepos(): void {
    this.http.getAllRepos().subscribe({
      next: (val) => {
        let repos: Repository[] = [];
        for (let r of val) {
          let repo = toRepository(r);
          this.setUpdatedTimeStr(repo);
          this.setIsActive(repo);
          repos.push(repo);
        }
        this.sortRepos(repos);
        this.repos = repos;
      },
      error: (e) => console.log,
    });
  }

  /**
   * Sort the repositories based on their activeness and their updated time
   */
  private sortRepos(repos: Repository[]): void {
    repos.sort((a, b) => {
      return (a.isActive && b.isActive) || (!a.isActive && !b.isActive)
        ? b.updated_at.getTime() - a.updated_at.getTime()
        : a.isActive && !b.isActive
        ? -1
        : 1;
    });
  }

  /**
   * Set whether the repository is active (I.e., set the property: Repository#isActive)
   */
  private setIsActive(r: Repository): void {
    let now = new Date();
    let prev = r.updated_at;
    // same year, same month or within 30 days
    if (
      prev.getFullYear() == now.getFullYear() &&
      (prev.getMonth() == now.getMonth() ||
        (now.getMonth() - prev.getMonth() == 1 &&
          this.getNumOfDays(prev, now) < 30))
    ) {
      r.isActive = true;
    } else {
      r.isActive = false;
    }
  }

  /**
   * Get the number of days between the two Date.
   * This method only works when the two month are right next to each other.
   * E.g., Mar and Feb are fine, but Mar and Apr are not.
   *
   */
  private getNumOfDays(before: Date, after: Date): number {
    return (
      new Date(before.getFullYear(), before.getMonth() + 1, 0).getDate() -
      before.getDate() +
      after.getDate()
    );
  }
  /**
   * Set up Repository.updatedTime to display how long has the repository been udpated.
   * E.g., 'Updated 2 days ago'.
   * @param repos
   */
  private setUpdatedTimeStr(r: Repository): void {
    let now = new Date();
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
        if (prev.getMonth() == now.getMonth() - 1) {
          numOfDays =
            new Date(prev.getFullYear(), prev.getMonth() + 1, 0).getDate() -
            prev.getDate() +
            now.getDate();
        }
        if (numOfDays == null || numOfDays >= 30)
          month = now.getMonth() - prev.getMonth();
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
