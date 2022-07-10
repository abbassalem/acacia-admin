import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FIREBASE_APP_NAME } from '@angular/fire/compat';
import { map, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Image } from '../models/config.model';

@Injectable({
    providedIn: 'root',
    useExisting: FIREBASE_APP_NAME, useValue: 'db'
})

export class ConfigService {

    endpoint = environment;

    nextProductId$: Subject<number> = new Subject<number>();
    nextCategoryId$: Subject<number> = new Subject<number>();

    constructor(private db: AngularFirestore, private http: HttpClient) {
    }

    getConfig(): Observable<any> {
        return this.http.get(this.endpoint + '/config');
    }

    getImages(): Observable<Array<Image>>{
        return this.db.collection('images').get().pipe(
            map( query => query.docs.map(doc => <Image>doc.data()))
        );
    }

    // getNextProductId(catId: number) {
    //     console.log('getNextProductId - catId');
    //     console.dir(catId);
    //     console.log('ConfigService generateProductId');
    //     let ref = this.db.collection('categories', ref => ref.where('id', '==', catId))
    //         .get().subscribe(query => {
    //             const products = query.docs[0].get('products');
    //             if (products) {
    //                 this.nextProductId$.next(products.length + 1);
    //             } else {
    //                 console.log('next productId: <<1>>')
    //                 this.nextCategoryId$.next(1);
    //             }
    //         });
    // }

    // getNextCategoryId() {
    //     let nextCategoryId: number = 0;
    //     console.log('DbService generateCategoryId');
    //     this.db.collection('/categories').get().subscribe(query => {
    //         query.forEach(doc => {
    //             const id = parseInt(doc.id);
    //             if (id > nextCategoryId) {
    //                 nextCategoryId = id;
    //             }
    //         });
    //         console.log('nextCategoryId: ' + nextCategoryId + 1);
    //         this.nextCategoryId$.next(nextCategoryId + 1);
    //     });

    // }

}



