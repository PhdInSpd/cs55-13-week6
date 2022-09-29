import firebase from "../../lib/firebase";

export default async function handler( req, res) {
    try {
        // firestore get every document in the 'resources' collection
        const snapshot = await firebase.collection( 'resources' ).get();

        // collect results in array
        let output = [];

        snapshot.forEach(
            ( doc ) => {
                output.push(
                    {
                        id: doc.id,
                        data: doc.data()
                    }
                );
            }
        );

        console.log( output );

        // return the newly constructed object value of all firestore document data
        res.statusCode = 200;
        res.setHeader( "content-Type", "application/json" );
        res.json( {output} );

    } catch( err ) {
        console.error( err );
        req.status(500).end( err.message );
    }
}