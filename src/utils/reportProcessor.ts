
// This function processes the raw shift report and makes it more professional and coherent
export async function processReport(rawReport: string): Promise<string> {
  // In a real application, this could connect to an API for more advanced processing
  // Here we'll implement some basic improvements
  
  if (!rawReport) {
    return "";
  }
  
  // Break into sentences for better processing
  let sentences = splitIntoSentences(rawReport);
  
  // Improve each sentence
  let improved = sentences.map(sentence => {
    // Fix common abbreviations and acronyms
    sentence = sentence
      .replace(/unwl/gi, "unwhitelisted vehicle")
      .replace(/unWL/gi, "unwhitelisted vehicle")
      .replace(/mod/gi, "moderator")
      .replace(/ems/gi, "EMS")
      .replace(/fbi/gi, "FBI")
      .replace(/bolo/gi, "BOLO (Be On the Look Out)")
      .replace(/pd/gi, "Police Department")
      .replace(/code 3/gi, "Code 3")
      .replace(/code three/gi, "Code 3")
      .replace(/code 5/gi, "Code 5")
      .replace(/code five/gi, "Code 5");
    
    // Capitalize first letter of each sentence
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    
    // Ensure proper spacing after periods
    sentence = sentence.replace(/\.(?=[A-Za-z])/g, ". ");
    
    return sentence;
  });
  
  // Join sentences back together
  let processedReport = improved.join(" ");
  
  // Format into paragraphs for better readability
  processedReport = formatIntoParagraphs(processedReport);
  
  // Final cleanup
  processedReport = processedReport
    .replace(/\s+/g, " ")         // Remove excess whitespace
    .replace(/ ,/g, ",")          // Fix space before comma
    .replace(/ \./g, ".")         // Fix space before period
    .trim();
  
  return processedReport;
}

function splitIntoSentences(text: string): string[] {
  // Split text into sentences - basic implementation
  const sentenceRegex = /[.!?]+\s*/g;
  let sentences = text.split(sentenceRegex).filter(s => s.trim() !== "");
  
  // Add periods to sentences that don't end with punctuation
  sentences = sentences.map(s => s.trim().replace(/[.!?]*$/, "."));
  
  return sentences;
}

function formatIntoParagraphs(text: string): string {
  // Group sentences into paragraphs based on topics
  // This is a simplified implementation - a real NLP model would do this better
  const sentences = text.split(". ").filter(s => s.trim() !== "");
  const paragraphs = [];
  let currentParagraph = [];
  
  for (let sentence of sentences) {
    currentParagraph.push(sentence);
    
    // Every 3-5 sentences, create a new paragraph
    if (currentParagraph.length >= 4) {
      paragraphs.push(currentParagraph.join(". "));
      currentParagraph = [];
    }
  }
  
  // Add any remaining sentences
  if (currentParagraph.length > 0) {
    paragraphs.push(currentParagraph.join(". "));
  }
  
  return paragraphs.join("\n\n");
}

// Function to extract driving information from the report
export function extractDrivingInfo(text: string): string {
  if (!text) return "";
  
  const drivingKeywords = [
    /\b(?:driving|drove|drive|car handling|tires|tyres|slippery|vehicle)\b/i,
    /\b(?:skid|skidded|control|road condition|road|highways|highway)\b/i,
    /\b(?:lost control|lost traction|car performed|performance)\b/i
  ];
  
  const sentences = splitIntoSentences(text);
  const relevantSentences = sentences.filter(sentence => 
    drivingKeywords.some(keyword => keyword.test(sentence))
  );

  if (relevantSentences.length === 0) {
    return "Vehicle handled well during the shift. No notable driving conditions to report.";
  }
  
  return relevantSentences.join(" ");
}

// Function to extract incidents with personnel
export function extractIncidents(text: string): string {
  if (!text) return "";
  
  const incidentKeywords = [
    /\b(?:civilian|civilians|civ|civs|people|crowd|person)\b/i,
    /\b(?:interaction|confrontation|talked|conversation|argued)\b/i,
    /\b(?:incident|department|staff|personnel|officer|officers)\b/i,
    /\b(?:sheriff|deputies|deputy|police|fbi agent|fbi agents)\b/i
  ];
  
  const sentences = splitIntoSentences(text);
  const relevantSentences = sentences.filter(sentence => 
    incidentKeywords.some(keyword => keyword.test(sentence))
  );

  if (relevantSentences.length === 0) {
    return "No significant incidents with other personnel to report.";
  }
  
  return relevantSentences.join(" ");
}

// Function to extract issues with other troopers
export function extractTrooperIssues(text: string): string {
  if (!text) return "";
  
  const trooperKeywords = [
    /\b(?:trooper|troopers|officers|officer)\b/i,
    /\b(?:backup|responded|response|arrived)\b/i,
    /\b(?:issue|problem|conflict|disagreement|argument|coordination)\b/i,
    /\b(?:radio|communication|misunderstanding)\b/i
  ];
  
  const sentences = splitIntoSentences(text);
  const relevantSentences = sentences.filter(sentence => 
    trooperKeywords.some(keyword => keyword.test(sentence)) &&
    /\b(?:issue|problem|conflict|disagreement|argument|no|not|never|didn't|did not|failed|miscommunication)\b/i.test(sentence)
  );

  if (relevantSentences.length === 0) {
    return "No issues with other troopers during this shift.";
  }
  
  return relevantSentences.join(" ");
}

// Function to extract accident information
export function extractAccidents(text: string): string {
  if (!text) return "";
  
  const accidentKeywords = [
    /\b(?:crash|crashed|accident|collision|hit|ram|rammed)\b/i,
    /\b(?:bumped|bump|scratched|scratch|damaged|damage)\b/i,
    /\b(?:pit maneuver|pit manoeuvre|pit)\b/i,
    /\b(?:vehicle damage|car damage|repair|fixed)\b/i
  ];
  
  const sentences = splitIntoSentences(text);
  const relevantSentences = sentences.filter(sentence => 
    accidentKeywords.some(keyword => keyword.test(sentence))
  );

  if (relevantSentences.length === 0) {
    return "No accidents or vehicle damage to report during this shift.";
  }
  
  return relevantSentences.join(" ");
}

// Function to extract weapons information
export function extractWeapons(text: string): string {
  if (!text) return "";
  
  const weaponKeywords = [
    /\b(?:weapon|weapons|gun|guns|pistol|rifle|shotgun|taser)\b/i,
    /\b(?:firearm|firearms|armed|fire|shot|shots|shooting)\b/i,
    /\b(?:discharged|discharge|pulled|draw|drew)\b/i,
  ];
  
  const sentences = splitIntoSentences(text);
  const relevantSentences = sentences.filter(sentence => 
    weaponKeywords.some(keyword => keyword.test(sentence))
  );

  if (relevantSentences.length === 0) {
    return "No weapons were utilized during this shift.";
  }
  
  return relevantSentences.join(" ");
}

// Main function to analyze text and auto-fill all relevant fields
export function analyzeShiftReport(text: string): {
  enhancedText: string;
  drivingInfo: string;
  incidents: string;
  trooperIssues: string;
  accidents: string;
  weapons: string;
} {
  return {
    enhancedText: text, // Will be processed later with processReport
    drivingInfo: extractDrivingInfo(text),
    incidents: extractIncidents(text),
    trooperIssues: extractTrooperIssues(text),
    accidents: extractAccidents(text),
    weapons: extractWeapons(text)
  };
}
