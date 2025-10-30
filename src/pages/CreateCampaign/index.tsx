import { useEffect, useState } from "react";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { Link } from "wouter";
import { allRoutes } from "../../constants/routes";
import { useCreateCampaign } from "../../hooks/useCampaign";
import { convertToISO } from "../../utils";
import SuccessModal from "../../components/shared/SuccessModal";

interface FormData {
  campaignName: string;
  description: string;
  startDate: string;
  endDate: string;
  digestCampaign: boolean;
  linkedKeywords: string;
  dailyDigest: string;
}

interface FormErrors {
  campaignName?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  linkedKeywords?: string;
  dailyDigest?: string;
}

const CreateCampaign = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    campaignName: "",
    description: "",
    startDate: "",
    endDate: "",
    digestCampaign: false,
    linkedKeywords: "",
    dailyDigest: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const {
    mutate: createCampaign,
    isPending,
    isSuccess,
    isError,
  } = useCreateCampaign();

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.campaignName.trim()) {
      newErrors.campaignName = "Campaign name is required";
    }

    if (!formData.startDate.trim()) {
      newErrors.startDate = "Start date is required";
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.startDate)) {
      newErrors.startDate = "Invalid date format (dd/mm/yyyy)";
    }

    if (formData.endDate && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.endDate)) {
      newErrors.endDate = "Invalid date format (dd/mm/yyyy)";
    }

    if (!formData.linkedKeywords.trim()) {
      newErrors.linkedKeywords = "Linked keywords are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const payload = {
      campaignName: formData.campaignName,
      campaignDescription: formData.description,
      startDate: convertToISO(formData.startDate),
      endDate: convertToISO(formData.endDate),
      digestCampaign: formData.digestCampaign,
      linkedKeywords: formData.linkedKeywords
        .split(",")
        .map((kw) => kw.trim())
        .filter(Boolean),
      dailyDigest: formData.dailyDigest,
    };

    createCampaign(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setFormData({
        campaignName: "",
        description: "",
        startDate: "",
        endDate: "",
        digestCampaign: false,
        linkedKeywords: "",
        dailyDigest: "",
      });
      setErrors({});
    }
  }, [isSuccess]);

  if (isError) {
    alert("An error occured");
    return;
  }

  return (
    <div className="p-8 min-w-4xl">
      <h1 className="text-xl font-semibold text-primary mb-6">
        Create New Campaign
      </h1>

      <div className="space-y-5">
        <Input
          label="Campaign Name *"
          placeholder="e.g. The Future is now"
          value={formData.campaignName}
          onChange={(e) => handleInputChange("campaignName", e.target.value)}
          required
          error={errors.campaignName}
        />

        <div>
          <label className="block font-medium md:text-sm mb-2">
            Campaign Description
          </label>
          <textarea
            placeholder="Please add a description to your campaign"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={5}
            className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:ring-0"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Start Date *"
            type="text"
            placeholder="dd/mm/yyyy"
            value={formData.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
            required
            error={errors.startDate}
          />
          <Input
            label="End Date"
            type="text"
            placeholder="dd/mm/yyyy"
            value={formData.endDate}
            onChange={(e) => handleInputChange("endDate", e.target.value)}
            error={errors.endDate}
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <label className="text-sm text-gray-700">
            Want to receive daily digest about the campaign?
          </label>
          <button
            onClick={() =>
              handleInputChange("digestCampaign", !formData.digestCampaign)
            }
            className={`relative w-12 h-6 rounded-full transition-colors ${
              formData.digestCampaign ? "bg-purple-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                formData.digestCampaign ? "translate-x-6" : ""
              }`}
            ></div>
          </button>
        </div>

        <Input
          label="Linked Keywords *"
          placeholder="Fidelity,Bank,Area"
          value={formData.linkedKeywords}
          onChange={(e) => handleInputChange("linkedKeywords", e.target.value)}
          required
          error={errors.linkedKeywords}
        />

        <div>
          <label className="block text-sm font-medium mb-2">
            Kindly select how often you want to receive daily digest
          </label>
          <select
            value={formData.dailyDigest}
            onChange={(e) => handleInputChange("dailyDigest", e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <Link href={allRoutes.campaign}>
            {" "}
            <Button
              title="Cancel"
              variant="outline"
              className="px-10 rounded-sm"
              disabled={isPending}
            />
          </Link>
          <Button
            title={isPending ? "Creating..." : "Create Campaign"}
            variant="primary"
            onClick={handleSubmit}
            disabled={isPending}
            className="rounded-sm"
          />
        </div>
      </div>
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Campaign Successfully Created!"
        buttonText="Go Back to Campaign List"
        buttonLink={allRoutes.campaign}
      />
    </div>
  );
};

export default CreateCampaign;
