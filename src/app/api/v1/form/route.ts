import { NextRequest, NextResponse } from "next/server";
import { formSchema } from "@/types/form/formZod";
import { z } from "zod";
import { limit } from "@/middleware/rateLimiter";
import { RateLimitingError } from "@/types/error";
import prismaClient from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const ip = req.ip ?? req.headers.get('X-Forwarded-For') ?? 'unknown';
    const isRateLimited = limit(ip);

    if (isRateLimited)
      throw new RateLimitingError('Rate Limited');

    const body = await req.json();

    console.log(body)

    const dataForm = formSchema.parse(body);

    await prismaClient.formResponse.create({
      data: {
        name: dataForm.name,
        email: dataForm.email,
        age: dataForm.age,
        phoneNumber: dataForm.phoneNumber,
        occupation: dataForm.occupation,
        hobby: dataForm.hobby,
        preferedContactMethod: dataForm.preferredContactMethod,
        feedback: dataForm.feedback
      }
    });

  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    } else if (e instanceof RateLimitingError) {
      return new Response("Rate limited", { status: 429 });
    }
    return new Response('Something went wrong, please try again later', { status: 500 });
  }

  return NextResponse.json({ message: "Form data submitted successfully." });
}
