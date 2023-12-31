import { Button, Input } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./AuthConfig/Api";
import { toast } from "react-toastify";
import { MyContext } from "./Context/TaskContext";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const route = useNavigate();
  const { state, login } = useContext(MyContext);

  // console.log(user);

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
    const { email, password } = user;

    if (email && password) {
      try {
        const response = await api.post("/login", { user });

        if (response.data.success) {
          toast.success(response.data.message);

          const userData = response.data.userData;
          const token = response.data.token;
          login(userData, token);
          setUser({
            email: "",
            password: "",
          });
          route("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("all fields are mandatory");
    }
  };
  return (
    <>
      <div className="w-7/12 ml-auto mr-auto mt-5">
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            className="w-7/12 ml-auto mr-auto mt-5"
            onChange={handleChange}
            value={user.email}
            name="email"
          />
          <Input
            type="password"
            className="w-7/12 ml-auto mr-auto mt-5"
            onChange={handleChange}
            value={user.password}
            name="password"
          />

          <Button
            className="w-7/12 ml-auto mr-auto mt-5"
            type="submit"
            variant="ghost"
            color="danger"
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
