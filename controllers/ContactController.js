import { mgClient } from "../config/emailConfig.js";
import ContactMessage from "../models/ContactMessage.js";

export const sendContactEmail = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        const contact = new ContactMessage(name, email, phone, subject, message);

        const result = await mgClient.messages.create(process.env.MAILGUN_DOMAIN, {
            from: `${contact.name} <postmaster@${process.env.MAILGUN_DOMAIN}>`,
            to: process.env.RECEIVE_EMAIL,
            subject: `New Contact Form: ${contact.subject}`,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${contact.name}</p>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Phone:</strong> ${contact.phone}</p>
                <p><strong>Subject:</strong> ${contact.subject}</p>
                <p><strong>Message:</strong><br>${contact.message}</p>
            `
        });

        return res.json({ success: true, message: "Email sent successfully!" });

    } catch (error) {
        console.log("Mailgun error:", error);
        return res.status(500).json({ error: "Failed to send email" });
    }
};
