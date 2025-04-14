
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
      .replace(/unWL/g, "unauthorized vehicle")
      .replace(/mod/g, "moderator")
      .replace(/ems/g, "EMS")
      .replace(/fbi/g, "FBI")
      .replace(/bolo/g, "BOLO (Be On the Look Out)")
      .replace(/pd/g, "Police Department")
      .replace(/code 3/g, "Code 3")
      .replace(/code three/g, "Code 3")
      .replace(/code 5/g, "Code 5")
      .replace(/code five/g, "Code 5");
    
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
