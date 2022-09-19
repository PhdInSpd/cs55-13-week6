// filesystem
import fs from 'fs';
// path
import path from 'path';

const _dataDir = path.join( 
                          // return cwd for node.js
                          process.cwd(),'data'
                          );
// console.log( _dataDir );
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {
  const filePath = path.join( _dataDir, 'juan-gabriel-rancheras.json' );
  const jsonData = fs.readFileSync( filePath, "utf8");
  const jsonObj = JSON.parse( jsonData );
  // alphabetize based on song
  jsonObj.rancheras.sort( 
    function(a,b) {
      return a.song.localeCompare( b.song );
    });
  // console.log( jsonObj.rancheras );

  res.status(200).json( jsonObj );
//     {
//       collection:[
//         { name: 'John Doe' },
//         { name: 'Jose Alfredo' },
//         { name: 'El Chopo' }
//       ]
//     }
//     )
}
