import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {User} from "../../models/User";
import {GithubUsers} from "../../providers/GithubUsers";

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class Add {


  userItem: string;
  userList: Array<User>;
  userDownload: User;
  githubApiUrl = 'https://api.github.com';


  constructor(public navCtrl: NavController, public githubUsers: GithubUsers) {
    this.userList = JSON.parse(localStorage.getItem("userList"));
    if (!this.userList) {
      this.userList = [];
    }
    this.userItem = "";
  }


  save() {
    if (this.userItem != "") {
      this.githubUsers.loadDetails(this.userItem).subscribe(user => {
        this.userDownload = user;
        if (this.userDownload.login != null) {
          this.userList.push(this.userDownload);
          localStorage.setItem("userList", JSON.stringify(this.userList));
          console.log("Add track user: ", user);
        } else {
          console.log("User doesn't exist");
        }
        this.navCtrl.pop();
      }, (error) => {
        console.log("Error: " + JSON.stringify(error));
      });
    }
  }


}
