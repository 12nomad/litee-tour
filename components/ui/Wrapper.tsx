import { ReactNode } from "react";

interface IWrapper {
  children: ReactNode;
}

const Wrapper = ({ children }: IWrapper) => {
  return <div className="w-full px-8 mx-auto max-w-7xl">{children}</div>;
};

export default Wrapper;
