import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST(request) { // `request` is passed as a parameter
  const cookiestore = await cookies();
  // const agent_id= cookiestore.get('support_agent_id')?.value

  // const agent= await Agent.findOne({support_agent_id:agent_id})
  // agent.availability=false;
  // await agent.save();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/", // Match the original path where the cookies were set
    maxAge: -1, // Expire the cookies immediately
  };

  // Serialize cookies to clear them
  const authTokenCookie = serialize("authToken", "", cookieOptions);
  const userIdCookie = serialize("user_id", "", cookieOptions);
  const supportAgentIdCookie = serialize("support_agent_id", "", cookieOptions);

  // Append Set-Cookie headers for all cookies
  const response = NextResponse.redirect(new URL("/", request.url)); 
  response.headers.append("Set-Cookie", authTokenCookie);
  response.headers.append("Set-Cookie", userIdCookie);
  response.headers.append("Set-Cookie", supportAgentIdCookie);

  return response;
}
