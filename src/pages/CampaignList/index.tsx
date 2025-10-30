/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useFetchAllCampaigns } from "../../hooks/useCampaign";

function CampaignList() {
  const { data, isLoading } = useFetchAllCampaigns();
  console.log("coming data", data);
  const [activeTab, setActiveTab] = useState<"ALL" | "ACTIVE" | "INACTIVE">(
    "ALL"
  );
  const [search, setSearch] = useState("");

  if (isLoading) return <p className="p-8 text-center">Loading campaigns...</p>;

  const filtered = data
    ?.filter((item: any) =>
      activeTab === "ALL" ? true : item.status === activeTab
    )
    ?.filter((item: any) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="w-full px-8 py-6">
      <p className="text-lg font-semibold mb-6">All Campaigns</p>

      {/* Tabs + Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {["ALL", "INACTIVE", "ACTIVE"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-3 py-1 rounded-md border text-sm ${
                activeTab === tab
                  ? "bg-[#247B7B] text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              {tab} (
              {
                data?.filter((x: any) =>
                  tab === "ALL" ? true : x.status === tab
                ).length
              }
              )
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          />

          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option>Filter by date</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">S/N</th>
              <th className="px-4 py-3 text-left">Campaign Name</th>
              <th className="px-4 py-3 text-left">Start Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered?.map((item: any, index: number) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-3">{index + 1}.</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.startDate}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    item.status === "ACTIVE" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.status}
                </td>
                <td className="px-4 py-3 flex gap-3">
                  <Eye className="w-4 h-4 cursor-pointer text-gray-700" />
                  <Edit className="w-4 h-4 cursor-pointer text-gray-700" />
                  <Trash2 className="w-4 h-4 cursor-pointer text-gray-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination UI (STATIC as seen in screenshot) */}
      <div className="flex justify-center items-center gap-2 mt-6 text-sm">
        <button>{`<`}</button>
        <button className="w-6 h-6 flex justify-center items-center rounded-full bg-[#247B7B] text-white">
          2
        </button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>{`>`}</button>
      </div>

      <p className="text-right text-xs mt-3 text-gray-500">
        showing 10 of {data?.length} results
      </p>
    </div>
  );
}

export default CampaignList;
