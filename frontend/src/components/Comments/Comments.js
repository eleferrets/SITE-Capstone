import * as React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import "./Comments.css";


export default function Comments() {
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCommentsById = async () => {
      setIsLoading(true);
      try {
        const { data } = await apiClient.listCommentsWithPostId(postId);

        setComments(data.comments);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };

    fetchCommentsById();
  }, [postId, comments]);

  const { register, handleSubmit } = useForm();

  return (
    <div className="comments">
      <div className="title">
        <h2>Comments</h2>
      </div>

      <div className="searchForm">
        <form
          onSubmit={handleSubmit(
            async (data) =>
              await apiClient.createComment(postId, {
                comment: data["Comments"],
              })
          )}
        >
          <div className="commentSecCont">
            <div className="typeComment">
              <input
                type="text"
                placeholder="Comments"
                {...register("Comments", {})}
              />
            </div>

            <div className="submitComment">
              <input type="submit" />
            </div>
          </div>
        </form>
      </div>
      {comments.map((comment, i) => (
        <div className="commentSection" key={i}>
          <div className="profilePic">
            <img
              className="profileImg"
              src={comment.profile_img_url}
              alt="user profile picture"
            />
          </div>

          <div className="userInfo">
            <div className="subUserInfo">
              <div className="username">
                <p>{comment.username}</p>
              </div>

              <div className="description">
                <p>{comment.comment_description}</p>
              </div>
              <div className="timestamp">
                <p>{comment.comment_created_at}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
