// Backend API for Login
// import { NextResponse } from "next/server";
// import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

// // Create Cognito client
// const client = new CognitoIdentityProviderClient({
//   region: process.env.AWS_REGION,
// });

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
//     }

//     // Call AWS Cognito for authentication
//     const command = new InitiateAuthCommand({
//       AuthFlow: "USER_PASSWORD_AUTH",
//       ClientId: process.env.AWS_COGNITO_CLIENT_ID!, // from Cognito User Pool app client
//       AuthParameters: {
//         USERNAME: email,
//         PASSWORD: password,
//       },
//     });

//     const response = await client.send(command);

//     return NextResponse.json({
//       message: "Login successful",
//       accessToken: response.AuthenticationResult?.AccessToken,
//       refreshToken: response.AuthenticationResult?.RefreshToken,
//       idToken: response.AuthenticationResult?.IdToken,
//     });
//   } catch (err: any) {
//     console.error("Login error:", err);
//     return NextResponse.json(
//       { error: err.message || "Login failed" },
//       { status: 500 }
//     );
//   }
// }
