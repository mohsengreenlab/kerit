import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
});

const adminEmail = "aboyonthemoon@gmail.com";

interface ContactNotification {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

interface BookingNotification {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  preferredDate?: Date;
  message?: string;
  createdAt: Date;
}

export async function sendContactNotification(contact: ContactNotification): Promise<boolean> {
  if (!process.env.MAILERSEND_API_KEY) {
    console.error("MAILERSEND_API_KEY not configured");
    return false;
  }

  try {
    const sentFrom = new Sender("noreply@kerit.com", "Kerit Website");
    const recipients = [new Recipient(adminEmail, "Admin")];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`New Contact Message: ${contact.subject}`)
      .setHtml(`
        <h2>New Contact Message Received</h2>
        <p><strong>From:</strong> ${contact.name} (${contact.email})</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message.replace(/\n/g, '<br>')}</p>
        <p><strong>Received:</strong> ${contact.createdAt.toLocaleString()}</p>
        <hr>
        <p><small>This message was sent from your Kerit website contact form.</small></p>
      `)
      .setText(`
        New Contact Message Received
        
        From: ${contact.name} (${contact.email})
        Subject: ${contact.subject}
        
        Message:
        ${contact.message}
        
        Received: ${contact.createdAt.toLocaleString()}
        
        This message was sent from your Kerit website contact form.
      `);

    await mailerSend.email.send(emailParams);
    console.log("Contact notification email sent successfully");
    return true;
  } catch (error) {
    console.error("Failed to send contact notification email:", error);
    return false;
  }
}

export async function sendBookingNotification(booking: BookingNotification): Promise<boolean> {
  if (!process.env.MAILERSEND_API_KEY) {
    console.error("MAILERSEND_API_KEY not configured");
    return false;
  }

  try {
    const sentFrom = new Sender("noreply@kerit.com", "Kerit Website");
    const recipients = [new Recipient(adminEmail, "Admin")];

    const phoneInfo = booking.phone ? `<p><strong>Phone:</strong> ${booking.phone}</p>` : '';
    const companyInfo = booking.company ? `<p><strong>Company:</strong> ${booking.company}</p>` : '';
    const dateInfo = booking.preferredDate ? `<p><strong>Preferred Date:</strong> ${booking.preferredDate.toLocaleString()}</p>` : '';
    const messageInfo = booking.message ? `<p><strong>Additional Message:</strong></p><p>${booking.message.replace(/\n/g, '<br>')}</p>` : '';

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`New Consultation Booking: ${booking.service}`)
      .setHtml(`
        <h2>New Consultation Booking</h2>
        <p><strong>Client:</strong> ${booking.name} (${booking.email})</p>
        ${phoneInfo}
        ${companyInfo}
        <p><strong>Service:</strong> ${booking.service}</p>
        ${dateInfo}
        ${messageInfo}
        <p><strong>Booking Time:</strong> ${booking.createdAt.toLocaleString()}</p>
        <hr>
        <p><small>This booking was made through your Kerit website.</small></p>
      `)
      .setText(`
        New Consultation Booking
        
        Client: ${booking.name} (${booking.email})
        ${booking.phone ? `Phone: ${booking.phone}` : ''}
        ${booking.company ? `Company: ${booking.company}` : ''}
        Service: ${booking.service}
        ${booking.preferredDate ? `Preferred Date: ${booking.preferredDate.toLocaleString()}` : ''}
        ${booking.message ? `Additional Message: ${booking.message}` : ''}
        
        Booking Time: ${booking.createdAt.toLocaleString()}
        
        This booking was made through your Kerit website.
      `);

    await mailerSend.email.send(emailParams);
    console.log("Booking notification email sent successfully");
    return true;
  } catch (error) {
    console.error("Failed to send booking notification email:", error);
    return false;
  }
}