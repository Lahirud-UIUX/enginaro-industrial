# Contact Form Setup Guide

This guide will help you set up the contact form to send emails properly.

## Prerequisites

1. A Gmail account for sending emails
2. Two-step verification enabled on your Gmail account
3. An app password generated for your application

## Quick Setup

The easiest way to set up the contact form is to run:

```bash
npm run setup-email
```

This script will prompt you for your Gmail address and app password, then create the necessary `.env.local` file.

## Manual Setup

If you prefer to set up the form manually:

1. Create a `.env.local` file in the root directory with the following content:

```
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_app_password
```

2. Replace `your_gmail_address@gmail.com` with your actual Gmail address
3. Replace `your_app_password` with the app password you generated

## Generating an App Password for Gmail

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to "Security" 
3. Under "Signing in to Google," select "2-Step Verification"
4. At the bottom of the page, select "App passwords"
5. Set "App" to "Mail" and "Device" to "Other (Custom name)"
6. Enter a name for your app (e.g., "Enginaro Contact Form")
7. Click "Generate"
8. Google will display a 16-character password - copy this password
9. Use this password in your `.env.local` file

## How the Contact Form Works

1. When a user submits the contact form, the data is sent to the `/api/contact` endpoint
2. The server validates the input (required fields, valid email format)
3. If valid, the server uses Nodemailer to send an email to enginaro.industrialsolutions@gmail.com
4. The email contains:
   - The user's name
   - The user's email (also set as the reply-to address)
   - The subject
   - The message content

## Troubleshooting

If emails aren't being sent, check the following:

1. Verify your Gmail credentials in `.env.local` are correct
2. Make sure two-step verification is enabled on your Google account
3. Confirm the app password was generated correctly
4. Check the server logs for any error messages
5. If using Gmail, make sure Google hasn't blocked the login attempt (check your Gmail inbox for security alerts)
6. Verify your Gmail account hasn't reached sending limits

## Production Deployment

When deploying to production:

1. Add the `EMAIL_USER` and `EMAIL_PASS` environment variables to your hosting platform (Vercel, Netlify, etc.)
2. Never commit the `.env.local` file to version control
3. Consider using a transactional email service (like SendGrid, Mailgun, etc.) for production environments with higher email volumes 