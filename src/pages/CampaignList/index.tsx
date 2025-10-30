/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import {
  useFetchAllCampaigns,
  useDeleteCampaign,
} from "../../hooks/useCampaign";
import Button from "../../components/shared/Button";
import SuccessModal from "../../components/shared/SuccessModal";
import DeleteModal from "../../components/shared/DeleteModal";
import { allRoutes } from "../../constants/routes";
import { Link } from "wouter";

function CampaignList() {
  const { data, isLoading } = useFetchAllCampaigns();
  const { mutate: deleteCampaign, isSuccess: deleteSuccess } =
    useDeleteCampaign();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Inactive">(
    "All"
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (deleteSuccess) {
      setShowSuccess(true);
      setShowDeleteModal(false);
    }
  }, [deleteSuccess]);

  if (isLoading) return <p className="p-8 text-center">Loading campaigns...</p>;

  const filtered = data
    ?.filter((item: any) =>
      activeTab === "All"
        ? true
        : item.campaignStatus?.toLowerCase() === activeTab.toLowerCase()
    )
    ?.filter((item: any) =>
      item?.campaignName?.toLowerCase().includes(search.toLowerCase())
    );

  const handleOpenDelete = (id: number) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) deleteCampaign(selectedId);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  return (
    <div className="w-full px-8 py-6">
      <p className="text-lg font-semibold mb-6">All Campaigns</p>

      {/* Tabs + Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {["All", "Inactive", "Active"].map((tab) => {
            const count = data?.filter((x: any) =>
              tab === "All"
                ? true
                : x.campaignStatus?.toLowerCase() === tab.toLowerCase()
            ).length;

            return (
              <Button
                key={tab}
                variant={activeTab === tab ? "primary" : "outline"}
                onClick={() => setActiveTab(tab as any)}
                title={`${tab} (${count})`}
                className="rounded-sm"
              />
            );
          })}
        </div>

        <input
          type="text"
          placeholder="Search Campaign Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2.5 text-sm"
        />
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
              <tr key={item.id}>
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
                  <Link href={`${allRoutes.info}?id=${item.id}&mode=view`}>
                    <Eye className="w-4 h-4 cursor-pointer text-[#666]" />
                  </Link>
                  <Link href={`${allRoutes.info}?id=${item.id}&mode=edit`}>
                    <Edit className="w-4 h-4 cursor-pointer text-[#666]" />
                  </Link>
                  <Trash2
                    className="w-4 h-4 cursor-pointer text-[#666]"
                    onClick={() => {
                      handleOpenDelete(item.id);
                      setSelectedName(item.campaignName);
                    }}
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

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        title="Delete Campaign"
        message={`Are you sure you want to delete ${selectedName} This action cannot be undone.`}
        buttonText="Delete"
        onClose={handleCancelDelete}
        cancelClick={handleCancelDelete}
        confirmClick={handleConfirmDelete}
      />

      {/* Success After Deletion */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Campaign Deleted!"
        buttonText="Go Back to Campaign List"
        buttonLink={allRoutes.campaign}
      />
    </div>
  );
}

export default CampaignList;
