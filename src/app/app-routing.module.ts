import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './posts/post.component';
import { UserListComponent } from './user-list/user-list.component';
import { PostStartComponent } from './posts/post-start/post-start.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', component: PostComponent, children: [
    { path: '', component: PostStartComponent },
    { path: 'new', component: NewPostComponent, canActivate: [AuthGuard] },
    { path: ':id', component: PostDetailComponent, canActivate: [AuthGuard] },
  ] },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
