import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { User } from '../../providers/models/user.model';
import { UserService } from '../../providers/services/user.service';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  account = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    token:''
  };


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public userService:UserService) {
  }

  doSignup() {
    localStorage.setItem('token', JSON.stringify(this.account));
    this.userService.signup(this.account).subscribe(response => {
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
          message: error.body,
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
