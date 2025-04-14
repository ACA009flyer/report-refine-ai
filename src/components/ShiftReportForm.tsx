
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReportData } from "@/types/report";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { CoPilotTextareaField } from "./CoPilotProvider";

interface ShiftReportFormProps {
  reportData: ReportData;
  onInputChange: (field: keyof ReportData, value: string) => void;
  onSubmit: () => void;
  isProcessing: boolean;
}

const ShiftReportForm = ({ 
  reportData, 
  onInputChange, 
  onSubmit,
  isProcessing
}: ShiftReportFormProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-900 border-b border-blue-200 pb-4">
        Shift Report Details
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trooper Callsign *
          </label>
          <Input
            placeholder="Enter your callsign"
            value={reportData.callsign}
            onChange={(e) => onInputChange("callsign", e.target.value)}
            className="border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Used *
          </label>
          <Input
            placeholder="Enter vehicle model"
            value={reportData.car}
            onChange={(e) => onInputChange("car", e.target.value)}
            className="border-gray-300"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shift Activity Description * (Use AI to enhance your report)
          </label>
          <div className="relative">
            <CoPilotTextareaField
              placeholder="Enter a detailed description of what happened during your shift (4+ sentences)"
              value={reportData.activityDescription}
              onChange={(value) => onInputChange("activityDescription", value)}
              className="border-gray-300"
              rows={10}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Enter your shift activity details and use the AI assistant to help format and enhance your report.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Driving Conditions
          </label>
          <Textarea
            placeholder="Describe any driving conditions or issues"
            value={reportData.poorDrivers}
            onChange={(e) => onInputChange("poorDrivers", e.target.value)}
            className="border-gray-300"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Incidents with People, Troopers, Civilians, or Other Department Staff
          </label>
          <Textarea
            placeholder="Describe any incidents with personnel"
            value={reportData.incidents}
            onChange={(e) => onInputChange("incidents", e.target.value)}
            className="border-gray-300"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body Camera Active? *
          </label>
          <Select 
            value={reportData.bodyCam} 
            onValueChange={(value) => onInputChange("bodyCam", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issues with Other Troopers?
          </label>
          <Textarea
            placeholder="Describe any issues with other troopers"
            value={reportData.trooperIssues}
            onChange={(e) => onInputChange("trooperIssues", e.target.value)}
            className="border-gray-300"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Accidents?
          </label>
          <Textarea
            placeholder="Describe any accidents that occurred"
            value={reportData.accident}
            onChange={(e) => onInputChange("accident", e.target.value)}
            className="border-gray-300"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weapons Used
          </label>
          <Textarea
            placeholder="List weapons used by you and your partner (if applicable)"
            value={reportData.weapons}
            onChange={(e) => onInputChange("weapons", e.target.value)}
            className="border-gray-300"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note for LC Member
          </label>
          <Input
            placeholder="Optional note for LC Member"
            value={reportData.lcNote}
            onChange={(e) => onInputChange("lcNote", e.target.value)}
            className="border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note for Commissioner
          </label>
          <Input
            placeholder="Optional note for Commissioner"
            value={reportData.commNote}
            onChange={(e) => onInputChange("commNote", e.target.value)}
            className="border-gray-300"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button 
          onClick={onSubmit} 
          className="bg-blue-800 hover:bg-blue-700 text-white px-8 py-6 text-lg" 
          disabled={
            !reportData.callsign || 
            !reportData.car || 
            !reportData.activityDescription || 
            isProcessing
          }
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Processing Report...
            </>
          ) : (
            "Generate Professional Report"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ShiftReportForm;
