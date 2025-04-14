
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReportData } from "@/types/report";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

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
            Shift Activity Description * (Paste your raw report here for AI analysis)
          </label>
          <div className="relative">
            <Textarea
              placeholder="Enter a detailed description of what happened during your shift (4+ sentences)"
              value={reportData.activityDescription}
              onChange={(e) => onInputChange("activityDescription", e.target.value)}
              className="border-gray-300"
              rows={10}
            />
            {reportData.isAnalyzing && (
              <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs flex items-center">
                <Loader2 className="animate-spin h-3 w-3 mr-1" />
                Analyzing report...
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Enter your shift activity to automatically analyze driving conditions, incidents, and issues.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Driving Conditions (Auto-analyzed)
          </label>
          <Textarea
            placeholder="AI will analyze your report for driving conditions"
            value={reportData.poorDrivers}
            onChange={(e) => onInputChange("poorDrivers", e.target.value)}
            className={`border-gray-300 ${reportData.isAnalyzing ? "bg-gray-50" : ""}`}
            rows={2}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Incidents with People, Troopers, Civilians, or Other Department Staff (Auto-analyzed)
          </label>
          <Textarea
            placeholder="AI will analyze your report for incidents"
            value={reportData.incidents}
            onChange={(e) => onInputChange("incidents", e.target.value)}
            className={`border-gray-300 ${reportData.isAnalyzing ? "bg-gray-50" : ""}`}
            rows={4}
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
            Issues with Other Troopers? (Auto-analyzed)
          </label>
          <Textarea
            placeholder="AI will analyze your report for trooper issues"
            value={reportData.trooperIssues}
            onChange={(e) => onInputChange("trooperIssues", e.target.value)}
            className={`border-gray-300 ${reportData.isAnalyzing ? "bg-gray-50" : ""}`}
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Accidents? (Auto-analyzed)
          </label>
          <Textarea
            placeholder="AI will analyze your report for accidents"
            value={reportData.accident}
            onChange={(e) => onInputChange("accident", e.target.value)}
            className={`border-gray-300 ${reportData.isAnalyzing ? "bg-gray-50" : ""}`}
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
