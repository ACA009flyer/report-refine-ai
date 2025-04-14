
import { useState } from "react";
import ShiftReportForm from "@/components/ShiftReportForm";
import ReportPreview from "@/components/ReportPreview";
import Header from "@/components/Header";
import { processReport } from "@/utils/reportProcessor";
import { ReportData } from "@/types/report";

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

  const handleInputChange = (field: keyof ReportData, value: string) => {
    setReportData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    try {
      // If the activityDescription is already well-formatted by CopilotKit,
      // we may not need extensive processing
      const fullReport = `
**San Andreas State Troopers - Shift Report**

**Trooper Callsign:** ${reportData.callsign}

**Vehicle Used:** ${reportData.car}

**Driving Conditions/Incidents:** ${reportData.poorDrivers}

**Shift Activity:**
${reportData.activityDescription}

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
