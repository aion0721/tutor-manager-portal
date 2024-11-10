import "./App.css";
import { useState } from "react";
import { Menubar } from "primereact/menubar";
import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Home from "./components/Home";
import Report from "./components/Report";

const App: React.FC = () => {
  const [activeContent, setActiveContent] = useState("home");

  const menuItems = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => setActiveContent("home"),
    },
    {
      label: "Report",
      icon: "pi pi-fw pi-flag",
      command: () => setActiveContent("report"),
    },
  ];

  const renderContent = () => {
    switch (activeContent) {
      case "home":
        return <Home />;
      case "report":
        return <Report />;
      default:
        return <Card title="404">Not found contents...</Card>;
    }
  };

  return (
    <div className="layout">
      <header>
        <Menubar model={menuItems} />
      </header>

      <main className="content">{renderContent()}</main>

      <footer className="footer">
        <p>aaa</p>
      </footer>
    </div>
  );
};

export default App;
