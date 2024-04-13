import {
  AiOutlineLogin,
  AiOutlineSwapRight,
  AiOutlineUserAdd,
} from "react-icons/ai";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { auth } from "../firebase/config";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";


type LoginFormProps = {
  registerView: () => void;
  loginDynamicStyles: React.CSSProperties;
};

type FormValues = {
  email: string;
  password: string;
};

export function LoginForm({
  registerView,
  loginDynamicStyles,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const [firebaseErrors, setFirebaseErrors] = useState({
    message: "",
    myemail: "",
    mypassword: "",
  });
 
  async function onSubmit(data: FormValues) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        alert("successful");
        console.log(user);
        // ...
      })
      .catch(({ code, errorMessage }) => {
        console.log(errorMessage, code);
        errorMessage = "";
        if (code === "auth/wrong-password") {
          (errorMessage =
            "Password is incorrect. Please enter a correct password."),
            setFirebaseErrors((prevErrors) => {
              return {
                ...prevErrors,
                mypassword: errorMessage,
              };
            });
        } else if (code === "auth/invalid-email") {
          errorMessage = "Invalid email address. Please enter a valid email.";
          setFirebaseErrors((prevErrors) => {
            return {
              ...prevErrors,
              myemail: errorMessage,
            };
          });
        } else if (code === "auth/user-not-found") {
          errorMessage = "user not found!";
          setFirebaseErrors((prevErrors) => {
            return { ...prevErrors, message: errorMessage };
          });
        }
      });
    console.log(firebaseErrors);
  }
  async function handleResetPassword() {
    const emailInput: string | null = prompt("please enter your email address");
    setFirebaseErrors((prevErrors) => ({
      ...prevErrors,
      myemail: "",
    }));
    if (emailInput !== null) {
      const email: string = emailInput;
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert(
            "Email sent! Check your inbox for password reset instructions."
          );
        })
        .catch((error) => {
          // Handle errors if any
          console.log(error.code, error.message);
          if (error.code === "auth/invalid-email") {
            setFirebaseErrors((prevErrors) => ({
              ...prevErrors,
              myemail: "Invalid email address. Please enter a valid email.",
            }));
          } else if (error.code === "auth/user-not-found") {
             setFirebaseErrors((prevErrors) => ({
               ...prevErrors,
               myemail: "this email not exist.",
             }));
          } else {
            alert(
              "An error occurred while sending the email. Please try again later."
            );
          }
      });
    } 
  }
  return (
    <div
      className="login-container p-7 h-full flex flex-col justify-between w-full items-between absolute z-[2] duration-300"
      style={{ ...loginDynamicStyles }}
    >
      <div className="form-icon flex justify-between">
        <AiOutlineLogin size="26px" color="white" className="cursor-pointer" />
        <AiOutlineUserAdd
          size="26px"
          color="var(--first-color)"
          className="cursor-pointer"
          onClick={registerView}
        />
      </div>
      <div className="form-title text-white mb-24 text-2xl font-semibold">
        <span>
          welcome <br />
          back
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputField>
            <input
              type="text"
              id="email"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="input-field border-b focus:border-b-2 valid:border-b-2 border-[#7d476c] h-[45px] w-full p-2 pb-0 outline-none"
            />
            <label
              htmlFor="email"
              className="text-[#7d476c] absolute text-[13px] top-[-10%] left-0
               duration-300 font-semibold"
            >
              Email
            </label>
            {errors?.email && (
              <span className="text-red-500 text-xs font-medium mt-1">
                {errors.email.message}
              </span>
            )}
            {firebaseErrors?.myemail && (
              <span className="text-red-500 text-xs font-medium mt-1">
                {firebaseErrors.myemail}
              </span>
            )}
          </InputField>
          <InputField>
            <input
              type="password"
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="input-field border-b focus:border-b-2 valid:border-b-2 border-[#7d476c] h-[45px] w-full p-2 pb-0 outline-none"
            />
            <label
              htmlFor="password"
              className="text-[#7d476c] left-0 text-[13px] absolute top-[-10%] duration-300 font-semibold"
            >
              Password
            </label>
            {errors?.password && (
              <span className="text-red-500 text-xs font-medium mt-1">
                {errors.password.message}
              </span>
            )}
            {firebaseErrors?.mypassword && (
              <span className="text-red-500 text-xs font-medium mt-1">
                {firebaseErrors.mypassword}
              </span>
            )}
          </InputField>
          {firebaseErrors?.message && (
            <span className="text-red-500 text-xs font-medium mt-1">
              {firebaseErrors.message}
            </span>
          )}
        </div>
        <div className="input-box my-6 relative flex flex-col">
          <button
            type="submit"
            className="input-submit flex gap-2 justify-center items-center w-full rounded-full text-white bg-[#7d476c] h-[50px] duration-300 hover:gap-5"
          >
            <span>Sign In</span>
            <AiOutlineSwapRight />
          </button>
        </div>
      </form>

      <DevTool control={control} />

      <div className="form-bottom-links flex justify-between text-sm underline ">
        <button id="register-btn" onClick={registerView}>
          Sign Up
        </button>
        <button onClick={handleResetPassword}>Forgot Password</button>
      </div>
    </div>
  );
}
