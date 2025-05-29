# Contact Form Setup Guide

This guide will help you set up the contact form to send emails properly using Resend.

## Prerequisites

1. A Resend.com account (free tier available)
2. An API key from Resend

## Quick Setup

The easiest way to set up the contact form:

1. Sign up for a free account at [Resend.com](https://resend.com)
2. Create an API key in your Resend dashboard
3. Create a `.env.local` file in the root directory with the following content:

```
RESEND_API_KEY=your_resend_api_key
```

## Setting Up Resend

1. Create an account at [Resend.com](https://resend.com)
2. Navigate to the API Keys section in your dashboard
3. Click "Create API Key"
4. Give your API key a name (e.g., "Enginaro Contact Form")
5. Copy the generated API key (you'll only see it once!)
6. Paste the API key in your `.env.local` file

## Email Sending Domain (Optional but Recommended)

For production use, it's recommended to set up a custom sending domain:

1. In your Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Follow the instructions to verify your domain
4. Once verified, update the "from" address in the API route:
   ```javascript
   from: 'Contact Form <contact@yourdomain.com>'
   ```

## How the Contact Form Works

1. When a user submits the contact form, the data is sent to the `/api/contact` endpoint
2. The server validates the input (required fields, valid email format)
3. If valid, the server uses Resend API to send an email to enginaro.industrialsolutions@gmail.com
4. The email contains:
   - The user's name
   - The user's email (also set as the reply-to address)
   - The subject
   - The message content

## Troubleshooting

If emails aren't being sent, check the following:

1. Verify your Resend API key in `.env.local` is correct
2. Check the Resend dashboard for any sending errors or limits
3. Check the server logs for any error messages
4. Make sure your API key has permission to send emails

## Production Deployment on Vercel

1. Add the `RESEND_API_KEY` environment variable in your Vercel project settings:
   - Go to your project on Vercel
   - Navigate to Settings > Environment Variables
   - Add the key `RESEND_API_KEY` with your Resend API key as the value
2. Deploy your application
3. Resend works well with serverless functions, so emails should send properly in production

## Local Testing

For testing locally:
1. Make sure your `.env.local` file contains your Resend API key
2. Run the development server with `npm run dev`
3. Submit the form and check the server console for any errors 