const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n====== Resend Email Configuration Setup ======\n');
console.log('This script will help you set up your .env.local file for the contact form.');
console.log('You need a Resend.com API key to proceed. Create one at https://resend.com\n');

rl.question('Enter your Resend API key: ', (resendApiKey) => {
  const envContent = `# Email configuration for contact form using Resend
RESEND_API_KEY=${resendApiKey}

# Note: For production deployment:
# 1. Add this environment variable to your Vercel project settings
# 2. Keep this file secure and never commit it to version control`;

  const envPath = path.join(process.cwd(), '.env.local');
  
  // Check if file already exists
  if (fs.existsSync(envPath)) {
    rl.question('\nWarning: .env.local already exists. Overwrite? (y/n): ', (answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        writeEnvFile(envPath, envContent);
      } else {
        console.log('Setup cancelled. Existing .env.local file was not modified.');
      }
      rl.close();
    });
  } else {
    writeEnvFile(envPath, envContent);
    rl.close();
  }
});

function writeEnvFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content);
    console.log('\nSuccess! .env.local file has been created.');
    console.log('The contact form will now send emails to enginaro.industrialsolutions@gmail.com using Resend.');
    console.log('\nIMPORTANT:');
    console.log('1. Never commit this file to version control!');
    console.log('2. For production, add the RESEND_API_KEY to your Vercel environment variables.');
    console.log('3. See docs/contact-form-setup.md for more details on configuring the email service.');
  } catch (error) {
    console.error('\nError creating .env.local file:', error.message);
  }
} 