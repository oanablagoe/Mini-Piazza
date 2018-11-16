import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { PostService } from '../post.service';
import {Post} from '../post.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  id: number;
  editMode = false;
  postForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    const newPost = new Post(
      this.postForm.value['title'],
      this.postForm.value['description'],
      firebase.auth().currentUser.email,
      new Date().toDateString());
    if (this.editMode) {
      this.postService.updatePost(this.id, this.postForm.value);
    } else {
      this.postService.addPost(newPost);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let postTitle = '';
    let postDescription = '';

    if (this.editMode) {
      const recipe = this.postService.getPost(this.id);
      postTitle = recipe.title;
      postDescription = recipe.description;

    }

    this.postForm = new FormGroup({
      'title': new FormControl(postTitle, Validators.required),
      'description': new FormControl(postDescription, Validators.required),
    });
  }

}
