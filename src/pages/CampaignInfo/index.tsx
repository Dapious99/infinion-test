import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { Link } from "wouter";
import { allRoutes } from "../../constants/routes";

interface CampaignInfoProps {
  isEditable: boolean;
}

const CampaignInformation = ({ isEditable = false }: CampaignInfoProps) => {
  const [editable, setEditable] = useState(isEditable);
  const [formData, setFormData] = useState({
    campaignName: "Fidelity Bank",
    startDate: "27/10/2022",
    endDate: "27/11/2022",
    dailyDigest: "Yes",
    digestTime: "Monthly",
  });
  const [keywords, setKeywords] = useState(["Fidelity", "Bank"]);

  return (
    <div className="p-8">
      <Link
        href={allRoutes.campaign}
        className="flex items-center gap-1 text-sm text-gray-700 mb-6"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <div className="max-w-2xl">
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <h1 className="text-lg font-semibold text-teal-600">
            Campaign Information
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Campaign Status</span>
            <span className="px-4 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
              Active
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="p-6 space-y-5">
            <Input
              label="Campaign Name"
              labelClassName="text-xs"
              value={formData.campaignName}
              disabled={!editable}
              onChange={(e) =>
                setFormData({ ...formData, campaignName: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                labelClassName="text-xs"
                value={formData.startDate}
                disabled={!editable}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
              <Input
                label="End Date"
                labelClassName="text-xs"
                value={formData.endDate}
                disabled={!editable}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">
                Linked Keywords
              </label>
              <div className="flex gap-2 flex-wrap">
                {keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-teal-600 text-white rounded-full text-sm flex items-center gap-2"
                  >
                    {keyword}
                    {editable && (
                      <button
                        onClick={() =>
                          setKeywords(keywords.filter((_, i) => i !== index))
                        }
                      >
                        <X size={14} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">
                Want to receive daily digest about the campaign?
              </label>
              <select
                value={formData.dailyDigest}
                disabled={!editable}
                onChange={(e) =>
                  setFormData({ ...formData, dailyDigest: e.target.value })
                }
                className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm bg-white disabled:text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">
                Kindly select the time you want to receive daily digest
              </label>
              <select
                value={formData.digestTime}
                disabled={!editable}
                onChange={(e) =>
                  setFormData({ ...formData, digestTime: e.target.value })
                }
                className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm bg-white disabled:text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option>Monthly</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 flex gap-3 border-t border-gray-200">
          <Button
            title="Stop Campaign"
            variant="primary"
            className="bg-[#990000] hover:bg-[#990000] rounded-sm"
          />
          <Button
            title="Edit Information"
            variant="outline"
            onClick={() => setEditable(true)}
            className="rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignInformation;
