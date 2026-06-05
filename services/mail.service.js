import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

const sendFile = async (email, file, downloadFileURL, downloadLinkURL) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.GOOGLE_APP_PASSWORD,
            },
        });

        const templatePath = path.join(process.cwd(), "views", "mail.ejs");

        const html = await ejs.renderFile(templatePath, {
            file,
            downloadlink: downloadLinkURL,
            downloadFile: downloadFileURL,
        });

        const mailOptions = {
            from: process.env.USER_MAIL,
            to: email,
            subject: "File Shared",
            html,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent successfully:", info.response);

    } catch (error) {
        console.log("Email send failed:", error);
    }
};

export { sendFile };