import logo from "../../logo.svg";
import "./header.css";

export default function Header() {
  return (
    <header>
      <h1>
        <a href="https://www.equalexperts.com" title="EE homepage">
          <img src={logo} alt="[=] Equal Experts"></img>
        </a>
      </h1>
    </header>
  );
}
