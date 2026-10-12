import {Link} from "react-router-dom";

export default function Header() {
  return (
    <header className="header w-100">
      <img
        src="inventory-react\public\logo.png"
        alt="Logo"
        className="logo-image"
      />
      <div>
        <h1>Dental Inventory App</h1>
        <p>The solution for managing dental inventory</p>
      </div>

      <div className="header-buttons">
        <Link to="#" > Home </Link>
        <Link to="#" > Stock </Link>
        <Link to="#" > Providers </Link>
        <Link to="#" > My Orders </Link>
      </div>
    </header>
  );
}
