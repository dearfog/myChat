import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatService } from '../../providers/services/chat.service';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public message = '';
  public messages = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public chatService:ChatService) {
    this.chatService
    .getMessages()
    .subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
