import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long"),
  email: z.string().email(),
  age: z.number().int().positive("Age must be a positive number"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits long"),
  occupation: z.string().min(3, "Occupation must be at least 3 characters long").max(50, "Occupation must be at most 50 characters long"),
  hobby: z.string().min(3, "Hobby must be at least 3 characters long").max(50, "Hobby must be at most 50 characters long"),
  preferredContactMethod: z.enum(["EMAIL", "PHONE"], {
    message: "Preferred contact method must be either Email or Phone"
  }),
  feedback: z.string().min(3, "Feedback must be at least 3 characters long").max(50, "Feedback must be at most 50 characters long")
})

export type FormSchemaType = z.infer<typeof formSchema>;
