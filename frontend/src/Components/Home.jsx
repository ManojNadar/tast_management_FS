import React from "react";
import NavSection from "./NavSection";

import { Input, Button } from "@nextui-org/react";

const Home = () => {
  const assignTask = () => {};
  return (
    <>
      <NavSection />

      <div className="flex w-full">
        <Input
          isRequired
          type="email"
          defaultValue="Add Task"
          className="w-full border border-blue-600"
        />

        <Button color="warning" onClick={assignTask}>
          Assign Task
        </Button>
      </div>
    </>
  );
};

export default Home;
