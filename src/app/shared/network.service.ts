import { IMessage } from './message';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RandomMessage } from './randomMessage';


@Injectable({
  providedIn: 'root'
})

export class NetworkService {
  public getAllContacts = () => [
    {
      id: 1,
      name: 'Alice Freeman',
      image: '../../assets/img/img1.png',
      lastMessageDate: new Date(),
      lastMessage: ''
    },
    {
      id: 2,
      name: 'Anna',
      image: '../../assets/img/img2.png',
      lastMessageDate: new Date(),
      lastMessage: ''
    },
    {
      id: 3,
      name: 'Johnny',
      image: '../../assets/img/img3.png',
      lastMessageDate: new Date(),
      lastMessage: ''
    },
    {
      id: 4,
      name: 'Charlie Chaplin',
      image: '../../assets/img/img4.png',
      lastMessageDate: new Date(),
      lastMessage: ''
    },
    {
      id: 5,
      name: 'Betty',
      image: '../../assets/img/img5.png',
      lastMessageDate: new Date(),
      lastMessage: ''
    },
    {
      id: 6,
      name: 'Christy',
      image: '../../assets/img/img6.png',
      lastMessageDate: new Date(),
      lastMessage: ''
    },
    {
      id: 7,
      name: 'Elroy Smith',
      image: '../../assets/img/img7.png',
      lastMessageDate: new Date(),
      lastMessage: ''
    },
    {
      id: 8,
      name: 'Hanna',
      image: '../../assets/img/img8.png',
      lastMessageDate: new Date(),
      lastMessage: ''
    },
    {
      id: 9,
      name: 'Bill',
      image: '../../assets/img/img9.png',
      lastMessageDate: new Date(),
      lastMessage: ''
    },
    {
      id: 10,
      name: 'Harley Quinn',
      image: '../../assets/img/img10.png',
      lastMessageDate: new Date(),
      lastMessage: ''
    }
  ];
  public defaultMessages: IMessage[] = [
    {
      id: 0,
      message: 'Hello',
      date: new Date(),
      receiverId: 1,
      senderId: 0
    },
    {
      id: 1,
      message: 'Hello amigo',
      date: new Date(),
      receiverId: 0,
      senderId: 1
    },
    {
      id: 3,
      message: 'If you look in Chuck Norris eyes their is no dought you will explode',
      date: new Date(),
      receiverId: 0,
      senderId: 7
    },
    {
      id: 4,
      message: 'Chuck Norris pooed in the petri dish and Chuck Norris petrified the batlisk',
      date: new Date(),
      receiverId: 0,
      senderId: 3
    },
    {
      id: 5,
      message: 'Hi',
      date: new Date(),
      receiverId: 0,
      senderId: 8
    },
    {
      id: 6,
      message: 'Buona sera',
      date: new Date(),
      receiverId: 8,
      senderId: 0
    },
    {
      id: 7,
      message: 'Why is Chuck Norris living with us and not in other galaxy? he likes fresh meat',
      date: new Date(),
      receiverId: 0,
      senderId: 8
    },
    {
      id: 8,
      message: 'Chuck Norris can make gold from bear shit',
      date: new Date(),
      receiverId: 6,
      senderId: 0
    },
    {
      id: 9,
      message: 'Hello',
      date: new Date(),
      receiverId: 0,
      senderId: 6
    },
    {
      id: 10,
      message: 'Chuck Norris Invented Cars so that you can get away from Chuck Norris..... Too bad that cars arent fast enough...us',
      date: new Date(),
      receiverId: 4,
      senderId: 0
    }
  ]



  constructor(private http: HttpClient) { }

  getRandomMessage(): Observable<RandomMessage> {
    return this.http.get<RandomMessage>('https://api.chucknorris.io/jokes/random')

  }

}
