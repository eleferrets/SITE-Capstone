import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export const usePostSearch = ({ user, term }) => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setError] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      setFetching(true);
      try {
        const { data } = await apiClient.searchPosts(term);
        // console.log(data);
        setPosts(data.searches);
      } catch (err) {
        setError(err);
      }

      setFetching(false);
    };
    fetchPosts();
  }, [user, posts]);

  // const handleDelete = async (postId) => {
  //   setIsProcessing(true);
  //   try {
  //     const { data } = await apiClient.deletePost(postId);
  //   } catch (err) {
  //     setError(err);
  //   }
  //   setIsProcessing(false);
  // };

  return { posts };
};
