
export interface ReportData {
  callsign: string;
  car: string;
  poorDrivers: string;  // This will be auto-filled based on the activity description
  activityDescription: string;
  incidents: string;    // This will be auto-filled based on the activity description
  bodyCam: string;
  trooperIssues: string; // This will be auto-filled based on the activity description
  accident: string;     // This will be auto-filled based on the activity description
  weapons: string;
  lcNote: string;
  commNote: string;
  isAnalyzing: boolean;  // New field to track AI analysis status
}
