// filesystem
import fs from 'fs';
// path
import path from 'path';

const _dataDir = path.join( 
    // return cwd for node.js
    process.cwd(),'data'
    );

let _union;   
function extractJsonObj( rancheraFile ) {
    const filePath = path.join( _dataDir, rancheraFile );
    const jsonString = fs.readFileSync( filePath, "utf8");
    const jsonObj = JSON.parse( jsonString );
    return jsonObj.rancheras;
}

// get one big array of json data from multiple files.
function getUnion( ) {
    if(_union != undefined) {
        return _union;
    }
    let rancherasArray = [];
    rancherasArray.push( extractJsonObj( 'juan-gabriel-rancheras.json' ) );
    rancherasArray.push( extractJsonObj( 'general-rancheras.json' ) );

    _union = [];
    for(  let arrayIndex=0 ; arrayIndex< rancherasArray.length ; arrayIndex++) {
        for( let i=0; i< rancherasArray[arrayIndex].length; i++) {
            _union.push( rancherasArray[arrayIndex][i]);
        }
    }
    return _union;
}
// function that returns all json objects in array
export function getAllIds() {
    let union = getUnion();
    // console.log( union );
    // extract just id properties
    return union.map( item=> {
        return {
            params:{
                id: item.id.toString()
            }
        }
    });    
}

// returns names and ids for all json objects in array, sorted by song property
export function getSortedList( ) {
    let union = getUnion();
    // alphabetize based on song
    union.sort( 
        function(a,b) {
        return a.song.localeCompare( b.song );
        });
    
    return union.map(
        item => {
            return {
                id: item.id.toString(),
                song: item.song
            }
        });
}

// get the complete data for one ranchera
// used by getStaticProps() in [id].js
export async function getData( idRequest ){
    let union = getUnion();

    // find object with matching id
    let matchObj = union.filter( 
        obj => {
            return obj.id.toString() === idRequest;           
        }
    )

    let returnObj = null;
    if( matchObj.length > 0) {
        returnObj = matchObj[0];
    }
    else{
        returnObj = {};
    }
    return returnObj;
}