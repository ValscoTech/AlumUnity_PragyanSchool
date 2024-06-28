import { useContext, useState, useEffect } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";

function formatDateTime(timestamp, comment) {
  const date = new Date(timestamp);
  let options;
  if (comment) {
    options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
  } else {
    options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
  }
  return date.toLocaleDateString("en-US", options);
}

const Post = ({
  username,
  avatar,
  images,
  likes,
  postText,
  uploadedTime,
  link,
  fileId,
  likesCount,
}) => {
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikesCount] = useState(likesCount);
  const { user } = useContext(AuthContext);
  const userId = user && user._id;
  const [liked, setLiked] = useState(likes.includes(userId));
  useEffect(() => {
    setLikesCount(likesCount);
    setLiked(likes.includes(userId));
  }, [likesCount, likes, userId]);
  const handleComment = (e, postId) => {
    const obj = {
      postId,
      action: "Comment",
    };
    console.log(obj);
  };

  const handleLike = async () => {
    const urlPlaceholder = liked ? "unlike" : "like";
    const response = await fetch(
      `http://localhost:8080/api/posts/${fileId}/${urlPlaceholder}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      }
    );
    if (response.ok) {
      setLiked(!liked);
      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    }
  };

  const handleViewComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${fileId}/comments`
      );
      const data = await response.json();
      setPostComments(data);
      setCommentsLoaded(true);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSendComment = async () => {
    if (newComment.trim() === "") {
      alert("Oops! Guess you are missing to fill the comment section");
      return;
    }

    const commentData = {
      username: user && user.name,
      comment: newComment,
      commentTime: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${fileId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );
      if (response.ok) {
        setNewComment("");
        handleViewComments();
      }
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  return (
    <div className="bg-backgroundColor-lightgray p-4 mb-4 rounded-2xl shadow-xl">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <img
            src={avatar}
            alt={`${username}'s avatar`}
            className="w-10 h-10 rounded-full border-2 border-black object-cover mr-3"
          />
          <div>
            <p className="text-gray-800 font-bold text-sm md:text-base">
              {username}
            </p>
            <p className="text-gray-600 text-xs md:text-base max-w-20 md:max-w-full">
              Posted on {formatDateTime(uploadedTime)}
            </p>
          </div>
        </div>
        <button className="bg-backgroundColor-gray py-0 px-2 md:px-3 rounded-2xl text-xs md:text-base text-backgroundColor-followBtn">
          + Follow
        </button>
      </div>

      {/* Post Text */}
      <div className="my-4">{postText}</div>

      {/* Post Link */}
      {link && (
        <div className="my-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {link}
          </a>
        </div>
      )}

      {/* Post Images */}
      <div className="mb-4">
        {images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Post ${index + 1}`}
            className="w-full h-64 object-cover mb-2 rounded"
          />
        ))}
      </div>

      {/* Post Actions (Likes and Comments) */}
      <div>
        <div className="flex items-center w-full justify-between space-x-4">
          <p
            className="pl-5 flex items-center gap-1 cursor-pointer"
            onClick={handleLike}
          >
            {liked ? (
              <FaThumbsUp className="text-backgroundColor-commentblue" />
            ) : (
              <FaRegThumbsUp className="text-backgroundColor-commentblue" />
            )}
            {likeCount}
          </p>
          <p className="pr-2">
            <FiSend className="text-xl" />
          </p>
        </div>
        <div>
          <div className="flex items-center pr-6 pl-2 py-2 mx-auto">
            <img
              src="Images/profile.jpg"
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-black"
            />
            <input
              type="text"
              className="md:p-2 p-1 rounded-3xl md:w-full text-xs md:text-base w-11/12 font-semibold placeholder:text-black bg-backgroundColor-gray"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleSendComment}
              className="ml-2 p-1 md:p-2 bg-backgroundColor-gray rounded-3xl text-xs md:text-base font-semibold text-backgroundColor-commentblue"
            >
              Send
            </button>
          </div>
          {commentsLoaded ? (
            <div className="pl-2">
              {postComments.length > 0 ? (
                postComments.map((comment, index) => (
                  <div key={index} className="my-2">
                    <p className="font-semibold">
                      {comment.username} commented "{comment.comment}" on{" "}
                      {formatDateTime(comment.commentTime, true)}
                    </p>
                  </div>
                ))
              ) : (
                <p>No comments</p>
              )}
            </div>
          ) : (
            <p
              className="text-backgroundColor-commentblue pl-2 cursor-pointer"
              onClick={handleViewComments}
            >
              View All comments
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
