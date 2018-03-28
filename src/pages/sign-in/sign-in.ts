import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, Loading, LoadingController } from 'ionic-angular';
import { UserService } from '../../providers/services/user.service';
import { HomePage } from "../home/home";
import { User } from '../../providers/models/user.model';
@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  account = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    token:''
  };

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public userService: UserService, public loadingCtrl: LoadingController) {
    console.log(this.navCtrl['_views'].length)
    if (localStorage.getItem('token')) {
      this.account = JSON.parse(localStorage.getItem('token'));
    }
  }

  doLogin() {
    localStorage.setItem('token', JSON.stringify(this.account));
    this.userService.signin(this.account).subscribe(response => {
      if (response['auth'] == true) {
        this.userService.setCurrnetUserDetails(response['user']);
        this.account.token = response['token'];
        localStorage.setItem('token', JSON.stringify(this.account));
        this.navCtrl.setRoot(HomePage);
      }
    },
      error => {
        console.log(error);
        let toast = this.toastCtrl.create({
          message: "Username/Password is incorrect",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
  }
  goBack() {
    if (this.navCtrl['_views'].length > 1) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.push("WelcomePage");
    }
  }
}
