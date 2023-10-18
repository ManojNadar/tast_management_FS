import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../Store/UserSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const route = useNavigate();

  //   console.log(user);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = user;

    if (name && email && password) {
      dispatch(RegisterUser(user));

      setUser({
        name: "",
        email: "",
        password: "",
      });

      route("/login");
    } else {
      alert("all fields are mandatory");
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            className="border border-black-600"
            onChange={handleChange}
            value={user.name}
            name="name"
          />
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

          <Button type="submit" variant="ghost" color="primary">
            Register
          </Button>
        </form>
      </div>
    </>
  );
};

export default Register;
