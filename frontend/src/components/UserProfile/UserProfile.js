import "./UserProfile.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import userBanner from "../../Assets/userBanner.png";
import person2 from "../../Assets/person2.png";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useUserProfile } from "../../hooks/useUserProfile";

export default function UserProfile({ user, handleOnLogout }) {
  const { myName, username, posts, userInfo } = useUserProfile({ user });
  let instagram_url = "",
    facebook_url = "",
    twitter_url = "";
  const instagram =
    userInfo.instagram_url == null || userInfo.instagram_url == "null";
  // We have a link to use
  if (!instagram) {
    instagram_url = userInfo.instagram_url;
  }
  const facebook =
    userInfo.facebook_url == null || userInfo.facebook_url == "null";
  // We have a link to use
  if (!facebook) {
    facebook_url = userInfo.facebook_url;
  }
  const twitter =
    userInfo.twitter_url == null || userInfo.twitter_url == "null";
  // We have a link to use
  if (!twitter) {
    twitter_url = userInfo.twitter_url;
  }
  const banner_url =
    userInfo.banner_img_url == null || userInfo.banner_img_url == "null";
  const banner_img = banner_url ? (
    <>
      <img
        className="bannerImg"
        src={userBanner}
        alt="people standing on a mountain"
      />
    </>
  ) : (
    <>
      <img
        className="bannerImg"
        src={`${userInfo.banner_img_url}`}
        alt="my banner"
      />
    </>
  );
  const profile_url =
    userInfo.profile_img_url == null || userInfo.profile_img_url == "null";
  const profile_img = profile_url ? (
    <>
      {/* Return default image */}
      <img className="bannerImg" src={person2} alt="user profile picture" />
    </>
  ) : (
    <>
      {/* Use our own image */}
      <img
        className="bannerImg"
        src={`${userInfo.profile_img_url}`}
        alt="my profile"
      />
    </>
  );
  const bio = userInfo.biography == null || userInfo.biography == "null";
  const biography = bio ? (
    <>
      <p>
        No biography.{" "}
      </p>
    </>
  ) : (
    <>
      <p>{`${userInfo.biography}`}</p>
    </>
  );
  //Unauthenticated view
  if (!user.email) {
    return (
      <div className="total">
        <Navbar user={user} handleOnLogout={handleOnLogout} />
        <div className="title">
          <h2>You must be logged in to view your profile.</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="user">
      <Navbar user={user} handleOnLogout={handleOnLogout} />

      <div className="banners">{banner_img}</div>

      <div className="userInfo">
        <div className="profilePic">{profile_img}</div>

        <div className="name">
          <p>{myName}</p>
          <div className="username" style={{marginTop: "60px"}}>
            <p>{username}</p>
          </div>
        </div>
        <div className="socialMedia">
          <a target="_blank" href={`http://${instagram_url}`}>
            <InstagramIcon />
          </a>
          <a target="_blank" href={`http://${facebook_url}`}>
            <FacebookIcon />
          </a>
          <a target="_blank" href={`http://${twitter_url}`}>
            <TwitterIcon />
          </a>
        </div>
      </div>

      <div className="description">{biography}</div>

      <div className="portfolioArea">
        <div className="Portfolio">
          <h2>Portfolio</h2>
        </div>

        <div className="editPageButns">
          <div className="editPortfolio">
            <Link to="/editportfolio">Edit Portfolio</Link>
          </div>
          <div className="editProfile">
            <Link to="/edit">Edit Profile</Link>
          </div>
          <div className="uploadProfile">
            <Link to="/upload">Create Post</Link>
          </div>
        </div>
      </div>

      <div className="pictureArea">
        {posts.map((post) => (
          <div className="image" key={post.photoPostId}>
            <Link to={`/post/${post.photoPostId}`}>
              <img
                src={`${post.imgPostUrl}`}
                alt={`Portfolio ${post.photoPostId}`}
              ></img>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
