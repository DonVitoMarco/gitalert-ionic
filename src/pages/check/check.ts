import {Component} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import {GithubUsers} from "../../providers/GithubUsers";
import {User} from "../../models/User";
import {UserDetails} from "../userdetails/userdetails";

@Component({
  selector: 'page-check',
  templateUrl: 'check.html'
})
export class Check {


  users: User[];
  originalUsers: User[];
  usernameList: Array<string>;


  constructor(public navCtrl: NavController, private githubUsers: GithubUsers, private platform: Platform) {
    this.usernameList = JSON.parse(localStorage.getItem("usernameList"));
    if (!this.usernameList) {
      this.usernameList = [];
    }

    githubUsers.load().subscribe(users => {
      this.users = users;
      this.originalUsers = users;
    });
  }


  goToDetails(login: string) {
    this.addUsername(login);
    this.navCtrl.push(UserDetails, {login});
  }


  search(searchEvent) {
    let term = searchEvent.target.value;
    console.log(term);
    if (term.trim() === '' || term.trim().length < 3) {
      this.users = this.originalUsers;
    } else {
      this.githubUsers.searchUsers(term).subscribe(users => {
        this.users = users;
      })
    }
  }


  addUsername(login: string) {
    this.usernameList.push(login);
    localStorage.setItem("usernameList", JSON.stringify(this.usernameList));
    console.log("usernameList after add: ", this.usernameList);
  }


}
