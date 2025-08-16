import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { aiService } from '../services/aiService';

interface APITestStatusProps {
  onClose?: () => void;
}

export default function APITestStatus({ onClose }: APITestStatusProps) {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'found' | 'missing'>('checking');

  useEffect(() => {
    checkAPIStatus();
  }, []);

  const checkAPIStatus = async () => {
    setApiKeyStatus('checking');
    
    // Check if API key is available
    const openRouterKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const deepSeekKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    
    if (openRouterKey || deepSeekKey) {
      setApiKeyStatus('found');
      setTestMessage('API key found. Testing connection...');
      await testAPIConnection();
    } else {
      setApiKeyStatus('missing');
      setTestMessage('No API key found. Please add your API key to the .env file.');
    }
  };

  const testAPIConnection = async () => {
    setTestStatus('testing');
    
    try {
      // Test with a simple query
      const response = await aiService.generateResponse(
        'Hello, can you respond with a simple greeting?',
        'Test note content',
        false,
        []
      );
      
      if (response.content && !response.error) {
        setTestStatus('success');
        setTestMessage('API connection successful! AI features are ready to use.');
      } else {
        setTestStatus('error');
        setTestMessage('API responded but with an error. Check your API key.');
      }
    } catch (error) {
      setTestStatus('error');
      setTestMessage('Failed to connect to API. Check your internet connection and API key.');
    }
  };

  const getStatusIcon = () => {
    switch (testStatus) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'testing':
        return <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (testStatus) {
      case 'success':
        return 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800';
      case 'error':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800';
      case 'testing':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800';
      default:
        return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI API Status Check
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>

        <div className={`p-4 rounded-xl border ${getStatusColor()}`}>
          <div className="flex items-center space-x-3">
            {getStatusIcon()}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {apiKeyStatus === 'found' ? 'API Key Status' : 'Configuration Status'}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {testMessage}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">API Key:</span>
            <span className={`font-medium ${
              apiKeyStatus === 'found' ? 'text-green-600 dark:text-green-400' : 
              apiKeyStatus === 'missing' ? 'text-red-600 dark:text-red-400' : 
              'text-yellow-600 dark:text-yellow-400'
            }`}>
              {apiKeyStatus === 'found' ? 'Found' : 
               apiKeyStatus === 'missing' ? 'Missing' : 'Checking...'}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Connection:</span>
            <span className={`font-medium ${
              testStatus === 'success' ? 'text-green-600 dark:text-green-400' : 
              testStatus === 'error' ? 'text-red-600 dark:text-red-400' : 
              testStatus === 'testing' ? 'text-blue-600 dark:text-blue-400' : 
              'text-gray-600 dark:text-gray-400'
            }`}>
              {testStatus === 'success' ? 'Connected' : 
               testStatus === 'error' ? 'Failed' : 
               testStatus === 'testing' ? 'Testing...' : 'Not Tested'}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {apiKeyStatus === 'missing' && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Setup Required:</strong> Create a .env file in your project root with your API key:
              </p>
              <code className="block mt-2 p-2 bg-yellow-100 dark:bg-yellow-900/40 rounded text-xs">
                VITE_OPENROUTER_API_KEY=your_key_here
              </code>
            </div>
          )}
          
          {testStatus === 'error' && (
            <button
              onClick={testAPIConnection}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry Connection Test
            </button>
          )}
          
          {testStatus === 'success' && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>✅ Ready!</strong> Your AI features are now fully functional.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Check the browser console for detailed API initialization messages.
          </p>
        </div>
      </div>
    </div>
  );
}
