# Setting Up Resend on Vercel

This guide will help you set up the Resend email service for your contact form on Vercel.

## 1. Create a Resend Account

1. Go to [Resend.com](https://resend.com) and sign up for a free account
2. Verify your email address

## 2. Create an API Key

1. In your Resend dashboard, navigate to API Keys
2. Click "Create API Key"
3. Name your API key (e.g., "Enginaro Contact Form")
4. Copy the generated API key (you'll only see it once!)

## 3. Add the API Key to Vercel

1. Go to your project on the [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to "Settings" > "Environment Variables"
4. Add a new environment variable:
   - Name: `RESEND_API_KEY`
   - Value: re_5dRpt515_bRdAEiPCreXqx2HhRGPT3FbS
5. Make sure the environment variable is enabled for Production, Preview, and Development environments
6. Click "Save"

## 4. Redeploy Your Application

1. Go to the "Deployments" tab in your Vercel project
2. Click "Redeploy" on your latest deployment to apply the environment variable

## 5. Verify Email Sending

1. After redeployment, visit your contact form
2. Submit a test message
3. Check the Vercel logs for any errors:
   - Go to your project dashboard
   - Click on the latest deployment
   - Navigate to "Functions" and check the logs for `/api/contact`
4. Check your inbox at enginaro.industrialsolutions@gmail.com for the test message

## 6. Troubleshooting

If emails are not being sent:

1. Verify the API key is correctly set in your Vercel environment variables
2. Check the Vercel Function logs for any error messages
3. Ensure your Resend account is active and has sending permissions
4. Check your Resend dashboard for any sending limits or errors

## 7. Custom Domain (Optional)

For better deliverability:

1. In your Resend dashboard, go to "Domains"
2. Add your domain (e.g., enginaro.com)
3. Follow the DNS verification instructions
4. Once verified, update the "from" address in your API route to use your domain:
   ```javascript
   from: 'Contact Form <contact@enginaro.com>'
   ```
5. Redeploy your application 