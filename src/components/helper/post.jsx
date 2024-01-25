import React from "react";

const Post = ({ username, avatar, images, likes, comments }) => {
  return (
    <div>
      <div className="bg-white p-4 mb-4 rounded-2xl shadow ">
        {/* Post Header */}
        <div className=""></div>
        <div className="flex items-center mb-3">
          <img
            src={avatar}
            alt={`${username}'s avatar`}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <p className="text-gray-800 font-bold">{username}</p>
            <p className="text-gray-600">Posted 3 hours ago</p>
          </div>
        </div>

        {/* Post Images */}
        <div className="mb-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post ${index + 1}`}
              className="w-full h-64 object-cover mb-2 rounded"
            />
          ))}
        </div>

        {/* Post Actions (Likes and Comments) */}
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-white text-gray-100">
              ❤️ Like
            </button>
            <button className="flex items-center text-gray-100">
              💬 Comment
            </button>
          </div>
          <div className="text-gray-500">
            {likes} Likes - {comments} Comments
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
