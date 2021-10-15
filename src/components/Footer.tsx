import { FC } from "react";

const Footer: FC<any> = () => {
  return (
    <footer className="App-footer">
      <a href="https://twitter.com/ZachThat" target="_blank" rel="noreferrer">
        Created by @idealconceptz
      </a>
      -
      <a
        href="https://github.com/idealconceptz/mobilenet-tensorflow"
        target="_blank"
        rel="noreferrer"
      >
        Code available on Github
      </a>
    </footer>
  );
};
export default Footer;
