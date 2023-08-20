import { Component, OnInit } from '@angular/core';
import { faRotateRight, faTrashCan, faAdd } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from './posts.service';
import { postModel } from './post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

  post: postModel = new postModel();
  posts: Array<any> = new Array();
  selectedPostIndex: number | null = null;

  filterText: string = '';
  filteredPosts: Array<any> = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
      this.fetchPosts();
  }

  fetchPosts(){
    this.selectedPostIndex = null;
    this.postsService.fetchPosts().subscribe(
        posts => {
            this.posts = posts;
            this.applyFilter();
        },
        error => {
            console.log("error fetching posts", error);
        }
    );
  }

  applyFilter() {
    const filteredText = this.filterText.toLowerCase();
    this.filteredPosts = this.posts.filter(post => {
        const userIDMatches = post.user_id.toString().includes(filteredText);
        const titleMatches = post.title.toLowerCase().includes(filteredText);
        
        return (userIDMatches || titleMatches);
    });
  }

  createPost(id: number){
    this.postsService.createPost(id, this.post)
    .subscribe(post => { 
      this.post = new postModel();
      this.fetchPosts();
    }, error => { 
      console.log('error creating post', error);
    });
  }

  updatePost(id: number){
    this.postsService.updatePost(id, this.post)
    .subscribe(post => { 
      this.post = new postModel();
      this.selectedPostIndex = null;
      this.fetchPosts();
    }, error => { 
      console.log('error updating post', error);
    });
  }

  removePost(id: number) {
    if (id === null || id === undefined) {
        console.log("No post ID provided.");
        return;
    }

    if (confirm("Are you sure you want to delete this post?")) {
      this.postsService.deletePost(id)
        .subscribe(() => {
          this.selectedPostIndex = null;
          this.post = new postModel();
          this.fetchPosts(); // Refresh the post list
        }, error => {
          console.log('error deleting post', error);
      });
    }
  }

  selectPost(index: number) {
    this.selectedPostIndex = index;
    this.post = { ...this.posts[index] };
  }

  cancelForm() {
    this.selectedPostIndex = null;
    this.post = new postModel();
  }

  faRotateRight = faRotateRight;
  faTrashCan = faTrashCan;
  faAdd = faAdd;
}