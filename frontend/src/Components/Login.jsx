import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginUser } from "../Store/UserSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const route = useNavigate();
  const dispatch = useDispatch();

  // console.log(user);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (email && password) {
      dispatch(LoginUser(user));

      setUser({
        email: "",
        password: "",
      });
      route("/");
    } else {
      alert("all fields are mandatory");
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            className="border border-black-600"
            onChange={handleChange}
            value={user.email}
            name="email"
          />
          <Input
            type="password"
            className="border border-black-600"
            onChange={handleChange}
            value={user.password}
            name="password"
          />

          <Button type="submit" variant="ghost" color="danger">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
