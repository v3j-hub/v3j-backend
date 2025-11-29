import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// Calendar Scope
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

// Load service account JSON from Render environment variable
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

// Auth object using in-memory credentials
const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: SCOPES,
});

// MAIN FUNCTION — Create Event
export const createAppointment = async (req, res) => {
    try {
        const { cusName, cusPhone, vehicleModel, purpose, date, time } = req.body;

        if (!cusName || !cusPhone || !vehicleModel || !purpose || !date || !time) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const client = await auth.getClient();
        const calendar = google.calendar({ version: "v3", auth: client });

        // Build start & end time
        const startDateTime = new Date(`${date}T${time}:00`);
        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

        // Event Data
        const event = {
            summary: `Appointment: ${vehicleModel}`,
            description: `
Customer Name: ${cusName}
Phone: ${cusPhone}
Vehicle: ${vehicleModel}

Purpose:
${purpose}
            `,
            start: {
                dateTime: startDateTime.toISOString(),
                timeZone: "Asia/Colombo"
            },
            end: {
                dateTime: endDateTime.toISOString(),
                timeZone: "Asia/Colombo"
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "popup", minutes: 10 },
                    { method: "popup", minutes: 60 }
                ]
            }
        };

        const response = await calendar.events.insert({
            calendarId: process.env.CALENDAR_ID,
            resource: event
        });

        res.status(200).json({
            message: "Appointment created successfully",
            eventId: response.data.id
        });

    } catch (err) {
        console.error("Calendar Error:", err);
        res.status(500).json({ message: "Failed to create event", error: err.message });
    }
};
