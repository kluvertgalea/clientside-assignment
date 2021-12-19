import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  constructor(private firebaseAuth: AngularFireAuth) { }

  async signin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
      location.reload();
    });
  }

  logout(){
    this.isLoggedIn = false;
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  getLoggedIn(){
    return this.isLoggedIn;
  }
}

