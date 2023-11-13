"use client";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PropagateLoader from 'react-spinners/PropagateLoader'
import FormInput from "@/form/formInput";
import ReactForm from "@/form/hookForm";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { isLoggedIn, storeUserInfo } from "@/redux/services/authService";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler } from "react-hook-form";
import SignInImage from "../../../public/Sign in.svg";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoginPage = () => {
  const router = useRouter();
  const [userLogin, { error, isLoading }] = useUserLoginMutation();
    // let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  type FormValues = {
    email: string;
    password: string;
  };
  const userLoggedIn = isLoggedIn();

  if (userLoggedIn) {
    router.push("/profile");
  }

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();

      if (!res || res === undefined) {
        router.push("/login");
      }
      if (res && res.token) {
       
        storeUserInfo({ token: res?.token });
        router.push("/profile");
      }
    } catch (error: any) {
   
      toast.error(error?.data.data);
    }
  };
  if (isLoading) {
    return (
 
        <div className="w-full h-screen flex flex-row justify-center items-center">
          {" "}
          {/* <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> */}
          <PropagateLoader 
          color="#36d7b7" 
          cssOverride={override}
          
          />
        </div>
      
    );
  }
  return (
    <div className="w-full">
      <ToastContainer />
      <Row style={{ width: "100%", height: "100vh", margin: "auto" }}>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          xs={2}
          sm={12}
          md={16}
          lg={16}
          xl={14}
        >
          <Image
            style={{}}
            src={SignInImage}
            alt="No Image"
            height={500}
            width={500}
          />
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            gap: "20px",
          }}
          xs={20}
          sm={12}
          md={8}
          lg={8}
          xl={10}
        >
          <h1 className="text-2xl font-bold">Sign In Form</h1>

          <ReactForm submitHandler={onSubmit}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div>
                <FormInput
                  name="email"
                  type="text"
                  size="large"
                  label="User Email"
                />
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="User Password"
                />
              </div>
              <Button
                style={{ fontSize: "20px", height: "40px" }}
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
            </div>
          </ReactForm>
          <div>
            <h2>Do not have Account?</h2>
            <Button onClick={() => router.push("/register")} type="primary">
              Go Register
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
