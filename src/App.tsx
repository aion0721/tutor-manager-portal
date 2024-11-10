import "./App.css";
import { useState } from "react";
import { Menubar } from "primereact/menubar";
import { Card } from "primereact/card";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Home from "./components/Home";
import Report from "./components/Report";

import logo from "./logo.png";
import Question from "./components/Question";
import Survey from "./components/Survey";
import UserInfo from "./components/utils/UserInfo";

interface MenuItem {
  label: string;
  icon: string;
  command: () => void;
  className?: string;
}

const start = (
  <div className="flex align-items-center mr-2">
    <img alt="logo" src={logo} height="40" className="mr-2" />
    <span className="font-bold text-2xl">Tutor-Manager-Portal</span>
  </div>
);

const end = (
  <div className="flex align-items-center">
    <UserInfo />
  </div>
);

const App: React.FC = () => {
  const [activeContent, setActiveContent] = useState("home");

  const menuItems: MenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => setActiveContent("home"),
      className: activeContent === "home" ? "active-menu-item" : "",
    },
    {
      label: "Report",
      icon: "pi pi-fw pi-flag",
      command: () => setActiveContent("report"),
      className: activeContent === "report" ? "active-menu-item" : "",
    },
    {
      label: "Question",
      icon: "pi pi-fw pi-question",
      command: () => setActiveContent("question"),
      className: activeContent === "question" ? "active-menu-item" : "",
    },
    {
      label: "Survey",
      icon: "pi pi-fw pi-lightbulb",
      command: () => setActiveContent("survey"),
      className: activeContent === "survey" ? "active-menu-item" : "",
    },
  ];

  const renderContent = () => {
    switch (activeContent) {
      case "home":
        return <Home />;
      case "report":
        return <Report />;
      case "question":
        return <Question />;
      case "survey":
        return <Survey />;
      default:
        return <Card title="404">Not found contents...</Card>;
    }
  };

  return (
    <div className="layout">
      <header>
        <Menubar model={menuItems} start={start} end={end} />
      </header>

      <main className="content">{renderContent()}</main>

      <footer className="footer">
        <p>Tutor Manager Portal</p>
      </footer>
    </div>
  );
};

export default App;
