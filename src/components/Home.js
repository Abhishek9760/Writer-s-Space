import React from "react";
import Login from "./auth/Login";
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
    </animated.div>
  );
};

export default Home;
