import React from "react";
import Login from "./auth/Login";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const Home = () => {
  const styleProps = useSpring({
    opacity: 1,
    marginLeft: 0,
    from: { opacity: 0, marginLeft: -1000 },
  });
  return (
    <animated.div style={styleProps}>
      <Login />
      <p className="my-2">
        Not a user?{" "}
        <Link to="/register" className="link">
          Sign up
        </Link>
      </p>
    </animated.div>
  );
};

export default Home;
