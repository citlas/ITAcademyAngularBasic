import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;//add a variable to store user data:
  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {//inject the Firebase authentication service and the router via the service's constructor
  this.afAuth.authState.subscribe(user => {//we subscribe to the authentication state; if the user is logged in, we add the user's data to the browser's local storage; otherwise we store a null user
    if (user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(this.user));
    } else {
      localStorage.setItem('user', null);
    }
  })
   }

   //add the login() method that will be used to login users with email and password
   async  login(email:  string, password:  string) {

    try {
        await  this.afAuth.auth.signInWithEmailAndPassword(email, password)
        this.router.navigate(['admin/list']);
    } catch (e) {
        alert("Error!"  +  e.message);
    }
    }

    //add logout method
    async logout(){
      await this.afAuth.auth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['admin/login']);
  }

  //add the isLoggedIn() property to check if the user is logged in:

get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return  user  !==  null;
}
}
