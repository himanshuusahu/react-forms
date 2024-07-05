import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
    navigate('/second-page', { replace: true });
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">First Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="block">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="block w-full p-2 pl-0 text-sm text-gray-700 border border-gray-300 rounded-md"
            placeholder="Enter your name"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Phone:</span>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="block w-full p-2 pl-0 text-sm text-gray-700 border border-gray-300 rounded-md"
            placeholder="Enter your phone number"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="block w-full p-2 pl-0 text-sm text-gray-700 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </label>
        <br />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FirstPage;