import { getResourceIds, getResourceData } from "../../lib/resources";

// next.js app use dynamic urls must include a getStaticPaths()
export async function getStaticPaths() {
    const paths = await getResourceIds();

    console.log( paths );
    return {
        paths: paths,
        // false is no loading screen
        fallback: false
    };
}

// return one document's data for matching ID for getStaticProps()
export async function getStaticProps( { params } ) {
    const itemData = await getResourceData( params.id );
    //console.log( itemData );

    return {
        props: {
            itemData
        }
    };
}


export default function Entry({ itemData }) {
    //console.log(itemData);
    return (
      <article className="card col-6">
        <div className="card-body">
          <h5 className="card-title">song: {itemData.data.song}</h5>
          <p className="card-text">album: {itemData.data.album}</p>
          {itemData.data.link ?
            <a className="btn btn-primary" href={itemData.data.link}>Youtube video</a>
            : null
          }
        </div>
      </article>
    );
  }