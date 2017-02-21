import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {Home} from "../pages/home/home";
import {About} from "../pages/about/about";
import {Check} from "../pages/check/check";
import {Settings} from "../pages/settings/settings";
import {UserDetails} from "../pages/userdetails/userdetails";
import {GithubUsers} from "../providers/GithubUsers";
import {Add} from "../pages/add/add";


@NgModule({
  declarations: [
    MyApp,
    Home,
    About,
    Check,
    Settings,
    UserDetails,
    Add
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    About,
    Check,
    Settings,
    UserDetails,
    Add
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, GithubUsers]
})
export class AppModule {
}
