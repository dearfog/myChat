import { User } from './../providers/models/user.model';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../providers/services/user.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public currentUser :User;
  public isLogin:Boolean=false;
  rootPage: any;
  public subscription:Subscription;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public userService:UserService, public toastCtrl:ToastController, public menu: MenuController) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage }
    ];
    this.subscription = this.userService.getCurrentUser().subscribe(res=>{
      console.log(res);
      if (res) {
        this.currentUser = res;
        this.menu.enable(true);
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    var data = JSON.parse(localStorage.getItem('token'));
    if (localStorage.getItem('token') && data['token']) {
       this.userService.verify(data.token).subscribe(res=>{
        if (res['auth'] == false) {
          this.rootPage ="WelcomePage";
          this.menu.enable(false);
        }
        else{
          this.rootPage = HomePage;
          this.menu.enable(true);
        }
       },error=>{
        this.menu.enable(false);
        console.log(error);
        this.rootPage ="WelcomePage";
        let toast = this.toastCtrl.create({
          message: "Your Session has Expired, Sign In again !!",
          duration: 3000,
          position: 'top'
        });
        toast.present();
       })
    }
    else{
      this.rootPage ="WelcomePage";
    }
  }
  ionViewWillUnload(){
    this.subscription.unsubscribe();
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
  logout(){
    this.menu.enable(false);
    this.nav.setRoot('WelcomePage');
    localStorage.clear();
  }
}
