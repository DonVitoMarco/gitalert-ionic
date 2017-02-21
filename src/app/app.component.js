"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var ionic_native_1 = require("ionic-native");
var page1_1 = require("../pages/page1/page1");
var page2_1 = require("../pages/page2/page2");
var MyApp = (function () {
    function MyApp(platform) {
        this.platform = platform;
        this.rootPage = page1_1.Page1;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Page One', component: page1_1.Page1 },
            { title: 'Page Two', component: page2_1.Page2 }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            ionic_native_1.StatusBar.styleDefault();
            ionic_native_1.Splashscreen.hide();
            var db = new ionic_native_1.SQLite();
            db.openDatabase({
                name: "gitalert.db",
                location: "default"
            }).then(function () {
                db.executeSql("CREATE TABLE IF NOT EXISTS gitalert (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT)", {}).then(function (data) {
                    console.log("TABLE CREATED: ", data);
                }, function (error) {
                    console.error("Unable to execute sql", error);
                });
            }, function (error) {
                console.error("Unable to open database", error);
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        core_1.Component({
            templateUrl: 'app.html'
        })
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
