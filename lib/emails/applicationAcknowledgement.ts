// emails/applicationAcknowledgement.ts
export function acknowledgementEmail(firstName: string) {
  const subject = "Thank you for applying to ApexFocusGroup";

  const text = `
Hi ${firstName},

Thank you for taking the time to apply for the Part-Time Panelist & Data Entry Clerk position.

We’ve received your application and our team will review it shortly.
If your background aligns with current opportunities, we’ll contact you by email with next steps.

Best regards,
ApexFocusGroup Recruitment Team
  `;

  const html = `
  <div style="font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#333;">
    <div style="background:linear-gradient(90deg,#2563eb,#4f46e5);padding:24px;border-radius:12px 12px 0 0;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:24px;">ApexFocusGroup</h1>
    </div>
    <div style="padding:24px;background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
      <p style="font-size:16px;">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size:16px;line-height:1.5;">
        Thank you for applying for the <strong>Part-Time Panelist & Data Entry Clerk</strong> position.
        We’ve successfully received your application and our team will review it shortly.
      </p>
      <p style="font-size:16px;line-height:1.5;">
        If your profile is a good match, we’ll reach out with session details and next steps.
      </p>
      <p style="font-size:16px;margin-top:24px;">Best regards,<br/>
        <strong>ApexFocusGroup Recruitment Team</strong>
      </p>
    </div>
    <p style="font-size:12px;color:#6b7280;margin-top:16px;text-align:center;">
      This email was sent automatically. Please do not reply.
    </p>
  </div>
  `;

  return { subject, text, html };
}

export function sendAppointmentAgreement() {}
