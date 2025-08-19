import * as z from "zod";

export const QuestionSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),
  explanation: z
    .string()
    .min(100, "Explanation must be at least 100" + " characters"),
  tags: z
    .array(z.string().min(1).max(20))
    .min(1, "Must have at least one" + " tag")
    .max(3, "Must have at most 3 tags"),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100, "Answer must be at least 100 characters"),
});
export const ProfileEditSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  bio: z.string().min(10).max(150),
  portfolioLink: z.string().url(),
  location: z.string().min(5).max(50),
});
