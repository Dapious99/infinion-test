import { ChevronDown, HelpCircle, Plus, Search } from "lucide-react";
import type { ReactNode } from "react";
import logo from "../assets/schultz.svg";
import Button from "./shared/Button";
import { Link, useLocation } from "wouter";
import market from "../assets/navigationImage/market.svg";
import overview from "../assets/navigationImage/overview.svg";
import settings from "../assets/navigationImage/settings.svg";
import campaign from "../assets/navigationImage/campaign.svg";
import bell from "../assets/bell.svg";
import person from "../assets/person.svg";
import { allRoutes } from "../constants/routes";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navItems = [
    {
      label: "Overview",
      path: allRoutes.overview,
      icon: overview,
    },
    {
      label: "Campaign",
      path: allRoutes.campaign,
      icon: campaign,
    },
    {
      label: "Market Intelligence",
      path: allRoutes.market,
      icon: market,
    },
    {
      label: "Account Settings",
      path: allRoutes.settings,
      icon: settings,
    },
  ];

  const [location] = useLocation();

  return (
    <div className="flex h-screen bg-[#FAFAFA] text-gray-700">
      {/* Sidebar */}
      <aside className="w-[292px] bg-[#F0F4F4] border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="px-5 py-4 border-gray-200 flex items-center gap-2">
          <div>
            <img src={logo} alt="" />
          </div>
          <p className="text-[32px] font-bold bg-linear-to-r from-[#247B7B] to-[#3B247B] bg-clip-text text-transparent">
            Scrutz
          </p>
        </div>

        {/* New Campaign */}
        <div className="px-5 py-4 space-y-6">
          <Link href={allRoutes.create}>
            <Button
              title="New Campaign"
              className="rounded-sm"
              icon={<Plus size={16} />}
            />
          </Link>

          {/* Navigation */}
          <nav className="flex-1 px-3 mt-2 space-y-1 text-sm">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link href={item.path} key={item.label}>
                  <a
                    className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer
                ${
                  isActive
                    ? "bg-[#E6F7F6] text-[#00A99D]"
                    : "hover:bg-gray-100 text-gray-700"
                }
              `}
                  >
                    <img src={item.icon} alt={item.label} className="w-4 h-4" />
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Help Box */}
        <div className="px-6 py-10 bg-white text-center w-fit mx-auto rounded-sm text-xs">
          <HelpCircle className="mx-auto text-primary mb-1" size={20} />
          <p className="font-semibold text-sm bg-linear-to-r from-[#247B7B] to-[#3B247B] bg-clip-text text-transparent mb-0.5">
            Need help?
          </p>
          <p className="text-[#666666] text-xs font-medium mb-3">
            We’re readily available to provide help
          </p>
          <Button title="Get help" variant="outline" className="rounded-sm" />
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="max-w-md w-full">
            <div className="relative">
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#00A99D] outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={bell}
              alt="notification icon"
              className="text-[#333333] w-4 h-5"
            />

            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full font-medium text-sm">
              <img
                src={person}
                alt="a empty profile image"
                className="size-9"
              />
              BigTech
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
