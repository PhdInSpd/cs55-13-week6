import Head from 'next/head';
import Link from 'next/link';
import { getAllIds, getData } from '../lib/data';
import Layout from '../components/layout';
// getStaticPaths() to report to next all possible dynamic urls
export async function getStaticPaths() {
    const allDynamicPaths = getAllIds();
    return {
        paths: allDynamicPaths,
        // 404 error related
        fallback: false
    };
}

// return data for one ranchera
export async function getStaticProps( {params} ) {
    const itemData = await getData( params.id );
    // console.log( itemData );
    return {
        props: {
            itemData
        }
    };
}

// react component to displayp all details about a person when a dynamijc route matches
export default function Entry( { itemData } ) {
    return(
        <Layout>
            <h1>MY favorite ranchera: {itemData.id}</h1>   
            <article className = "card col-6">
                <div className = "card-body">            
                    <h5 className ="card-title">song: {itemData.song}</h5>
                    { itemData.artist_favorite_song ?
                        <h6 className ="card-subtitle mb-2 text-muted"> singers:</h6>:null
                    }
                    { itemData.artist_favorite_song ?
                        <ul>
                            {
                                itemData.artist.map(
                                    (item) => (
                                         <li key={item.id.toString()}>{item.name}</li>
                                            )
                                )
                            }
                        </ul>:null
                    }
                    { itemData.composer_favorite_song ?
                        <h6 className ="card-subtitle mb-2 text-muted"> composers: </h6>: null
                    }
                    { itemData.composer_favorite_song ?
                        <ul>
                            {
                                itemData.composer.map(
                                    (item) => (
                                         <li key={item.id.toString()}>{item.name}</li>
                                            )
                                )
                            }
                        </ul>:null
                    }
                    <h6 className="card-subtitle mb-2 text-muted">album: {itemData.album}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">release year: {itemData.year_released.toString()}</h6>
                    <a href = {itemData.link} className ="card-link">youtube video</a>
                </div>
            </article>
            <br></br>
            <h2>the singer`&apos;`s favorite rancheras</h2>   
            {/* render details about all other entities in persons.json related to id */}
            <div className="list-group col-6">        
                    { 
                    itemData.artist_favorite_song ?                 
                        itemData.artist_favorite_song.map(
                            ({ id, song }) => (
                                            <Link key={id} href={`/${id}`}>
                                                <a className="list-group-item list-group-item-action">{song}</a>
                                            </Link>
                                            )
                    )                
                    : null                  
                    }
            </div>
            <h2>the composer`&apos;`s favorite rancheras</h2>   
            {/* render details about all other entities in persons.json related to id */}
            <div className="list-group col-6">        
                    { 
                    itemData.composer_favorite_song ?                 
                        itemData.composer_favorite_song.map(
                            ({ id, song }) => (
                                            <Link key={id} href={`/${id}`}>
                                                <a className="list-group-item list-group-item-action">{song}</a>
                                            </Link>
                                            )
                    )                
                    : null                  
                    }
            </div>
        </Layout>
    );
}

// artist is undefined from line 33
function artistToString( {artist} ) {
    let output = "";
    if(!artist) {
        return output;
    }
    if(artist.length == 0) {
        return output;
    }

    for( let i =0 ; i<artist.length; i++) {
        output += artist[i].toString();
    }
    return output;
}