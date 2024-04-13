import {
  AiOutlineLogin,
  AiOutlineSwapRight,
  AiOutlineUserAdd,
} from "react-icons/ai";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {auth} from "../firebase/config"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

type RegisterFormProps = {
  loginView: () => void;
  registerDynamicStyles: React.CSSProperties;
};

type RegisterFormValues = {
  username: string;
  register_email: string;
  register_password: string;
};
export function RegisterForm({
  loginView,
  registerDynamicStyles,
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  
    const [registerErrors, setRegisterErrors] = useState({
      message: "",
      myemail: "",
    });
  async function onSubmitRegister(data: RegisterFormValues) {
  setRegisterErrors(() => {
    return { myemail: "", message: "" };
  });
  await createUserWithEmailAndPassword(
    auth,
    data.register_email,
    data.register_password
  )
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
      if (code === "auth/email-already-in-use") {
        errorMessage = "Email is already in use.Please use a different email.";
        setRegisterErrors((prevErrors) => {
          return {
            ...prevErrors,
            myemail: errorMessage,
          };
        });
      } else if (code === "auth/invalid-email") {
        errorMessage = "Invalid email address. Please enter a valid email.";
        setRegisterErrors((prevErrors) => {
          return {
            ...prevErrors,
            myemail: errorMessage,
          };
        });
      } else {
        setRegisterErrors((prev) => {
          return {...prev , myemail : "" , message : ""}
        })
      }
    });
}

  return (
    <div
      className="register-container p-7 h-full flex flex-col justify-between w-full items-between absolute z-[2] duration-300"
      style={{ ...registerDynamicStyles }}
    >
      <div className="form-icon flex justify-between">
        <AiOutlineUserAdd
          size="26px"
          color="white"
          className="cursor-pointer"
        />
        <AiOutlineLogin
          size="26px"
          color="var(--first-color)"
          className="cursor-pointer"
          onClick={loginView}
        />
      </div>
      <div className="form-title text-white mb-24 text-2xl font-semibold">
        <span>
          Create Account <br />
          Now
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <InputField>
          <input
            type="text"
            id="register_email"
            {...register("register_email", {
              required: "Please enter your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            className="input-field border-b focus:border-b-2 valid:border-b-2 border-[#7d476c] h-[45px] w-full p-2 pb-0 outline-none"
          />
          <label
            htmlFor="register_email"
            className="text-[#7d476c] absolute text-[13px] top-[-10%] left-0
               duration-300 font-semibold"
          >
            Email
          </label>
          {errors?.register_email && (
            <span className="text-red-500 text-xs font-medium mt-1">
              {errors.register_email.message}
            </span>
          )}
          {registerErrors?.myemail && (
            <span className="text-red-500 text-xs font-medium mt-1">
              {registerErrors.myemail}
            </span>
          )}
        </InputField>
        <InputField>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Please enter your username",
              minLength: {
                value: 4,
                message: "username must be at least 4 characters long",
              },
            })}
            className="input-field border-b focus:border-b-2 valid:border-b-2 border-[#7d476c] h-[45px] w-full p-2 pb-0 outline-none"
          />
          <label
            htmlFor="username"
            className="text-[#7d476c] absolute text-[13px] top-[-10%] left-0
               duration-300 font-semibold"
          >
            Username
          </label>
          {errors?.username && (
            <span className="text-red-500 text-xs font-medium mt-1">
              {errors.username.message}
            </span>
          )}
        </InputField>
        <InputField>
          <input
            type="text"
            id="register_password"
            {...register("register_password", {
              required: "Please enter your password",
              minLength: {
                value: 6,
                message: "password must be at least 6 characters long",
              },
            })}
            className="input-field border-b focus:border-b-2 valid:border-b-2 border-[#7d476c] h-[45px] w-full p-2 pb-0 outline-none"
          />
          <label
            htmlFor="register_password"
            className="text-[#7d476c] absolute text-[13px] top-[-10%] left-0
               duration-300 font-semibold"
          >
            Password
          </label>
          {errors?.register_password && (
            <span className="text-red-500 text-xs font-medium mt-1">
              {errors.register_password.message}
            </span>
          )}

        </InputField>

        <div className="input-box my-6 relative flex flex-col">
          <button
            type="submit"
            className="input-submit flex gap-2 justify-center items-center w-full rounded-full text-white bg-[#7d476c] h-[50px] duration-300 hover:gap-5"
          >
            <span>Sign Up</span>
            <AiOutlineSwapRight />
          </button>
        </div>
      </form>
      <DevTool control={control} />
      <div className="form-bottom-links flex justify-between text-sm underline ">
        <button id="register-btn" onClick={loginView}>
          Sign In
        </button>
        Terms & Policy
      </div>
    </div>
  );
}
