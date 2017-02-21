import {Component} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import {About} from "../about/about";
import {Settings} from "../settings/settings";
import {Check} from "../check/check";
import {User} from "../../models/User";
import {GithubUsers} from "../../providers/GithubUsers";
import {UserDetails} from "../userdetails/userdetails";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {


  usernameList: Array<string>;
  userList: Array<User>;
  notifications: Array<string>;


  constructor(public navCtrl: NavController, private platform: Platform, public githubUsers: GithubUsers) {
  }


  ionViewWillEnter() {
    console.log("Ion View Will Enter - Home");
    this.platform.ready().then(() => {
      this.usernameList = JSON.parse(localStorage.getItem("usernameList"));
      if (!this.usernameList) {
        this.usernameList = [];
      }
      console.log("usernameList: ", this.usernameList);

      this.notifications = JSON.parse(localStorage.getItem("notifications"));
      if (!this.notifications) {
        this.notifications = [];
      }
      console.log("notifications: ", this.notifications);

      // this.createNotifications();
    });
  }


  pushPage(page) {
    if (page === 'about') {
      this.navCtrl.push(About);
    }
    if (page === 'settings') {
      this.navCtrl.push(Settings);
    }
    if (page === 'check') {
      this.navCtrl.push(Check);
    }
    if (page === 'home') {
      this.navCtrl.push(Home);
    }
  }


  clearLastSearch() {
    this.usernameList = [];
    localStorage.setItem("usernameList", JSON.stringify(this.usernameList));
    console.log("usernameList after clear: ", this.usernameList);
  }


  clearNotifications() {
    this.notifications = [];
    localStorage.setItem("notifications", JSON.stringify(this.notifications));
    console.log("notifications after clear: ", this.notifications);
  }


  createNotifications() {
    this.userList = JSON.parse(localStorage.getItem("userList"));


    for (let v = 0; v < this.userList.length; v++) {
      let user: User = this.userList[v];
      this.githubUsers.loadDetails(user.login).subscribe((temp) => {
        console.log("TEMP USER", temp);
        console.log("USER", user);

        if (temp.following > user.following) {
          this.notifications.push(temp.login + " following new user");
          localStorage.setItem("notifications", JSON.stringify(this.notifications));
        }
        if (temp.followers > user.followers) {
          this.notifications.push(temp.login + " has new followers");
          localStorage.setItem("notifications", JSON.stringify(this.notifications));
        }
        if (temp.public_repos > user.public_repos) {
          this.notifications.push(temp.login + " created new public repo");
          localStorage.setItem("notifications", JSON.stringify(this.notifications));
        }

        this.userList[v] = temp;
        localStorage.setItem("userList", JSON.stringify(this.userList));
      });

    }

  }


  goToDetails(login: string) {
    this.navCtrl.push(UserDetails, {login});
  }


}
