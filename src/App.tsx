import "./index.css";
import fluidImg from "./assets/fluid-1.svg";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { useState } from "react";

function App() {
   const [loginDynamicStyles, setLoginDynamicStyles] =
     useState<React.CSSProperties>({
       left: "0",
       opacity: 1,
       display: "flex",
       transition: "ease .3s",
     });
   const [registerDynamicStyles, setRegisterDynamicStyles] =
     useState<React.CSSProperties>({
       left: "100%",
       opacity: 0,
       display : "none",
       transition: "ease .3s",
     });
  const [fluidAnimate , setFluidAnimate] = useState(false)
  function registerView() {
     setLoginDynamicStyles({
       left: "-100%",
       opacity: 0,
     });
     setRegisterDynamicStyles({
       left: "0",
       opacity: 1,
     });
    setFluidAnimate(true)
  }
  function loginView() {
    setLoginDynamicStyles({
      left: "0",
      opacity: 1,
    });
    setRegisterDynamicStyles({
      left: "100%",
      opacity: 0,
    });
    setFluidAnimate(true)
  }

 
  return (
    <main className="min-h-screen flex flex-column justify-center items-center">
      <div className="form-container overflow-hidden w-full sm:w-[350px] h-screen sm:h-[650px] bg-white rounded-lg relative shadow-[0_5px_30px_rgba(0,0,0,0.2)]">
        <div className="fluid relative top-0 left-0">
          <img
            src={fluidImg}
            alt="fluid"
            id="fluid"
            onAnimationEnd={() => setFluidAnimate(false)}
            className={`fluid-1 absolute top-[-55px] left-[-50px] w-[330px] rotate-90 scale-100 z-[1] ${
              fluidAnimate ? "fluid-animate" : ""
            }`}
          />
        </div>
        {/* login form ----- container   */}
        <LoginForm
          registerView={registerView}
          loginDynamicStyles={loginDynamicStyles}
        />
        {/* register form ----- container  */}
        <RegisterForm
          registerDynamicStyles={registerDynamicStyles}
          loginView={loginView}
        />
      </div>
    </main>
  );
}

export default App;
