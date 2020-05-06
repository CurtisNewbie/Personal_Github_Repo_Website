import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Comment, toComments } from "../comment";
import { HttpService } from "../http.service";

const MAX_MSG_LENGTH = 20;

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"],
})
export class CommentComponent implements OnInit {
  comments: Comment[];
  replyTo: Comment;
  replyToNotification: string;
  message: string = "";
  expandedComments: Comment[] = [];

  @ViewChild("commentSection", { static: false })
  commentSectionRef: ElementRef;

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.fetchComments();
  }

  /** Fetch Comments */
  private fetchComments(): void {
    this.http.getAllComments().subscribe({
      next: (val) => {
        this.comments = toComments(val);
      },
      error: (e) => console.log,
    });
  }

  /**
   * This method controls which comments' child comments should be displayed/expanded.
   *
   * 1) If the first comment that is expanded, is clicked again, this method resets
   * all child comments that are expanded.
   *
   * 2) If no comments have been expanded yet, it simply expands the one selected.
   *
   * 3) It only expands comments that are children of the last expanded.
   *
   * 4) If another top level comment is selected to expand, but we already have a set
   * of comments expanded, this method resets all, and choose this new one to expand instead.
   * @param parent
   */
  displayChildComments(parent: Comment) {
    if (
      // hide all if the user is clicking the first comment that is expanded
      this.expandedComments.length > 0 &&
      this.expandedComments[0].id == parent.id
    ) {
      this.expandedComments = [];
    } else if (this.expandedComments.length == 0) {
      // no comment is expanded yet
      this.expandedComments.push(parent);
    } else {
      let prev = this.expandedComments[this.expandedComments.length - 1];
      // hide comments, if this comment was previously expanded
      let lastIndex;
      if ((lastIndex = this.expandedComments.lastIndexOf(parent)) > 0) {
        this.expandedComments = this.expandedComments.slice(0, lastIndex);
      } else {
        // expand it if this comment is the child comment of the last expanded
        for (let c of prev.childComments)
          if (c.id == parent.id) {
            this.expandedComments.push(parent);
            return;
          }

        // this is not a child comment, reset all, if it's another top level comments
        for (let c of this.comments)
          if (c.id == parent.id) {
            this.expandedComments = [];
            this.expandedComments.push(parent);
          }
      }
    }
  }

  /**
   * Return whether the child comments of this parent comment should be displayed/expanded
   * @param parent
   */
  shouldDisplayChildCommentsOf(parent: Comment): boolean {
    let lastIndex = this.expandedComments.lastIndexOf(parent);
    if (lastIndex >= 0) return true;
    return false;
  }

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
    let parentId = this.replyTo ? this.replyTo.id : null;
    this.http
      .sendComment({ message: this.message, parentCommentId: parentId })
      .subscribe({
        error: (e) => {
          console.log;
        },
        complete: () => {
          this.fetchComments();
        },
      });
    this.message = "";
    this.replyTo = null;
  }

  /**
   * Scroll to the comment section (for reply)
   */
  private scrollToCommentSection(): void {
    this.commentSectionRef.nativeElement.scrollIntoView();
  }
}
