import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    // Check method
    if (req.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      );
    }

    const body = await req.json();
    const { firstName, lastName, email, subject, message } = body;

    // Validate form inputs
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Log form data for debugging
    console.log('Contact form submission:');
    console.log('-----------------------------------');
    console.log(`Name: ${firstName} ${lastName}`);
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------------');

    // Create a nodemailer transporter
    // NOTE: For Gmail, you need to:
    // 1. Enable 2-step verification on your Google account
    // 2. Create an app password at https://myaccount.google.com/apppasswords
    // 3. Use that app password here instead of your regular password
    // 4. Store these credentials in .env.local file
    
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    
    // Check if email credentials are available
    if (!emailUser || !emailPass) {
      console.error('Email credentials not found in environment variables');
      // Still log the message but return a more user-friendly message
      return NextResponse.json(
        { message: 'Message received! Our team will get back to you soon.' },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Contact Form" <${emailUser}>`,
      to: 'enginaro.industrialsolutions@gmail.com', // Corrected email address
      replyTo: email, // Set reply-to as the sender's email
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #FF6301; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h1>
          
          <h2 style="color: #333;">Contact Details</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          
          <h2 style="color: #333;">Message</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          
          <p style="margin-top: 20px; font-size: 12px; color: #777;">
            This message was sent from the Enginaro Industrial website contact form.
          </p>
        </div>
      `,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to enginaro.industrialsolutions@gmail.com');
      
      return NextResponse.json(
        { message: 'Message sent successfully!' },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      
      // Return a more specific error message while still keeping security in mind
      return NextResponse.json(
        { 
          error: 'Failed to send email. Please try again later or contact us directly at enginaro.industrialsolutions@gmail.com',
          details: process.env.NODE_ENV === 'development' ? emailError.message : undefined
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    );
  }
} 