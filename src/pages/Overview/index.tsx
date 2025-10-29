import { Calendar, ChevronDown, Plus, Share } from "lucide-react";
import Button from "../../components/shared/Button";
import emptyOverview from "../../assets/emptyOverview.svg";
import { Link } from "wouter";
import { allRoutes } from "../../constants/routes";

const Overview = () => {
  return (
    <div className="space-y-10">
      <div className="px-6 border-gray-200 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Overview</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
            <div className="flex gap-2 items-center">
              <Calendar size={15} className="text-primary" />
              <span>Date Range</span>
            </div>
            <span className="text-gray-500">Nov 1, 2022 - Nov 7, 2022</span>
            <ChevronDown size={16} />
          </div>
          <Button
            title="Export"
            icon={<Share className="size-4" />}
            className="bg-[#F0F4F4] text-primary rounded-sm"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-">
        <div>
          <img src={emptyOverview} alt="" />
        </div>
        <p className="text-[#000000] font-semibold text-sm mb-6">
          No activity yet. Create anew campaign to get started
        </p>
        <Link href={allRoutes.create}>
          <Button
            title="New Campaign"
            icon={<Plus size={18} />}
            className="rounded-sm w-48"
          />
        </Link>
      </div>
    </div>
  );
};

export default Overview;
