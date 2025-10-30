/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft, X } from "lucide-react";
import { useState, useEffect } from "react";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { allRoutes } from "../../constants/routes";
import {
  useFetchCampaignById,
  useUpdateCampaign,
  useUpdateCampaignStatus,
} from "../../hooks/useCampaign";
import SuccessModal from "../../components/shared/SuccessModal";
import DeleteModal from "../../components/shared/DeleteModal";

const CampaignInformation = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const id = searchParams.get("id")!;
  const mode = searchParams.get("mode");

  const { data, isLoading } = useFetchCampaignById(id || "");
  const updateCampaign = useUpdateCampaign();
  const updateStatus = useUpdateCampaignStatus();

  const [formData, setFormData] = useState<any>({
    campaignName: "",
    campaignDescription: "",
    startDate: "",
    endDate: "",
    digestCampaign: "No",
    linkedKeywords: [],
    dailyDigest: "",
    campaignStatus: "",
  });

  const [newKeyword, setNewKeyword] = useState("");
  const [formEditable, setFormEditable] = useState(mode === "edit");

  // Modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (data) {
      const d = data;
      setFormData({
        campaignName: d?.campaignName,
        campaignDescription: d?.campaignDescription,
        startDate: d?.startDate?.slice(0, 10),
        endDate: d?.endDate?.slice(0, 10),
        digestCampaign: d?.digestCampaign ? "Yes" : "No",
        linkedKeywords: d?.linkedKeywords || [],
        dailyDigest: d?.dailyDigest,
        campaignStatus: d?.campaignStatus,
      });
    }
  }, [data]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setFormData((prev: any) => ({
        ...prev,
        linkedKeywords: [...prev.linkedKeywords, newKeyword.trim()],
      }));
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      linkedKeywords: prev.linkedKeywords.filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  const handleUpdate = () => {
    const payload = {
      id,
      campaignName: formData.campaignName,
      campaignDescription: formData.campaignDescription,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      digestCampaign: formData.digestCampaign === "Yes",
      linkedKeywords: formData.linkedKeywords,
      dailyDigest: formData.dailyDigest,
    };

    updateCampaign.mutate(
      { id, payload },
      {
        onSuccess: () => {
          setShowSuccess(true);
          setFormEditable(false);
        },
      }
    );
  };

  const handleConfirmStatusChange = () => {
    const payload = {
      id,
      campaignStatus: formData.campaignStatus === "Active" ? false : true,
    };

    updateStatus.mutate(
      { id, payload },
      {
        onSuccess: () => {
          setShowDeleteModal(false);
          setShowSuccess(true);
          setFormData((prev: any) => ({
            ...prev,
            campaignStatus: payload.campaignStatus,
          }));
        },
      }
    );
  };

  const toggleCampaignStatus = () => {
    setShowDeleteModal(true);
  };

  if (isLoading) return <p className="p-8 text-center">Loading...</p>;

  const isActive = formData.campaignStatus === "Active";

  return (
    <div className="p-6 max-w-4xl">
      <a
        href={allRoutes.campaign}
        className="flex items-center gap-1 text-sm text-gray-700 mb-6"
      >
        <ArrowLeft size={16} /> Back
      </a>

      <div className="rounded-md overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-teal-600">
            Campaign Information
          </h1>

          <p className="inline-flex gap-2 bg-[#EDF0F0] font-medium rounded-sm px-2 py-3">
            Campaign Status |
            <span
              className={`px-4 py-1 rounded text-sm ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {formData.campaignStatus}
            </span>
          </p>
        </div>

        <div className="p-6 space-y-5">
          <Input
            label="Campaign Name"
            value={formData.campaignName}
            disabled={!formEditable}
            onChange={(e) => handleChange("campaignName", e.target.value)}
          />

          <div>
            <label className="block font-medium md:text-sm mb-2">
              Campaign Description
            </label>
            <textarea
              value={formData.campaignDescription}
              onChange={(e) =>
                handleChange("campaignDescription", e.target.value)
              }
              disabled={!formEditable}
              rows={5}
              className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm disabled:bg-gray-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={formData.startDate}
              disabled={!formEditable}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={formData.endDate}
              disabled={!formEditable}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-2">
              Linked Keywords
            </label>
            {formEditable && (
              <div className="flex gap-2 mb-3">
                <Input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                />
                <Button title="Add" onClick={handleAddKeyword} />
              </div>
            )}
            <div className="flex gap-2 flex-wrap text-sm">
              {formData.linkedKeywords?.map((keyword: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-teal-600 text-white rounded-full flex items-center gap-2"
                >
                  {keyword}
                  {formEditable && (
                    <X
                      size={14}
                      className="cursor-pointer"
                      onClick={() => handleRemoveKeyword(i)}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Want to receive daily digest about the campaign?
            </label>
            <select
              value={formData.digestCampaign}
              onChange={(e) => handleChange("digestCampaign", e.target.value)}
              disabled={!formEditable}
              className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm disabled:bg-gray-50"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Kindly select how often you want to receive daily digest
            </label>
            <select
              value={formData.dailyDigest}
              onChange={(e) => handleChange("dailyDigest", e.target.value)}
              disabled={!formEditable}
              className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm disabled:bg-gray-50"
            >
              <option value="">Select</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4 flex gap-3 border-t">
          <Button
            title={isActive ? "Stop Campaign" : "Start Campaign"}
            onClick={toggleCampaignStatus}
            className={`rounded-sm ${isActive ? "bg-[#990000]" : ""}`}
            variant={isActive ? "primary" : "outline"}
          />

          {formEditable ? (
            <Button
              title="Update Campaign"
              onClick={handleUpdate}
              className="rounded-sm"
            />
          ) : (
            <Button
              title="Edit Information"
              onClick={() => setFormEditable(true)}
              className="rounded-sm"
            />
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        title={isActive ? "Stop Campaign" : "Start Campaign"}
        message={`Are you sure you want to ${
          isActive ? "stop" : "start"
        } campaign ${formData.campaignName}?`}
        buttonText={isActive ? "Stop" : "Start"}
        onClose={() => setShowDeleteModal(false)}
        cancelClick={() => setShowDeleteModal(false)}
        confirmClick={handleConfirmStatusChange}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Campaign Updated Successfully!"
        buttonText="Go Back to Campaign List"
        buttonLink={allRoutes.campaign}
      />
    </div>
  );
};

export default CampaignInformation;
