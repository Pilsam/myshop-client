"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import "./style.css";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button, Backdrop, CircularProgress } from "@mui/material";
import GoogleImg from "../../assets/images/google.png";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useRouter } from "next/navigation";
import { MyContext } from "@/context/ThemeContext";
import Image from "next/image";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const router = useRouter();

  const onChangeField = (e) => {
    setFormFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const signIn = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setShowLoader(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formFields.email, formFields.password);
      const user = userCredential.user;

      localStorage.setItem("isLogin", "true");
      context.signIn();
      setFormFields({ email: "", password: "" });

      router.push("/");
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setShowLoader(false);
    }
  };

  const signInWithGoogle = async () => {
    setShowLoader(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("isLogin", "true");

      context.signIn();
      router.push("/");
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <section className="signIn mb-5">
      <div className="breadcrumbWrapper">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2 mb-0">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Sign In</li>
          </ul>
        </div>
      </div>

      <div className="loginWrapper">
        <div className="card shadow">
          <Backdrop sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showLoader}>
            <CircularProgress color="inherit" />
          </Backdrop>

          <h3>Sign In</h3>
          <form className="mt-4" onSubmit={signIn}>
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

            {errorMsg && <p className="text-danger text-center">{errorMsg}</p>}

            <div className="form-group mt-5 mb-4 w-100">
              <Button type="submit" className="btn btn-g btn-lg w-100">
                Sign In
              </Button>
            </div>

            <div className="form-group mt-5 mb-4 w-100 signInOr">
              <p className="text-center">OR</p>
              <Button className="w-100" variant="outlined" type="button" onClick={signInWithGoogle}>
                <Image src={GoogleImg} alt="Google" width={30} height={30} />
                Sign In with Google
              </Button>
            </div>

            <p className="text-center">
              Not have an account <b><Link href="/signUp">Sign Up</Link></b>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
