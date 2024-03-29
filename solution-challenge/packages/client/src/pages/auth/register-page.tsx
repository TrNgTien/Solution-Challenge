import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircleLoading from "@/core/business-component/loading-delay/circle-loading";
// import { RegisterReq } from "@services/AuthService";
// import { IShowPass } from "@constants/InterfaceModel";
// import Icons from "@theme/Icons";
import "./register-age.scss";

export default function RegisterPage(props: any) {
  let navigate = useNavigate();
  const initial_form = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    day: "1",
    month: "1",
    year: "2022",
    gender: "",
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [form, setForm] = useState<any>(initial_form);

  const onChangeForm = (e: ChangeEvent<any>) => {
    const valueInput = e.target.value;
    setForm({ ...form, [e.target.name]: valueInput });
  };
  // const RenderIcon = ({ showPassword }: IShowPass) => {
  //   if (!showPassword) return <AiFillEyeInvisible />;
  //   else return <AiFillEye />;
  // };
  const finishSignUp = async (e: any) => {
    e.preventDefault();
    setIsRegistering(true);
    if (
      !form.firstName ||
      !form.lastName ||
      !form.userName ||
      !form.password ||
      !form.gender
    ) {
      setIsRegistering(false);
      alert("Please fill all the information!");
    } else if (form.password.length < 6) {
      setIsRegistering(false);
      alert("Please input password at least 6 characters!");
    } else {
      // await RegisterReq(form)
      //   .then(() => {
      //     setIsRegistering(false);
      //     navigate(-1);
      //   })
      //   .catch(() => {
      //     setIsRegistering(false);
      //     alert("Something went wrong!");
      //   });
    }
  };

  function cancelSignUp() {
    navigate(-1);
  }
  return (
    <div className="register-page">
      {isRegistering && <CircleLoading />}
      <div className="container-form">
        <form onSubmit={finishSignUp}>
          <div className="register-form__header">
            <h1 className="title-signup">Sign Up</h1>
            <p className="register-page__authen-slogan">It's quick and easy</p>
          </div>
          <img
            className="close-btn-img"
            // src={Icons.CLOSE_IC}
            alt=""
            onClick={() => cancelSignUp()}
          />
          <div className="register-hr"></div>
          <div className="register-page__wrapper-input">
            <div className="register-page__wrapper__name">
              <input
                type="text"
                name="firstName"
                className="input__firstname"
                placeholder="First name"
                onChange={onChangeForm}
              />

              <input
                type="text"
                name="lastName"
                className="input__surname"
                placeholder="Surname"
                onChange={onChangeForm}
              />
            </div>
            <div className="register-page__wrapper__username">
              <input
                type="text"
                id="userName"
                name="userName"
                onChange={onChangeForm}
                placeholder="Your Account"
                className="register-input__username"
              />
            </div>
            <div className="register-page__wrapper-password">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                onChange={onChangeForm}
                placeholder="New password"
                className="register-input__password"
              />
              {/* <i
                className="icon-password--hidden"
                onClick={() => setShowPassword(!showPassword)}
              >
                <RenderIcon showPassword={showPassword} />
              </i> */}
            </div>
          </div>
          <div className="bottom-register-container">
            <input className="button-register" type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  );
}
