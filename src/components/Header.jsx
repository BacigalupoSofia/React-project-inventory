import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header w-100 position-relative">
      <div className="header-content d-flex align-items-center mx-3 gap-3">
        <img src="../../public/logo.png" alt="Logo" className="logo-image" />
        <div>
          <h1>Dental Inventory App</h1>
          <p>The solution for managing dental inventory</p>
        </div>
      </div>

      <div className="header-buttons d-flex flex-row position-absolute top-100 end-0 translate-middle-y gap-2 me-5">
        <Link to="#" className=" btn-header">
          Home
        </Link>
        <Link to="#" className=" btn-header">
          Stock
        </Link>
        <Link to="#" className=" btn-header">
          Providers
        </Link>
        <Link to="#" className=" btn-header">
          My Orders
        </Link>
      </div>
    </header>
  );
}
