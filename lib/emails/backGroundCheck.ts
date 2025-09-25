import envStore from "@/app/envStore/store";

export function BackGroundCheckEmail(firstName: string) {
  const subject = "Invitation to Complete Applicant Form";
  const formLink = `https://${envStore.ActiveDomain}/applicants/background-check`;

  const text = `
Subject: Please complete your application for ApexGroup

Hello ${firstName},

Thank you for your interest in joining ApexGroup. To complete your application, please fill out the short applicant form linked below. The form takes about 5–10 minutes and may ask you to upload documents such as a driver's license and resume.

Complete your application: ${formLink}

If you have questions or need help, reply to this email or contact our recruitment team at hr@${envStore.ActiveDomain}.

We look forward to reviewing your submission.

Warm regards,
The ApexGroup Recruitment Team

----------------------------------------
Confidentiality Notice:
The information requested in this form may include personally identifiable information and sensitive documents. This information will be used solely for recruitment and eligibility verification by ApexGroup and will be handled in accordance with our privacy policy. If you are not the intended recipient, please notify us immediately and delete this email.

Contact: ApexGroup • 30 N Gould Street, Suite R, Sheridan, Wyoming 82801 • privacy@${envStore.ActiveDomain}
`;

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Invitation to Complete Applicant Form</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body style="margin:0;padding:0;background:#f3f6fb;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#102a43;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6fb;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <!-- Main container -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 6px 18px rgba(16,42,67,0.08);">
            <!-- Header -->
            <tr>
              <td style="padding:20px 28px 8px 28px;">
                <table width="100%">
                  <tr>
                    <td style="vertical-align:middle;">
                      <div style="font-weight:700;color:#0b4a6f;font-size:18px;">ApexGroup</div>
                      <div style="color:#6b7c93;font-size:13px;margin-top:6px;">Applicant Invitation</div>
                    </td>
                    <td style="text-align:right;vertical-align:middle;">
                      <div style="font-size:12px;color:#9aa9bb;">${new Date().toUTCString()}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:18px 28px;">
                <h2 style="margin:0 0 8px 0;font-size:20px;color:#09324a;">Hello ${firstName},</h2>
                <p style="margin:0 0 16px 0;color:#425a70;line-height:1.5;">
                  Thank you for your interest in joining <strong>ApexGroup</strong>. To complete your application we kindly ask that you fill out a short form so we can gather the information needed to move your application forward.
                </p>

                <p style="margin:0 0 18px 0;color:#425a70;line-height:1.5;">
                  The form takes about <strong>5–10 minutes</strong> to complete. Please have any supporting documents (driver’s license, resume) ready to upload.
                </p>

                <!-- CTA button -->
                <p style="margin:0 0 24px 0;">
                  <a href="${formLink}" style="display:inline-block;padding:12px 20px;border-radius:8px;background:#0b74d1;color:#ffffff;text-decoration:none;font-weight:600;">
                    Complete Your Application
                  </a>
                </p>

                <p style="margin:0 0 6px 0;color:#425a70;line-height:1.5;">
                  If you have any questions or need assistance, reply to this email or contact our recruitment team at
                  <a href="mailto:hr@${
                    envStore.ActiveDomain
                  }" style="color:#0b74d1;text-decoration:none;">hr@${
    envStore.ActiveDomain
  }</a>.
                </p>

                <p style="margin:12px 0 0 0;color:#6b7c93;font-size:13px;">
                  We look forward to reviewing your application.
                </p>

                <p style="margin:10px 0 0 0;color:#6b7c93;font-size:13px;">Warm regards,</p>
                <p style="margin:3px 0 0 0;color:#6b7c93;font-size:13px;">The ApexGroup Recruitment Team</p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:0 28px;">
                <hr style="border:none;border-top:1px solid #eef3f8;margin:8px 0 0 0;">
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:12px 28px 20px 28px;color:#6b7c93;font-size:12px;line-height:1.4;">
                <div style="margin-bottom:8px;">
                  <strong>Confidentiality Notice:</strong> The information requested in this form may include personally identifiable information and sensitive documents. This information will be used solely for recruitment and eligibility verification by <strong>ApexGroup</strong> and will be handled in accordance with our privacy policy. If you are not the intended recipient, please notify us immediately and delete this email.
                </div>
                <div style="color:#9aa9bb;font-size:11px;">
                  <em>By clicking the link above and completing the form you consent to the processing and storage of the information you provide for recruitment purposes.</em>
                </div>
                <div style="margin-top:12px;color:#9aa9bb;font-size:11px;">
                  ApexGroup • 30 N Gould Street, Suite R, Sheridan, Wyoming 82801 •
                  <a href="mailto:privacy@${
                    envStore.ActiveDomain
                  }" style="color:#9aa9bb;text-decoration:underline;">privacy@${
    envStore.ActiveDomain
  }</a>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}
