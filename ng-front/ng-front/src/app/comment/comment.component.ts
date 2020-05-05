import { Component, OnInit } from "@angular/core";
import { Comment } from "../comment";
import { DEMO_COMMENTS } from "../demodata";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"],
})
export class CommentComponent implements OnInit {
  comments: Comment[] = DEMO_COMMENTS;
  constructor() {}

  ngOnInit() {}
}
