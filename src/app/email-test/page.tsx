'use client';

import { useState } from 'react';

export default function EmailTestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runDiagnostic = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/email-test');
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to run diagnostic');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Email Integration Test</h1>
        
        <p className="mb-6 text-gray-600">
          This page helps diagnose issues with the email sending functionality.
          Click the button below to test if emails can be sent from your Vercel deployment.
        </p>
        
        <button
          onClick={runDiagnostic}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium 
                     ${loading ? 'bg-gray-400' : 'bg-[#FF6301] hover:bg-[#e55a00]'}
                     transition-colors duration-300`}
        >
          {loading ? 'Running test...' : 'Test Email Integration'}
        </button>
        
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-200 rounded-md text-red-700">
            <h3 className="font-bold">Error</h3>
            <p>{error}</p>
          </div>
        )}
        
        {result && (
          <div className="mt-6">
            <h3 className="font-bold mb-2">Diagnostic Results:</h3>
            <div className="p-4 bg-gray-100 rounded-md overflow-x-auto">
              <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
            </div>
            
            <div className="mt-4 p-4 rounded-md border">
              <h4 className="font-medium">Summary:</h4>
              <ul className="mt-2 space-y-1">
                <li>
                  <span className="font-medium">API Key Present:</span>{' '}
                  <span className={result.apiKeyPresent ? 'text-green-600' : 'text-red-600'}>
                    {result.apiKeyPresent ? '✅ Yes' : '❌ No'}
                  </span>
                </li>
                {result.apiKeyPresent && (
                  <li>
                    <span className="font-medium">API Key Format:</span>{' '}
                    <span className="font-mono text-xs">{result.apiKeyFirstChars}</span>
                  </li>
                )}
                <li>
                  <span className="font-medium">Environment:</span>{' '}
                  <span className="font-mono">{result.environment}</span>
                </li>
                <li>
                  <span className="font-medium">Test Email Sent:</span>{' '}
                  <span className={result.resendTest?.success ? 'text-green-600' : 'text-red-600'}>
                    {result.resendTest?.success ? '✅ Success' : '❌ Failed'}
                  </span>
                </li>
                {!result.resendTest?.success && result.resendTest?.error && (
                  <li>
                    <span className="font-medium">Error:</span>{' '}
                    <span className="text-red-600">{result.resendTest.error.message}</span>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                If the test was successful, check your inbox at enginaro.industrialsolutions@gmail.com for the test email.
                If you don't receive it, check your spam folder or the Resend dashboard for any delivery issues.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 