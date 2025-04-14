
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface ReportPreviewProps {
  report: string;
}

const ReportPreview = ({ report }: ReportPreviewProps) => {
  const { toast } = useToast();
  const [showCopied, setShowCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(report);
    setShowCopied(true);
    
    toast({
      title: "Report copied to clipboard",
      description: "You can now paste it wherever needed",
    });
    
    setTimeout(() => setShowCopied(false), 2000);
  };

  const downloadReport = () => {
    const element = document.createElement("a");
    const file = new Blob([report], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "SAST_Shift_Report.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Report downloaded",
      description: "Saved as SAST_Shift_Report.txt",
    });
  };

  const formattedReport = report.split("\n").map((line, index) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return (
        <h3 key={index} className="font-bold text-blue-900 my-2">
          {line.replace(/\*\*/g, "")}
        </h3>
      );
    } else if (line.startsWith("**") && line.includes(":**")) {
      const [label, value] = line.split(":**");
      return (
        <div key={index} className="mb-3">
          <span className="font-bold text-blue-800">
            {label.replace(/\*\*/g, "")}:
          </span>
          <span>{value}</span>
        </div>
      );
    } else {
      return <p key={index} className="mb-2">{line}</p>;
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-blue-900">Finalized Shift Report</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={copyToClipboard}
            className="flex items-center space-x-1"
          >
            <Copy size={16} />
            <span>{showCopied ? "Copied!" : "Copy"}</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadReport}
            className="flex items-center space-x-1"
          >
            <Download size={16} />
            <span>Download</span>
          </Button>
        </div>
      </div>
      <div className="p-6 whitespace-pre-wrap font-mono text-sm bg-slate-50 rounded-b-lg">
        {formattedReport}
      </div>
    </div>
  );
};

export default ReportPreview;
