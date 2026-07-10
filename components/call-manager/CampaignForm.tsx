import React, { useState } from "react";
import { FileSpreadsheet, User, Calendar, Rocket, ChevronDown } from "lucide-react";
import EditableScript from "./EditableScript";
import UploadSource from "./UploadSource";
import { CampaignFormData, UploadSourceType } from "./types";

interface CampaignFormProps {
  formData: CampaignFormData;
  onChange: (data: Partial<CampaignFormData>) => void;
  onSubmit: () => void;
  errors: Record<string, string>;
  
  // Upload specific props
  onFileUpload: (file: File) => void;
  fileUploaded: boolean;
  fileName?: string;
  fileSize?: string;
  totalContacts?: number;
  onGoogleSheetLoaded?: (contacts: any[], sheetId: string) => void;
}

const agents = ["Voice-A (Sales)", "Voice-B (Support)", "Voice-C (Followup)", "Voice-D (Survey)"];

export default function CampaignForm({
  formData,
  onChange,
  onSubmit,
  errors,
  onFileUpload,
  fileUploaded,
  fileName,
  fileSize,
  totalContacts,
  onGoogleSheetLoaded,
}: CampaignFormProps) {
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);

  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-bold text-[#111827] dark:text-white">Campaign Details</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Configure your AI calling campaign.</p>
        </div>

        <div className="space-y-5">
        {/* Campaign Title */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#111827] dark:text-zinc-100">
            <FileSpreadsheet className="h-3.5 w-3.5" />
            Campaign Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.campaignTitle}
            onChange={(e) => onChange({ campaignTitle: e.target.value })}
            placeholder="e.g. Q3 Marketing Outreach"
            className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm transition placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:bg-zinc-900 dark:placeholder:text-zinc-600 ${
              errors.campaignTitle ? 'border-red-400 dark:border-red-500' : 'border-zinc-200 focus:border-violet-400 dark:border-zinc-700'
            }`}
          />
          {errors.campaignTitle && <p className="text-xs font-medium text-red-500">{errors.campaignTitle}</p>}
        </div>

        {/* Select AI Agent */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#111827] dark:text-zinc-100">
            <User className="h-3.5 w-3.5" />
            Select AI Agent <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAgentDropdown(!showAgentDropdown)}
              className={`flex w-full items-center justify-between rounded-lg border bg-white px-4 py-2.5 text-sm font-medium transition dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 ${
                errors.agent ? 'border-red-400 dark:border-red-500' : 'border-zinc-200 focus:border-violet-400 dark:border-zinc-700'
              }`}
            >
              <span className={formData.agent ? "" : "text-zinc-400 dark:text-zinc-600"}>
                {formData.agent || "Select..."}
              </span>
              <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform ${showAgentDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showAgentDropdown && (
              <div className="absolute z-20 mt-1 w-full rounded-lg border border-zinc-200 bg-white py-1 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                {agents.map((agent) => (
                  <button
                    key={agent}
                    type="button"
                    onClick={() => {
                      onChange({ agent });
                      setShowAgentDropdown(false);
                    }}
                    className="flex w-full px-4 py-2 text-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    {agent}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.agent && <p className="text-xs font-medium text-red-500">{errors.agent}</p>}
        </div>

        {/* Schedule Date & Time */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#111827] dark:text-zinc-100">
            <Calendar className="h-3.5 w-3.5" />
            Schedule Date <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="date"
                value={formData.scheduleDate}
                onChange={(e) => onChange({ scheduleDate: e.target.value })}
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:bg-zinc-900 ${
                  errors.scheduleDate ? 'border-red-400 dark:border-red-500' : 'border-zinc-200 focus:border-violet-400 dark:border-zinc-700'
                }`}
              />
              {errors.scheduleDate && <p className="mt-1 text-xs font-medium text-red-500">{errors.scheduleDate}</p>}
            </div>
            <div>
              <input
                type="time"
                value={formData.scheduleTime}
                onChange={(e) => onChange({ scheduleTime: e.target.value })}
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:bg-zinc-900 ${
                  errors.scheduleTime ? 'border-red-400 dark:border-red-500' : 'border-zinc-200 focus:border-violet-400 dark:border-zinc-700'
                }`}
              />
              {errors.scheduleTime && <p className="mt-1 text-xs font-medium text-red-500">{errors.scheduleTime}</p>}
            </div>
          </div>
        </div>

        {/* Upload Contacts */}
        <UploadSource
          sourceType={formData.uploadSource}
          onChangeSource={(type) => onChange({ uploadSource: type })}
          onFileUpload={onFileUpload}
          fileUploaded={fileUploaded}
          fileName={fileName}
          fileSize={fileSize}
          totalContacts={totalContacts}
          googleSheetUrl={formData.googleSheetUrl}
          onChangeGoogleSheetUrl={(url) => onChange({ googleSheetUrl: url })}
          singleContactName={formData.singleContactName}
          onChangeSingleName={(name) => onChange({ singleContactName: name })}
          singleContactPhone={formData.singleContactPhone}
          onChangeSinglePhone={(phone) => onChange({ singleContactPhone: phone })}
          errors={errors}
          onGoogleSheetLoaded={onGoogleSheetLoaded}
        />

        {/* Editable Script */}
        <EditableScript
          script={formData.script}
          onChange={(script) => onChange({ script })}
          error={errors.script}
        />
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#111827] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
      >
        <Rocket className="h-4 w-4" />
        Launch Campaign
      </button>
    </div>
  );
}
