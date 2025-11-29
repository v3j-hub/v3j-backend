export const validateContact = (req, res, next) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Missing required fields!" });
    }

    next();
};
