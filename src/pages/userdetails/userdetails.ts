import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {GithubUsers} from "../../providers/GithubUsers";
import {User} from "../../models/User";

@Component({
  selector: 'page-userdetails',
  templateUrl: 'userdetails.html'
})
export class UserDetails {


  user: User;
  login: string;


  constructor(public navCtrl: NavController, private navParams: NavParams, private githubUsers: GithubUsers) {
    this.login = navParams.get('login');
    githubUsers.loadDetails(this.login).subscribe(user => {
      this.user = user;
      console.log("Details: ", user);
    })
  }


}
