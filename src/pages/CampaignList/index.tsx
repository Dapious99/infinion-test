/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import {
  useFetchAllCampaigns,
  useDeleteCampaign,
} from "../../hooks/useCampaign";
import Button from "../../components/shared/Button";

function CampaignList() {
  const { data, isLoading } = useFetchAllCampaigns();
  const deleteCampaign = useDeleteCampaign();

  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Inactive">(
    "All"
  );
  const [search, setSearch] = useState("");

  if (isLoading) return <p className="p-8 text-center">Loading campaigns...</p>;

  const filtered = data
    ?.filter((item: any) =>
      activeTab === "All" ? true : item.campaignStatus === activeTab
    )
    ?.filter((item: any) =>
      item?.campaignName?.toLowerCase().includes(search.toLowerCase())
    );

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      deleteCampaign.mutate(id);
    }
  };

  return (
    <div className="w-full px-8 py-6">
      <p className="text-lg font-semibold mb-6">All Campaigns</p>

      {/* Tabs + Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {["All", "Inactive", "Active"].map((tab) => {
            const count = data?.filter((x: any) =>
              tab === "All" ? true : x.campaignStatus === tab
            ).length;

            return (
              <Button
                key={tab}
                variant={activeTab === tab ? "primary" : "outline"}
                onClick={() => setActiveTab(tab as any)}
                title={`${tab}(${count})`}
                className="rounded-sm"
              />
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Campaign Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          />
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
              <tr key={item.id} className="">
                <td className="px-4 py-3">{index + 1}.</td>
                <td className="px-4 py-3">{item.campaignName}</td>
                <td className="px-4 py-3">
                  {new Date(item.startDate).toLocaleDateString()}
                </td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    item.campaignStatus === "Active"
                      ? "text-[#009918]"
                      : "text-[#990000]"
                  }`}
                >
                  {item.campaignStatus}
                </td>
                <td className="px-4 py-3 flex gap-3">
                  <Eye
                    className="w-4 h-4 cursor-pointer text-[#666666]"
                    onClick={() => console.log("view", item.id)}
                  />
                  <Edit
                    className="w-4 h-4 cursor-pointer text-[#666666]"
                    onClick={() => console.log("edit", item.id)}
                  />
                  <Trash2
                    className="w-4 h-4 cursor-pointer text-[#666666]"
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <p className="text-right text-xs mt-3 text-gray-500">
        Showing {filtered?.length} of {data?.length} results
      </p>
    </div>
  );
}

export default CampaignList;
