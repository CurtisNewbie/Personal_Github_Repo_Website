import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Comment } from "../comment";
import { DEMO_COMMENTS } from "../demodata";

const MAX_MSG_LENGTH = 20;

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"],
})
export class CommentComponent implements OnInit {
  comments: Comment[] = DEMO_COMMENTS;
  replyTo: Comment;
  replyToNotification: string;
  message: string = "";

  @ViewChild("commentSection", { static: false })
  commentSectionRef: ElementRef;

  constructor() {}

  ngOnInit() {}

  /**
   * Set which comment it's replying to
   *
   * @param c comment
   */
  setReplyTo(c: Comment): void {
    this.replyTo = c;
    // truncate if necessary
    let msg =
      this.replyTo.message.length > MAX_MSG_LENGTH
        ? this.replyTo.message.substring(0, MAX_MSG_LENGTH) + "..."
        : this.replyTo.message;
    this.replyToNotification = `Replying To: '${msg}'`;
    this.scrollToCommentSection();
  }

  /**
   * Submit comment, which may or may not be a reply
   */
  submit(): void {
    let notif = `Submitted '${this.message}'`;
    if (this.replyTo) {
      notif += ` as a reply to: ${this.replyTo.id}`;
    }
    alert(notif);
    this.message = "";
  }

  /**
   * Scroll to the comment section (for reply)
   */
  private scrollToCommentSection(): void {
    this.commentSectionRef.nativeElement.scrollIntoView();
  }
}
