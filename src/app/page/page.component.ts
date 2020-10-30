import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact';
import { NetworkService } from '../shared/network.service';

import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider, AmazonLoginProvider, FacebookLoginProvider, } from "angularx-social-login";
import { IMessage } from '../shared/message';

import * as _ from 'underscore';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss',
    './media-1185.component.scss',
    './media-992.component.scss',
    './media-600.component.scss']
})
export class PageComponent implements OnInit {

  public contacts: Contact[] = [];

  public searchName: string;
  public selectedContact: Contact;

  public allMessage: IMessage[] = [];
  public selectedMessages: IMessage[] = [];
  public myMessage: string = '';

  //Login
  public user: SocialUser;
  public loggedIn: boolean;
  public showLoginPage: boolean = true;

  public userEmail: string = '';
  public userPass: string = '';
  // 

  constructor(public networkService: NetworkService, private authService: SocialAuthService) { }

  ngOnInit(): void {

    let messagesLS = localStorage.getItem("Messages");
    if (messagesLS) {
      this.allMessage = JSON.parse(messagesLS);
    }
    else {
      this.allMessage = this.networkService.defaultMessages;
    }

    this.contacts = this.networkService.getAllContacts();
    this.contacts.forEach(contact => {
      let m = _.sortBy(this.allMessage, a => -a.id)
        .find(msg => msg.receiverId === contact.id || msg.senderId === contact.id);
      this.setContactMessage(contact.id, m?.message, m?.date);
    })

    this.chooseContact(1);

    this.authService.authState.subscribe(user => {
      this.user = user;
    });


    let userLs = localStorage.getItem("User");
    if (userLs) {
      this.user = JSON.parse(userLs);
      this.showLoginPage = false;
    }

    this.sortContactsByLastMessage();
  }
  chooseContact(contactId: number) {
    this.selectedContact = this.contacts.find(i => i.id === contactId);
    this.selectMessages(contactId);
  }

  //Login
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }
  // signInWithAmazon(): void {
  //   this.authService.signIn(AmazonLoginProvider.PROVIDER_ID);
  // }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  login() {
    let loginUser: SocialUser = {

      provider: '',
      id: '',
      email: this.userEmail,
      name: this.userEmail,
      photoUrl: 'assets/img/newUser.png',
      firstName: '',
      lastName: '',
      authToken: '',
      idToken: '',
      authorizationCode: '',
      response: ''
    };
    if (this.userEmail && this.userPass) {
      this.user = loginUser;
      this.loggedIn = true;
      localStorage.setItem("User", JSON.stringify(this.user));
      this.userEmail = '';
      this.userPass = '';
      this.showLoginPage = false;

    }

  }

  signOut(): void {
    this.authService.signOut();
    this.showLoginPage = true;
    localStorage.removeItem("User");
  }
  continueAs() {
    this.loggedIn = true;
    this.showLoginPage = false;

    localStorage.setItem("User", JSON.stringify(this.user))
  }
  //

  //
  setContactMessage(contactId: number, message: string, date: Date) {
    let contact = this.contacts.find(u => u.id === contactId);
    contact.lastMessage = message;
    contact.lastMessageDate = date;
  }
  //sort contacts list by last message date
  sortContactsByLastMessage() {
    this.contacts = _.sortBy(this.contacts, u => -(new Date(u.lastMessageDate || 0)));
  }

  selectMessages(contactId: number) {
    this.selectedMessages = _.filter(
      this.allMessage,
      msg => (msg.senderId === contactId && msg.receiverId === 0) || (msg.senderId === 0 && msg.receiverId === contactId))
      .sort((a, b) => a.id - b.id);
  }

  getMessage(contactId: number) {
    this.networkService.getRandomMessage()
      .subscribe(u => {
        let m: IMessage = {
          id: this.allMessage.length + 1,
          message: u.value,
          date: new Date(),
          receiverId: 0,
          senderId: contactId
        };

        this.allMessage.push(m);

        this.setContactMessage(contactId, m.message, m.date);
        this.selectMessages(contactId);
        this.sortContactsByLastMessage();

        localStorage.setItem("Messages", JSON.stringify(this.allMessage))
      })
  }

  async addMessage(contactId: number) {
    if (!this.myMessage)
      return;

    let m: IMessage = {
      id: this.allMessage.length + 1,
      message: this.myMessage,
      date: new Date(),
      receiverId: contactId,
      senderId: 0
    };

    this.allMessage.push(m);
    this.myMessage = '';

    this.setContactMessage(contactId, m.message, m.date);
    this.selectMessages(contactId);
    this.sortContactsByLastMessage();

    await this.delay(10000);
    this.getMessage(contactId);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
