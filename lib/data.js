"use strict";
// filesystem
import fs from 'fs';
// path
import path from 'path';

const _dataDir = path.join( 
    // return current working directory for node.js
    process.cwd(),'data'
    );

// union of rancheras.json and detail.json   
// store array of persons that are composer, artist
let _allData;
//let _union;   
//let _persons;
function extractJsonObj( rancheraFile ) {
    const filePath = path.join( _dataDir, rancheraFile );
    const jsonString = fs.readFileSync( filePath, "utf8");
    const jsonObj = JSON.parse( jsonString );
    return jsonObj;
}

// make union of rancheras.json and detail.json   
function makeUnion(rancheras, detail) {
    let union = [];
    for(  let arrayIndex=0 ; arrayIndex< rancheras.length ; arrayIndex++ ) {
        let ran = rancheras[arrayIndex];
        let targetId = ran.id;

        // find matching detail for rancheras[arrayIndex].id
        let foundDetail = detail.find( 
            obj => {
                return obj.id === targetId;           
            });

        // merge both objects into one
        let one = {
                    ...ran,
                    ...foundDetail
                };

        union.push( one );
    }
    return union;
}

// get one big array of json data from multiple files.
function getAllData( ) {
    if(_allData != undefined) {
        return _allData;
    }
    let rancheras =  extractJsonObj( 'rancheras.json' ).rancheras;
    let detail = extractJsonObj( 'detail.json' ).rancheras;
    let persons = extractJsonObj( 'persons.json' ).persons;
    _allData = {
        union:undefined,
        persons:undefined
    };
    _allData.persons = persons;
    _allData.union = makeUnion( rancheras, detail );
    return _allData;
}

// function that returns all json objects in array
// call from [id].js getStaticPaths()
export function getAllIds() {
    let allData = getAllData();
    // console.log( union );
    // extract just id properties
    return allData.union.map( item=> {
        return {
            params:{
                id: item.id.toString()
            }
        }
    });    
}

// returns names and ids for all json objects in array, sorted by song property
// called from pages/index.js
export function getSortedList( ) {
    let allData = getAllData();
    let union = allData.union;
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

function findPersons( person_id, persons ) {
    if( !person_id ) {
        return null;
    }

    if( !persons ) {
        return null;
    }

    if( person_id.length <= 0) {
        return null;
    }


    let foundPersons = [];
    for( let i = 0; i< person_id.length; i++ ) {
        let person = persons.find( 
            obj => {
                return obj.id === person_id[i];
            });
        if( person ) {
            foundPersons.push(person);
        }
    }
    return foundPersons.map(
        item => {
            return {
                name: item.name,
                birth_place: item.birth_place,
                favorite_song_id: item.favorite_song_id,
                id: item.id
            }
        });
    // return foundPersons;
}

function findFavoriteSongs( arrayOfPersons, union ) {
    let songs = [];
    for( let i = 0; i< arrayOfPersons.length; i++) {
        let found = union.filter( 
                        obj => {
                            return arrayOfPersons[i].favorite_song_id.includes(obj.id);
                        });    

        
        if( found.length > 0) {
            // songs.push( found );
            for( let j=0; j < found.length; j++) {
                songs.push( found[j] );
            }
        }
    }
    return songs.map(
        item => {
            return {
                song: item.song,
                artist_id: item.artist_id,
                composer_id: item.composer_id,
                link: item.link,
                id: item.id
            }
        }
    );
    //return songs;
}


// get the complete data for one ranchera
// used by getStaticProps() in [id].js
export async function getData( idRequest ) {
    let allData = getAllData();

    let union = allData.union;
    let data = union.find(
        obj => {
            return obj.id.toString() === idRequest;           
        });

    // found union entry based on idRequest
    if( data ) {
        let persons = allData.persons;

        // search for artist
        data.artist = findPersons( data.artist_id, persons );
        // find favorite songs
        data.artist_favorite_song = findFavoriteSongs( data.artist, union );

        // search for composers
        data.composer = findPersons( data.composer_id, persons );
        // find favorite songs
        data.composer_favorite_song = findFavoriteSongs( data.composer, union );
    }
    else {
        data = {};
    }
    return data;

    // // find object with matching id
    // let matchObj = allData.union.filter( 
    //     obj => {
    //         return obj.id.toString() === idRequest;           
    //     }
    // )

    // let returnObj = null;
    // if( matchObj.length > 0) {
    //     returnObj = matchObj[0];
    // }
    // else{
    //     returnObj = {};
    // }
    // return returnObj;
}