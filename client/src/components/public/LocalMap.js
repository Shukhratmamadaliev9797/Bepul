import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Geocode from "react-geocode";
import "mapbox-gl/dist/mapbox-gl.css";
import { useDispatch, useSelector } from "react-redux";
import { listPosts } from "../../actions/postActions";
import Loader from "../general/Loader";
import { Link } from "react-router-dom";

export default function LocalMap() {
  const [title, setTitle] = useState("All");
  const [category, setCategory] = useState("All");
  const [pageNumber, setPageNumber] = useState(1);
  const [user, setUser] = useState();
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
  });
  const [postcode, setPostCode] = useState("");
  const [activePost, setActivePost] = useState();
  const dispatch = useDispatch();
  Geocode.setApiKey("AIzaSyDyhUnZcPbVhD0XANlGwu3ONXoSbqDjAEw");

  const postList = useSelector((state) => state.postList);
  const { loading: listLoading, error: listError, postLists } = postList;

  const searchHandler = (e) => {
    e.preventDefault();
    Geocode.fromAddress(postcode).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setViewport({ latitude: lat, longitude: lng });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setViewport({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    dispatch(
      listPosts({
        pageNumber,
        pageSize: 50,
        title: title !== "All" ? title : "",
        category: category !== "All" ? category : "",
        user: user !== "All" ? user : "",
      })
    );
  }, []);

  return (
    <div className="localMap">
      <div>
        {listLoading ? (
          <Loader />
        ) : listError ? (
          listError
        ) : (
          <ReactMapGL
            {...viewport}
            onMove={(evt) => setViewport(evt.viewState)}
            style={{ width: "100%", height: "60vh" }}
            onViewportChange={(viewport) => setViewport(viewport)}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken="pk.eyJ1Ijoic2h1a2hyYXRtYW1hZGFsaWV2OTc5NyIsImEiOiJjbGZ0YXdrdTcwM2Q5M2Vsb3Z2dzZ6Nm9wIn0.Tz-Xivprszwl3QEF4aM7vw"
          >
            {postLists.map((post) => {
              return (
                <>
                  <Marker
                    latitude={post.lat}
                    longitude={post.lng}
                    anchor="bottom"
                  >
                    <Link
                      to={`/posts/${post._id}`}
                      className="loacalMap__marker-img"
                    >
                      <img
                        src={post.image1}
                        alt=""
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                    </Link>
                  </Marker>
                </>
              );
            })}
          </ReactMapGL>
        )}
      </div>
      <div className="localMap__text">
        <form onSubmit={searchHandler}>
          <div>
            <h1>
              Find <span>items</span> locally
            </h1>
            <p>Discover Free Items Near You with Local Postcode Search</p>
          </div>
          <div className="localMap__find">
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostCode(e.target.value)}
            />
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
}
