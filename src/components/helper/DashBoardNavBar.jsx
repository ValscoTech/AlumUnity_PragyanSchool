import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../utils/useScreenSize";

function DashBoardNavBar({ opened, setOpened, setComp }) {
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  return (
    <header className="flex justify-between">
      <div className="flex">
        <div className="p-2">
          <img src="Images/logo.png" alt="" />
        </div>
        {screenSize.width > 820 && (
          <div className="pl-4 p-2">
            <div className="relative ">
              <div
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.02317 9.58741C8.0922 10.3237 6.91128 10.764 5.62633 10.764C2.62093 10.764 0.18457 8.35531 0.18457 5.38398C0.18457 2.41265 2.62093 0.00390625 5.62633 0.00390625C8.63173 0.00390625 11.0681 2.41265 11.0681 5.38398C11.0681 6.6542 10.6228 7.82162 9.87823 8.74199L13.3229 12.2695C13.559 12.5029 13.559 12.8814 13.3229 13.1149C13.0868 13.3483 12.7039 13.3483 12.4678 13.1149L9.02317 9.58741ZM1.39385 5.38398C1.39385 3.07294 3.2888 1.19948 5.62633 1.19948C7.96387 1.19948 9.85881 3.07294 9.85881 5.38398C9.85881 6.5116 9.40767 7.53505 8.6741 8.28753C8.65365 8.30312 8.63398 8.32018 8.61524 8.33871C8.59648 8.35725 8.57922 8.37671 8.56344 8.39694C7.80231 9.12234 6.76702 9.56847 5.62633 9.56847C3.2888 9.56847 1.39385 7.69501 1.39385 5.38398Z"
                    fill="#5F6163"
                  />
                </svg>
              </div>

              <input
                className="bg-[#EEF3F8] rounded-md"
                style={{
                  padding: "5px 10px 5px 35px",
                  lineHeight: "30px",
                }}
                type="text"
                placeholder="Search..."
              ></input>
            </div>
          </div>
        )}
      </div>

      {screenSize.width < 820 && (
        <div>
          <ul className="flex justify-center">
            <li
              className="p-1"
              onClick={() => {
                setOpened((prev) =>
                  prev === "notifications" ? "" : "notifications"
                );
                setComp((prev) =>
                  prev === "notification" ? "" : "notification"
                );
              }}
            >
              <div className="p-2 center relative">
                <div className="flex justify-center p-1">
                  {opened === "notifications" ? (
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.7793 18.2678V16.5303C20.7793 16.0532 20.6088 15.5919 20.2985 15.2295L18.3495 12.9531H3.26833L1.28504 15.226C0.967148 15.5903 0.791992 16.0574 0.791992 16.5409V18.2678H8.78882C8.78882 18.2678 8.78882 20.5077 10.7856 20.5077C12.7825 20.5077 12.7825 18.2678 12.7825 18.2678H20.7793Z"
                        fill="black"
                      />
                      <path
                        d="M17.7738 11.9806V8.02696C17.7738 8.02696 17.15 0.980469 10.7568 0.980469C4.36356 0.980469 3.79688 8.02696 3.79688 8.02696V11.9806H17.7738Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.7793 18.2678V16.5303C20.7793 16.0532 20.6088 15.5919 20.2985 15.2295L18.3495 12.9531H3.26833L1.28504 15.226C0.967148 15.5903 0.791992 16.0574 0.791992 16.5409V18.2678H8.78882C8.78882 18.2678 8.78882 20.5077 10.7856 20.5077C12.7825 20.5077 12.7825 18.2678 12.7825 18.2678H20.7793Z"
                        fill="#666666"
                      />
                      <path
                        d="M17.7738 11.9806V8.02696C17.7738 8.02696 17.15 0.980469 10.7568 0.980469C4.36356 0.980469 3.79688 8.02696 3.79688 8.02696V11.9806H17.7738Z"
                        fill="#666666"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                {opened === "notifications" ? (
                  <svg
                    width="71"
                    height="3"
                    viewBox="0 0 71 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.570312 3C0.570312 1.34315 1.91346 0 3.57031 0H67.4248C69.0816 0 70.4248 1.34315 70.4248 3H0.570312Z"
                      fill="black"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </div>
            </li>
          </ul>
        </div>
      )}
      <div>
        {screenSize.width > 820 && (
          <ul className="flex justify-center">
            <li className="px-1" onClick={() => setOpened("home")}>
              <div
                className="p-2 center relative"
                style={{
                  width: "71px",
                }}
              >
                <div className="flex  justify-center">
                  {opened === "home" ? (
                    <svg
                      width="23"
                      height="20"
                      viewBox="0 0 23 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.1585 9.96L0.181641 9.96016V8.36145L11.178 0.75L22.1779 8.36145V9.96H20.1976V19.9307H13.1965V13.9548H9.31478V19.9307H2.1585V9.96Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="23"
                      height="20"
                      viewBox="0 0 23 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.55889 9.92875L0.582031 9.92891V8.3302L11.5784 0.71875L22.5783 8.3302V9.92875H20.5979V19.8995H13.5969V13.9235H9.71517V19.8995H2.55889V9.92875Z"
                        fill="#666666"
                      />
                    </svg>
                  )}
                  <div
                    className="absolute "
                    style={{
                      right: "19px",
                      top: "1px",
                    }}
                  >
                    <svg
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.40039 4.92969C5.58605 4.92969 4.11523 6.4005 4.11523 8.21484C4.11523 10.0292 5.58605 11.5 7.40039 11.5C9.21473 11.5 10.6855 10.0292 10.6855 8.21484C10.6855 6.4005 9.21473 4.92969 7.40039 4.92969ZM0.115234 8.21484C0.115234 4.19136 3.37691 0.929688 7.40039 0.929688C11.4239 0.929688 14.6855 4.19136 14.6855 8.21484C14.6855 12.2383 11.4239 15.5 7.40039 15.5C3.37691 15.5 0.115234 12.2383 0.115234 8.21484Z"
                        fill="#CC1016"
                      />
                    </svg>
                  </div>
                </div>

                <p className="text-center text-xs"> Home</p>
              </div>
              {opened === "home" ? (
                <svg
                  width="71"
                  height="3"
                  viewBox="0 0 71 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.570312 3C0.570312 1.34315 1.91346 0 3.57031 0H67.4248C69.0816 0 70.4248 1.34315 70.4248 3H0.570312Z"
                    fill="black"
                  />
                </svg>
              ) : (
                ""
              )}
            </li>

            <li
              className="px-1"
              onClick={() => {
                setOpened("messages");
                navigate("/messages");
              }}
            >
              <div
                className="p-2 center relative"
                style={{
                  width: "71px",
                }}
              >
                <div className="flex  justify-center">
                  {opened === "messages" ? (
                    <svg
                      width="23"
                      height="20"
                      viewBox="0 0 23 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.539062 7.88857C0.539062 4.01077 3.68264 0.867188 7.56044 0.867188H15.8097C19.6875 0.867188 22.8311 4.01077 22.8311 7.88857C22.8311 10.8583 20.9873 13.3975 18.3821 14.4238C17.5855 14.7376 11.6851 19.0142 11.6851 19.0142V14.9099H7.56044C3.68264 14.9099 0.539062 11.7664 0.539062 7.88857Z"
                        fill="black"
                      />
                      <circle
                        cx="7.6832"
                        cy="7.87461"
                        r="1.31992"
                        fill="white"
                      />
                      <circle
                        cx="11.6852"
                        cy="7.87461"
                        r="1.31992"
                        fill="white"
                      />
                      <circle
                        cx="15.6871"
                        cy="7.87461"
                        r="1.31992"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="23"
                      height="20"
                      viewBox="0 0 23 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.539062 7.88857C0.539062 4.01077 3.68264 0.867188 7.56044 0.867188H15.8097C19.6875 0.867188 22.8311 4.01077 22.8311 7.88857C22.8311 10.8583 20.9873 13.3975 18.3821 14.4238C17.5855 14.7376 11.6851 19.0142 11.6851 19.0142V14.9099H7.56044C3.68264 14.9099 0.539062 11.7664 0.539062 7.88857Z"
                        fill="#666666"
                      />
                      <circle
                        cx="7.6832"
                        cy="7.87461"
                        r="1.31992"
                        fill="white"
                      />
                      <circle
                        cx="11.6852"
                        cy="7.87461"
                        r="1.31992"
                        fill="white"
                      />
                      <circle
                        cx="15.6871"
                        cy="7.87461"
                        r="1.31992"
                        fill="white"
                      />
                    </svg>
                  )}
                </div>

                <p className="text-center text-xs"> Messages</p>
              </div>
              {opened === "messages" ? (
                <svg
                  width="71"
                  height="3"
                  viewBox="0 0 71 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.570312 3C0.570312 1.34315 1.91346 0 3.57031 0H67.4248C69.0816 0 70.4248 1.34315 70.4248 3H0.570312Z"
                    fill="black"
                  />
                </svg>
              ) : (
                ""
              )}
            </li>

            <li
              className="px-1"
              onClick={() => {
                setOpened((prev) =>
                  prev === "notifications" ? "" : "notifications"
                );
                setComp((prev) =>
                  prev === "notification" ? "" : "notification"
                );
              }}
            >
              <div className="p-2 center relative">
                <div className="flex  justify-center">
                  {opened === "notifications" ? (
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.7793 18.2678V16.5303C20.7793 16.0532 20.6088 15.5919 20.2985 15.2295L18.3495 12.9531H3.26833L1.28504 15.226C0.967148 15.5903 0.791992 16.0574 0.791992 16.5409V18.2678H8.78882C8.78882 18.2678 8.78882 20.5077 10.7856 20.5077C12.7825 20.5077 12.7825 18.2678 12.7825 18.2678H20.7793Z"
                        fill="black"
                      />
                      <path
                        d="M17.7738 11.9806V8.02696C17.7738 8.02696 17.15 0.980469 10.7568 0.980469C4.36356 0.980469 3.79688 8.02696 3.79688 8.02696V11.9806H17.7738Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.7793 18.2678V16.5303C20.7793 16.0532 20.6088 15.5919 20.2985 15.2295L18.3495 12.9531H3.26833L1.28504 15.226C0.967148 15.5903 0.791992 16.0574 0.791992 16.5409V18.2678H8.78882C8.78882 18.2678 8.78882 20.5077 10.7856 20.5077C12.7825 20.5077 12.7825 18.2678 12.7825 18.2678H20.7793Z"
                        fill="#666666"
                      />
                      <path
                        d="M17.7738 11.9806V8.02696C17.7738 8.02696 17.15 0.980469 10.7568 0.980469C4.36356 0.980469 3.79688 8.02696 3.79688 8.02696V11.9806H17.7738Z"
                        fill="#666666"
                      />
                    </svg>
                  )}
                </div>

                <p className="text-center text-xs"> Notifications</p>
              </div>
              <div className="flex justify-center">
                {opened === "notifications" ? (
                  <svg
                    width="71"
                    height="3"
                    viewBox="0 0 71 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.570312 3C0.570312 1.34315 1.91346 0 3.57031 0H67.4248C69.0816 0 70.4248 1.34315 70.4248 3H0.570312Z"
                      fill="black"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </div>
            </li>

            <li className="px-1" onClick={() => navigate("/profile")}>
              <div
                className="p-2 center relative"
                style={{
                  width: "71px",
                }}
              >
                <div className="flex justify-center">
                  <img
                    width="21px"
                    src="src/assets/images/users/user2.png"
                  ></img>
                </div>
                <div className="flex relative">
                  <p className="text-center text-xs"> Profile</p>
                  <div
                    className="absolute"
                    style={{
                      left: "37px",
                      top: "5px",
                    }}
                  >
                    <svg
                      width="10"
                      height="5"
                      viewBox="0 0 10 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.46931 0.349227L4.88495 4.7653C4.96305 4.84341 5.08969 4.84342 5.1678 4.76531L9.58387 0.349234C9.70986 0.223241 9.62063 0.0078125 9.44245 0.0078125H0.610739C0.432563 0.0078125 0.343327 0.223231 0.46931 0.349227Z"
                        fill="#666666"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        )}

        {screenSize.width < 820 && (
          <ul className="flex justify-center">
            <li className="px-1" onClick={() => navigate("/profile")}>
              <div
                className="p-2 center relative flex"
                // style={{
                //   width: "71px",
                // }}
              >
                <div className="px-2">
                  <div className="text-sm">XYZ Anaas</div>
                  <div className="text-[12px] flex">
                    Verified
                    <svg
                      className="w-4 h-4"
                      width="7"
                      height="8"
                      viewBox="0 0 7 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.54107 1.17067L3.44973 0.564697L2.35837 1.17067L1.15818 1.51389L0.814958 2.71408L0.208984 3.80544L0.814958 4.89678L1.15818 6.09697L2.35837 6.44021L3.44973 7.04617L4.54107 6.44021L5.74129 6.09697L6.08449 4.89678L6.69045 3.80544L6.08449 2.71408L5.74129 1.51389L4.54107 1.17067ZM5.03989 3.08791C5.18055 2.92561 5.16302 2.68 5.00073 2.53934C4.83841 2.39867 4.59279 2.41622 4.45213 2.57852L3.06084 4.18387L2.44731 3.47596C2.30664 3.31365 2.06104 3.29611 1.89873 3.43677C1.73643 3.57744 1.71888 3.82304 1.85955 3.98534L2.76696 5.03235C2.84082 5.11759 2.94805 5.16656 3.06084 5.16656C3.17362 5.16656 3.28085 5.11759 3.35472 5.03235L5.03989 3.08791Z"
                        fill="#0CAF60"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-center  border-black border-solid border-2 rounded-full">
                  <img
                    width="32px"
                    height="32px"
                    src="src/assets/images/users/user2.png"
                    className="rounded-full"
                  ></img>
                </div>
                {/* <div className="flex relative">
                  <p className="text-center text-xs"> Profile</p>
                  <div
                    className="absolute"
                    style={{
                      left: "37px",
                      top: "5px",
                    }}
                  >
                    <svg
                      width="10"
                      height="5"
                      viewBox="0 0 10 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.46931 0.349227L4.88495 4.7653C4.96305 4.84341 5.08969 4.84342 5.1678 4.76531L9.58387 0.349234C9.70986 0.223241 9.62063 0.0078125 9.44245 0.0078125H0.610739C0.432563 0.0078125 0.343327 0.223231 0.46931 0.349227Z"
                        fill="#666666"
                      />
                    </svg>
                  </div>
                </div> */}
              </div>
            </li>
          </ul>
        )}
      </div>

      {screenSize.width > 820 && (
        <div className="px-3 pt-1">
          <ul>
            <li>
              <svg
                width="47"
                height="46"
                viewBox="0 0 47 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.9866 23.0016C26.9866 25.165 25.2373 26.9134 23.0861 26.9134C20.9348 26.9134 19.1855 25.165 19.1855 23.0016C19.1855 20.8383 20.9348 19.0898 23.0861 19.0898C25.2373 19.0898 26.9866 20.8383 26.9866 23.0016Z"
                  stroke="#666666"
                  strokeWidth="3"
                />
                <path
                  d="M22.007 11.608C22.2663 10.4575 23.9056 10.4575 24.165 11.608C24.7892 14.3772 27.9678 15.6925 30.3662 14.1747C31.3402 13.5584 32.5301 14.6909 31.8871 15.7113C30.3766 18.1082 31.6845 21.2889 34.4551 21.9161C35.6096 22.1774 35.6096 23.8226 34.4551 24.0839C31.6845 24.7111 30.3766 27.8918 31.8871 30.2887C32.5301 31.3091 31.3402 32.4416 30.3662 31.8253C27.9678 30.3075 24.7892 31.6228 24.165 34.392C23.9056 35.5425 22.2663 35.5425 22.007 34.392C21.3828 31.6228 18.2042 30.3075 15.8057 31.8253L16.6078 33.0928L15.8057 31.8253C14.8318 32.4416 13.6419 31.3091 14.2849 30.2887C15.7953 27.8918 14.4875 24.7111 11.7168 24.0839L11.3857 25.5469L11.7168 24.0839C10.5623 23.8226 10.5623 22.1774 11.7168 21.9161C14.4875 21.2889 15.7953 18.1082 14.2849 15.7113C13.6419 14.6909 14.8318 13.5584 15.8057 14.1747C18.2042 15.6925 21.3828 14.3772 22.007 11.608Z"
                  stroke="#666666"
                  strokeWidth="3"
                />
              </svg>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default DashBoardNavBar;
