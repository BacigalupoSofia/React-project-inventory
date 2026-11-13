import { sidebar } from "../components/Sidebar";

export default function DashboardLayout({ sidebar, children }) {
  return (
    <div className="inventory-layout">
      <section className="side-bar-categories">{sidebar}</section>

      <section className="grid-layout">
        <div className="search-bar">Search bar</div>

        {children}
      </section>
    </div>
  );
}

//layout to share sidebar and main content
