import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
dotenv.config();
// Create server instance
const server = new McpServer({
  name: "personal-assistant",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

const emailTransport = createTransport({
  host: process.env.EMAIL_HOST, //smtp 服务器地址
  port: process.env.EMAIL_PORT, //smtp port
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, //send email user
    pass: process.env.EMAIL_PASS, //send email pass
  },
} as SMTPTransport.Options);

server.tool(
  "sendEmail",
  "sendEmail to someone",
  {
    to: z.string().email(),
    subject: z.string().nonempty("subject is required"),
    text: z.string().nonempty("text is required"),
  },
  async ({ to, subject, text }) => {
    return new Promise((resolve, reject) => {
      emailTransport.sendMail(
        {
          from: process.env.EMAIL_USER,
          to: to,
          subject: subject,
          text: text,
          html: `<b>${text}</b>`,
        },
        (err, info) => {
          if (err) {
            console.error(err);
            reject({
              content: [
                {
                  type: "text",
                  text: `邮件发送失败: ${err}`,
                },
              ],
            });
          } else {
            console.log(info);
            resolve({
              content: [
                {
                  type: "text",
                  text: `邮件发送成功: ${info.messageId}`,
                },
              ],
            });
          }
        }
      );
    });
  }
);
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Sum server running");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
