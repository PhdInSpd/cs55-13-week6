"use strict";
import firebase from "./firebase"

// store array of persons that are composer, artist
let _allData;

async function getPersons() {
    let persons = [];
    // wrap try around our code to catch any errors that happen
    try {
      // retrieve ALL documents from firestore collection named "resources"
      let snapShot = await firebase.collection("persons").get();
      //let snapShot = null;
      snapShot.forEach(doc => {
        persons.push(
            {
                ...doc.data(),
                id:doc.id
            }
        );       
      });
    } catch(error) {
      console.error(error);
    }
    console.log(persons);
    return persons;
}

async function getRancheras() {
    let rancheras = [];
    // wrap try around our code to catch any errors that happen
    try {
      // retrieve ALL documents from firestore collection named "resources"
      let snapShot = await firebase.collection("resources").get();
      snapShot.forEach(doc => {
        rancheras.push(
            {
                ...doc.data(),
                id:doc.id
            }
        );
      });
    } catch(error) {
      console.error(error);
    }
    // console.log(output);
    return rancheras;
}

// get one big array of json data from multiple files.
export async function getAllDataFirebase( ) {
    if(_allData != undefined) {
        return _allData;
    }
    _allData = {
        union:undefined,
        persons:undefined
    };
    _allData.persons = await getPersons();
    _allData.union = await getRancheras();
    return _allData;
}