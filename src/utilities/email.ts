import { convert } from 'html-to-text';
import { Prisma } from '@prisma/client';
import pug from 'pug';
import postmarkClient from '../utilities/connectPostmark'



// Class and attributes needed for the Mail Options and the email templates.
export default class Email {
  #firstName: string;
  #to: string;
  #from: string;
  constructor(private user: Prisma.UserCreateInput, private url: string) {
    this.#firstName = user.name.split(' ')[0];
    this.#to = user.email;
    this.#from = `claims@brotherzone.co.uk`;
  }

  // Create a Method to Generate the Email Templates
  private async send(template: string, subject: string) {

    // Generate HTML template based on the template string
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      firstName: this.#firstName,
      subject,
      url: this.url,
    });

    const response = await postmarkClient.sendEmail({
      "From": this.#from,
      "To": this.#to,
      "Subject": subject,
      "HtmlBody": html,
      "TextBody": convert(html),
      "MessageStream": "outbound"
    });
    console.log(response)
  }

  // Create method to send the email verification code.
  async sendVerificationCode() {
    await this.send('verificationCode', 'Your account verification code');
  }

  async sendPasswordResetToken() {
    await this.send(
      'resetPassword',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}