import React, { useState, useEffect, useContext } from "react";
import { Input, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import api from "./AuthConfig/Api";
import { toast } from "react-toastify";
import { MyContext } from "./Context/TaskContext";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const route = useNavigate();
  const { state } = useContext(MyContext);

  //   console.log(user);

  useEffect(() => {
    if (state?.currentuser) {
      route("/");
    }
  }, [state?.currentuser, route]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = user;

    if (name && email && password) {
      try {
        const response = await api.post("/register", { user });
        if (response.data.success) {
          toast.success(response.data.message);
          setUser({
            name: "",
            email: "",
            password: "",
          });
          route("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("all fields are mandatory");
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
