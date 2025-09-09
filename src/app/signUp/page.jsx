"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./style.css";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button, Backdrop, CircularProgress } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

const auth = getAuth(app);

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    conformPassword: "",
  });

  const onChangeField = (e) => {
    setFormFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const signUp = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (formFields.password !== formFields.conformPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setShowLoader(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formFields.email, formFields.password);
      const user = userCredential.user;

      setFormFields({ email: "", password: "", conformPassword: "" });
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <section className="signIn mb-5">
      <div className="breadcrumbWrapper res-hide">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2 mb-0">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>SignUp</li>
          </ul>
        </div>
      </div>

      <div className="loginWrapper">
        <div className="card shadow">
          <Backdrop sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showLoader}>
            <CircularProgress color="inherit" />
          </Backdrop>

          <h3>SignUp</h3>
          <form className="mt-4" onSubmit={signUp}>
            <div className="form-group mb-4 w-100">
              <TextField id="email" type="email" name="email" label="Email" className="w-100" onChange={onChangeField} value={formFields.email} />
            </div>

            <div className="form-group mb-4 w-100">
              <div className="position-relative">
                <TextField id="password" type={showPassword ? "text" : "password"} name="password" label="Password" className="w-100" onChange={onChangeField} value={formFields.password} />
                <Button type="button" className="icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </Button>
              </div>
            </div>

            <div className="form-group mb-4 w-100">
              <div className="position-relative">
                <TextField id="conformPassword" type={showPassword1 ? "text" : "password"} name="conformPassword" label="Confirm Password" className="w-100" onChange={onChangeField} value={formFields.conformPassword} />
                <Button type="button" className="icon" onClick={() => setShowPassword1(!showPassword1)}>
                  {showPassword1 ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </Button>
              </div>
            </div>

            {errorMsg && <p className="text-danger text-center">{errorMsg}</p>}

            <div className="form-group mt-5 mb-4 w-100">
              <Button type="submit" className="btn btn-g btn-lg w-100">
                Sign Up
              </Button>
            </div>

            <p className="text-center">
              Already have an account <b><Link href="/signIn">Sign In</Link></b>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
