
//var admin = require("firebase-admin");
// used to load firebase project
import admin from "firebase-admin";

//var serviceAccount = require("path/to/serviceAccountKey.json");

const serviceAccount = JSON.parse(
        process.env.NEXT_PUBLIC_FIREBASE_PRIVATEKEY
    );

try {  
    admin.initializeApp(
      {
        credential: admin.credential.cert( serviceAccount ),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
      }
    );
} catch( err ) {
    console.error( "firebase err", err.stack)
}

export default admin.firestore();
