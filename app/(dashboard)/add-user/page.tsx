'use client';

import { useState,useEffect } from 'react';
import { sendUserDataToWebhook } from '../actions';
import Banner from '@/components/ui/banner';

export default function AddUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const result = await sendUserDataToWebhook({name,email})

      if(result){
        console.log('User data sent successfully!');
        setMessage('User added successfully!');
        setShowBanner(true)
      } else {
        console.error('Failed to send user data to WEBHOOK');
        setMessage('Failed to add user.');
        setShowBanner(true)
      }
  };

  useEffect(() => {
    if (showBanner) {
      setTimeout(() => { setShowBanner(false); setMessage(null); }, 3000);
    }
  }, [showBanner]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
       {showBanner && message && (
        <Banner message={message} />
      )}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add User
          </button>
        </div>
      </form>
     
    </div>
  );
}