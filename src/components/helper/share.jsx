import React from "react";

function share() {
  return (
    <div>
      <div className="bg-white p-4 mb-4 rounded-2xl shadow ">
        <div className="p-5">
          <div className="flex items-center">
            <img
              src={avatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <input
              type="text"
              className="relative m-0 block flex-auto rounded border border-solid border-neutral-400 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Start a Post"
            />
          </div>

          <hr />
          <div p-4>
            <button>🌆</button>
            <span>Add Image</span>

            <button>🔗</button>
            <span>Add Link</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default share;
