import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class AuthenService {
  private loggedIn = new BehaviorSubject<boolean>(true); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router
  ) { }

  login(username: string, password: string) {
    if (username !== '' && password !== '') { // {3}
       this.loggedIn.next(true);
       this.router.navigate(['/home']);
      //window.location.reload();
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
