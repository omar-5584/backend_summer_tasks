let sailorName: string = "Omar";
let yearsOfExperience: number = 2;

function welcomeAboard(name: string): string {
  return `Welcome aboard, ${name}! Your journey to Atlantis begins now with ${yearsOfExperience}.`;
}

console.log(welcomeAboard(sailorName));
console.log("Environment check complete. You are ready to sail! ⛵");