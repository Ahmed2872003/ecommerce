// Modules
import { Link } from "react-router-dom";
// CSS
import "./Header.css";

export default function Header({ user }) {
  return (
    <header id="main-header">
      <Link to="/" className="p-2">
        <img
          src={require("./images/amz-white-logo.png")}
          alt="amz-logo"
          width="113"
        />
      </Link>
      <form className="search">
        <select name="category" defaultValue="All">
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Computers">Computers</option>
          <option value="Fitness">Fitness</option>
          <option value="Cameras">Cameras</option>
          <option value="Home">Home</option>
        </select>
        <input placeholder="Search Amazon" type="text" />
        <button type="submit" className="hover-yellow">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </header>
  );
}
