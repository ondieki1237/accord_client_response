import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendFeedbackNotification = async (feedback) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Feedback from ${feedback.clientName} - ${feedback.facility}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #009ad4; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; color: #009ad4; margin-bottom: 10px; }
            .rating { display: inline-block; padding: 5px 10px; background-color: #009ad4; color: white; border-radius: 4px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Client Feedback Received</h1>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">Client Information</div>
                <p><strong>Date:</strong> ${new Date(feedback.date).toLocaleDateString()}</p>
                <p><strong>Client Name:</strong> ${feedback.clientName}</p>
                <p><strong>Facility:</strong> ${feedback.facility}</p>
                <p><strong>Service Type:</strong> ${feedback.serviceType}</p>
              </div>
              
              <div class="section">
                <div class="section-title">Product & Service Feedback</div>
                <p><strong>Product Quality:</strong> <span class="rating">${feedback.productQuality}/5</span></p>
                <p><strong>Delivery Timelines:</strong> <span class="rating">${feedback.deliveryTimelines}/5</span></p>
                <p><strong>Customer Service:</strong> <span class="rating">${feedback.customerService}/5</span></p>
              </div>
              
              <div class="section">
                <div class="section-title">Client Experience</div>
                <p><strong>Challenges:</strong> ${feedback.challenges || "None provided"}</p>
                <p><strong>Suggestions:</strong> ${feedback.suggestions || "None provided"}</p>
              </div>
              
              <div class="section">
                <div class="section-title">Overall Satisfaction</div>
                <p><strong>Recommendation Likelihood:</strong> <span class="rating">${feedback.recommendationLikelihood}/10</span></p>
              </div>
            </div>
            <div class="footer">
              <p>Accord Medical Supplies Ltd</p>
              <p>This is an automated notification from the Client Feedback System</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("Feedback notification email sent successfully")
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

export const sendFeedbackConfirmation = async (feedback, clientEmail) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: clientEmail,
      subject: "Thank You for Your Feedback - Accord Medical Supplies",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #009ad4; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Your Feedback!</h1>
            </div>
            <div class="content">
              <p>Dear ${feedback.clientName},</p>
              <p>Thank you for taking the time to provide feedback on our products and services. Your input is invaluable in helping us improve and serve you better.</p>
              <p>We have received your feedback and our team will review it carefully. If any action is required, we will be in touch with you shortly.</p>
              <p>We appreciate your continued partnership with Accord Medical Supplies Ltd.</p>
              <p>Best regards,<br>The Accord Medical Supplies Team</p>
            </div>
            <div class="footer">
              <p>Accord Medical Supplies Ltd</p>
              <p>Visit us at: <a href="https://accordmedical.co.ke">accordmedical.co.ke</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("Confirmation email sent successfully")
  } catch (error) {
    console.error("Error sending confirmation email:", error)
  }
}
