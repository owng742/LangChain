import { createAgent, providerStrategy, tool } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";
import * as z from "zod";

const multiply = tool(
  (input) => `${input.x} multiplied by ${input.y} is ${input.x * input.y}`,
  {
    name: "multiply",
    description: "Multiply two numbers",
    schema: z.object({
      x: z.number().describe("First number"),
      y: z.number().describe("Second number"),
    })
  }
)

const divide = tool(
  (input) => `${input.x} divided by ${input.y} is ${input.x / input.y}`,
  {
    name: "divide",
    description: "Divide two numbers",
    schema: z.object({
      x: z.number().describe("First number"),
      y: z.number().describe("Second number"),
    })
  }
)

const add = tool(
  (input) => `${input.x} added by ${input.y} is ${input.x + input.y}`,
  {
    name: "add",
    description: "Add two numbers",
    schema: z.object({
      x: z.number().describe("First number"),
      y: z.number().describe("Second number"),
    })
  }
)

const subtract = tool(
  (input) => `${input.x} subtracted by ${input.y} is ${input.x - input.y}`,
  {
    name: "subtract",
    description: "Subtract two numbers",
    schema: z.object({
      x: z.number().describe("First number"),
      y: z.number().describe("Second number"),
    })
  }
)

const agent = createAgent({
  model: new ChatGoogleGenerativeAI({model: "gemini-2.5-flash"}),
  tools: [multiply, divide, add, subtract],
});

const res = await agent.invoke({
    messages: [{ role: "user", content: "What do you get when you multiply 5 by 9 and divide that by 10 and add it by 35.5 and subtract it by 3?" }]
});

console.log(res);
