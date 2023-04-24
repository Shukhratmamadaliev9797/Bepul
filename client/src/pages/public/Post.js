import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsPost, listLatestPosts } from "../../actions/postActions";
import { detailsUser } from "../../actions/userActions";
import Loader from "../../components/general/Loader";
import { Message } from "rsuite";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { Marker } from "react-map-gl";
import LocationIcon from "@rsuite/icons/Location";
import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
} from "react-share";
import {
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
  FacebookMessengerIcon,
} from "react-share";
import { createConversation } from "../../actions/conversationActions";

export default function Post() {
  const [activeImage, setActiveImage] = useState("");

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const postLatest = useSelector((state) => state.postLatest);
  const { loading: listLoading, error: listError, postLists } = postLatest;

  const conversationCreate = useSelector((state) => state.conversationCreate);
  const {
    loading: createChatLoading,
    error: createChatError,
    success,
  } = conversationCreate;

  const [viewport, setViewport] = useState({
    latitude: post?.lat,
    longitude: post?.lng,
    zoom: 12,
  });

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoading, error: userError, user } = userDetails;

  useEffect(() => {
    if (success) {
      navigate("/profile/messages");
    }
  }, [success, navigate]);

  useEffect(() => {
    dispatch(detailsPost(params.id));
    dispatch(listLatestPosts());
  }, [dispatch, params.id]);

  useEffect(() => {
    if (post) {
      dispatch(detailsUser(post.user));
      setViewport({ latitude: post.lat, longitude: post.lng });
    }
  }, [post, dispatch]);

  const parseDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `Member Since ${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const currentUrl = window.location.href;

  const chatCreate = () => {
    dispatch(createConversation(userInfo._id, post?.user));
  };

  return (
    <div className="post">
      <div className="post__container">
        {loading || userLoading ? (
          <Loader height={80} />
        ) : error || userError ? (
          <Message showIcon type="error" header="Error">
            {error || userError}
          </Message>
        ) : (
          <div className="post__content">
            <div className="post__details">
              <div className="post__details-title">
                <h3>{post.title}</h3>
              </div>
              <div className="post__details-subInfo">
                <span>
                  <i class="fa-regular fa-square-check"></i> {post.category}
                </span>
                <span>
                  <i class="fa-solid fa-location-dot"></i> {post.city}
                </span>
                <span>
                  <i class="fa-solid fa-calendar-days"></i>{" "}
                  {post.createdAt.substring(0, 10)}
                </span>
                <span>
                  <i class="fa-regular fa-eye"></i> 112
                </span>
              </div>
              <div className="post__details-imagesBox">
                <div className="post__details-images">
                  <img
                    onClick={() => setActiveImage(post.image1)}
                    src={post.image1}
                    alt=""
                  />
                  <img
                    onClick={() => setActiveImage(post.image2)}
                    src={post.image2}
                    alt=""
                  />
                  {post.image3 ? (
                    <img
                      onClick={() => setActiveImage(post.image3)}
                      src={post.image3}
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {post.image4 ? (
                    <img
                      onClick={() => setActiveImage(post.image4)}
                      src={post.image4}
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="post__details-image">
                  <img src={activeImage ? activeImage : post.image1} alt="" />
                </div>
              </div>
              <div className="post__details-description">
                <h6>Description</h6>
                <p>{post.description}</p>
              </div>
              <div className="post__details-specification">
                <h6>Specification</h6>
                <span>
                  <b>Condition:</b> {post.condition}
                </span>
                <span>
                  <b>Type:</b> {post.type}
                </span>
              </div>
              <div className="post__details-address">
                <h6>Collection Address</h6>
                <p>
                  {post.address}, {post.city}, {post.postcode}
                </p>
              </div>
              <div className="post__details-map">
                <ReactMapGL
                  {...viewport}
                  onMove={(evt) => setViewport(evt.viewState)}
                  style={{ width: "100%", height: "40vh" }}
                  onViewportChange={(viewport) => setViewport(viewport)}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken="pk.eyJ1Ijoic2h1a2hyYXRtYW1hZGFsaWV2OTc5NyIsImEiOiJjbGZ0YXdrdTcwM2Q5M2Vsb3Z2dzZ6Nm9wIn0.Tz-Xivprszwl3QEF4aM7vw"
                >
                  <>
                    <Marker
                      latitude={post?.lat}
                      longitude={post?.lng}
                      anchor="bottom"
                    >
                      <LocationIcon
                        style={{ fontSize: "4rem", color: "red" }}
                      />
                    </Marker>
                  </>
                </ReactMapGL>
              </div>
            </div>
            <div className="post__user">
              <div className="post__userBox">
                <div className="post__user-poster">
                  <div className="post__user-poster-title">
                    <h5>Posted by</h5>
                  </div>

                  <div className="post__user-details">
                    <div className="post__user-imgBox">
                      <img
                        width={10}
                        height={10}
                        src={user.image ? user.image : "/images/profile.png"}
                        alt=""
                      />
                      <h6>{post.poster}</h6>
                      <p>{parseDate(user.createdAt.substring(0, 10))}</p>
                    </div>
                  </div>
                  <div className="post__user-contact">
                    <div className="post__user-contact-title">
                      <h5>Contact Info</h5>
                    </div>

                    <div>
                      <span>
                        <i class="fa-solid fa-envelope icon"></i>
                      </span>
                      {post.contactEmail}
                    </div>
                    <div>
                      <span>
                        <i class="fa-solid fa-phone icon"></i>
                      </span>
                      {post.contactNumber}
                    </div>
                    <div className="post__user-share">
                      <FacebookShareButton url={currentUrl}>
                        <FacebookIcon size={35} round={true} />
                      </FacebookShareButton>
                      <FacebookMessengerShareButton url={currentUrl}>
                        <FacebookMessengerIcon size={35} round={true} />
                      </FacebookMessengerShareButton>
                      <TelegramShareButton url={currentUrl}>
                        <TelegramIcon size={35} round={true} />
                      </TelegramShareButton>
                      <WhatsappShareButton url={currentUrl}>
                        <WhatsappIcon size={35} round={true} />
                      </WhatsappShareButton>
                    </div>
                  </div>
                  <div className="post__user-chat">
                    <button onClick={chatCreate}>
                      {" "}
                      <i class="fa-solid fa-envelope"></i> Chat
                    </button>
                  </div>
                  <div className="post__user-drivers">
                    <div className="post__user-drivers-title">
                      <h5>Drivers</h5>
                    </div>
                    <div className="post__user-driver">
                      <div className="post__user-driver-img">
                        <img
                          src="https://cdn2.buyacar.co.uk/sites/buyacar/files/mercedes-sprinter-3.jpg"
                          alt=""
                        />
                      </div>
                      <div className="post__user-driver-info">
                        <span>John Doe</span>
                        <span>+7523230970</span>
                        <span>driver@gmail.com</span>
                      </div>
                    </div>
                    <div className="post__user-driver">
                      <div className="post__user-driver-img">
                        <img
                          src="https://cdn2.buyacar.co.uk/sites/buyacar/files/mercedes-sprinter-3.jpg"
                          alt=""
                        />
                      </div>
                      <div className="post__user-driver-info">
                        <span>John Doe</span>
                        <span>+7523230970</span>
                        <span>driver@gmail.com</span>
                      </div>
                    </div>
                    <div className="post__user-driver">
                      <div className="post__user-driver-img">
                        <img
                          src="https://cdn2.buyacar.co.uk/sites/buyacar/files/mercedes-sprinter-3.jpg"
                          alt=""
                        />
                      </div>
                      <div className="post__user-driver-info">
                        <span>John Doe</span>
                        <span>+7523230970</span>
                        <span>driver@gmail.com</span>
                      </div>
                    </div>
                    <div className="post__user-drivers-seemore">
                      <Link>See more</Link>
                    </div>
                  </div>
                  <div className="post__latestPosts">
                    <div className="post__latestPosts-title">
                      <h5>The Latest Posts</h5>
                    </div>
                    {listLoading
                      ? "Loading..."
                      : listError
                      ? listError
                      : postLists.slice(0, 3).map((post) => {
                          return (
                            <div className="post__latestPost">
                              <div className="post__latestPost-img">
                                <img src={post.image2} alt="" />
                              </div>
                              <div className="post__latestPost-info">
                                <span>{post.title}</span>
                                <Link to={`/posts/${post._id}`}>
                                  See details
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                    <div className="post__user-drivers-seemore">
                      <Link>See more</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
