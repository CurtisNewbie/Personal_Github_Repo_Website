import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SelfIntroComponent } from "./self-intro/self-intro.component";
import { RepoListComponent } from "./repo-list/repo-list.component";
import { FooterComponent } from "./footer/footer.component";
import { CommentComponent } from "./comment/comment.component";

@NgModule({
  declarations: [
    AppComponent,
    SelfIntroComponent,
    RepoListComponent,
    FooterComponent,
    CommentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
