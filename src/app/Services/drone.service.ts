import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { map, Observable } from 'rxjs';

import { Drone } from '../dto/drone.dto';

@Injectable({
  providedIn: 'root'
})
export class DroneService {

  dronesCollection: AngularFirestoreCollection<Drone>;
  drones: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    // this.drones = this.afs.collection('drones').snapshotChanges();


    this.dronesCollection = this.afs.collection('drones');

    // this.users = this.afs.collection('users').valueChanges();
    this.drones = this.dronesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Drone;
        data.id = a.payload.doc.id;
        return data;
      })
    }));

   }

   getDrones(){
     return this.drones;
   }

}
