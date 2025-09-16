// export async function askMedicalAI(question: string): Promise<string> {
//   try {
//     const response = await fetch(process.env.AWS_API_URL!, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ question }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch from AWS backend");
//     }

//     const data = await response.json();
//     return data.answer;
//   } catch (error) {
//     console.error("AWS query error:", error);
//     return "Error: Unable to retrieve answer from AI backend.";
//   }
// }
