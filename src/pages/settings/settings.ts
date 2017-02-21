import {Component} from '@angular/core';

import {NavController, Platform} from 'ionic-angular';
import {User} from "../../models/User";
import {Add} from "../add/add";


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {


  userList: Array<User>;


  constructor(public navCtrl: NavController, private platform: Platform) { }


  ionViewDidEnter() {
    console.log("Ion View Did Enter - Settings");
    this.userList = JSON.parse(localStorage.getItem("userList"));
    if (!this.userList) {
      this.userList = [];
    }
    console.log("userList: ", this.userList);
  }


  delIndex(index: number) {
    this.userList.splice(index, 1);
    localStorage.setItem("userList", JSON.stringify(this.userList));
    console.log("userList after delete: ", this.userList);
  }


  add() {
    this.navCtrl.push(Add);
    console.log("userList after add: ", this.userList);
  }

}
