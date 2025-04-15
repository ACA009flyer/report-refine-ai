
import { useState, useEffect } from "react";
import ShiftReportForm from "@/components/ShiftReportForm";
import ReportPreview from "@/components/ReportPreview";
import Header from "@/components/Header";
import { 
  processReport, 
  analyzeShiftReport,
  extractDrivingInfo,
  extractIncidents,
  extractTrooperIssues,
  extractAccidents,
  extractWeapons
} from "@/utils/reportProcessor";
import { ReportData } from "@/types/report";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [reportData, setReportData] = useState<ReportData>({
    callsign: "",
    car: "",
    poorDrivers: "",
    activityDescription: "",
    incidents: "",
    bodyCam: "Yes",
    trooperIssues: "",
    accident: "",
    weapons: "",
    lcNote: "",
    commNote: "",
    isAnalyzing: false
  });
  
  const [processedReport, setProcessedReport] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [autoFilledOnce, setAutoFilledOnce] = useState(false);

  const handleInputChange = (field: keyof ReportData, value: string) => {
    setReportData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnalyzeText = async (text: string) => {
    // Set analyzing state
    setReportData(prev => ({ ...prev, isAnalyzing: true }));
    
    try {
      // Get enhanced text and extracted fields
      const processed = await processReport(text);
      
      // Extract information for different sections
      const drivingInfo = extractDrivingInfo(text);
      const incidents = extractIncidents(text);
      const trooperIssues = extractTrooperIssues(text);
      const accidents = extractAccidents(text);
      const weapons = extractWeapons(text);
      
      // Update all fields at once
      setReportData(prev => ({
        ...prev,
        activityDescription: processed,
        poorDrivers: prev.poorDrivers || drivingInfo,
        incidents: prev.incidents || incidents,
        trooperIssues: prev.trooperIssues || trooperIssues,
        accident: prev.accident || accidents,
        weapons: prev.weapons || weapons,
        isAnalyzing: false
      }));

      if (!autoFilledOnce) {
        toast({
          title: "Report Analysis Complete",
          description: "Relevant fields have been automatically filled based on your report."
        });
        setAutoFilledOnce(true);
      }
    } catch (error) {
      console.error("Error analyzing report:", error);
      setReportData(prev => ({ ...prev, isAnalyzing: false }));
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    try {
      // Process the report text one final time before submission
      const processedDescription = await processReport(reportData.activityDescription);
      
      const fullReport = `
**San Andreas State Troopers - Shift Report**

**Trooper Callsign:** ${reportData.callsign}

**Vehicle Used:** ${reportData.car}

**Driving Conditions/Incidents:** ${reportData.poorDrivers}

**Shift Activity:**
${processedDescription}

**Incidents with Personnel:** ${reportData.incidents}

**Body Camera Active:** ${reportData.bodyCam}

**Issues with Other Troopers:** ${reportData.trooperIssues}

**Vehicle Accidents:** ${reportData.accident || "None reported"}

**Weapons Utilized:** ${reportData.weapons}

**Note for LC Member:** ${reportData.lcNote || "None"}

**Note for Commissioner:** ${reportData.commNote || "None"}

**Commissioner Note:** It's good to see you back at our station. End your shift, change your uniform. Stay safe and go home 🚗. See you next shift 👋
`;
      
      setProcessedReport(fullReport);
      setActiveTab("preview");
    } catch (error) {
      console.error("Error processing report:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-center mb-4 space-x-4">
            <button
              className={`px-6 py-3 rounded-lg text-lg font-medium transition-all ${
                activeTab === "form"
                  ? "bg-blue-800 text-white"
                  : "bg-slate-300 text-slate-700 hover:bg-slate-400"
              }`}
              onClick={() => setActiveTab("form")}
            >
              Edit Report
            </button>
            <button
              className={`px-6 py-3 rounded-lg text-lg font-medium transition-all ${
                activeTab === "preview"
                  ? "bg-blue-800 text-white"
                  : "bg-slate-300 text-slate-700 hover:bg-slate-400"
              }`}
              onClick={() => setActiveTab("preview")}
              disabled={!reportData.activityDescription}
            >
              Preview Report
            </button>
          </div>

          {activeTab === "form" ? (
            <ShiftReportForm 
              reportData={reportData} 
              onInputChange={handleInputChange} 
              onSubmit={handleSubmit}
              isProcessing={isProcessing}
              onAnalyzeText={handleAnalyzeText}
            />
          ) : (
            <ReportPreview report={processedReport} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
