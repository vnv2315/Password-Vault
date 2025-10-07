'use client';
import { useState } from 'react';

export default function PasswordGenerator({ onUsePassword }) {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: true
  });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const chars = {
      upper: options.excludeSimilar ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lower: options.excludeSimilar ? 'abcdefghjkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz',
      nums: options.excludeSimilar ? '23456789' : '0123456789',
      syms: '!@#$%^&*-_+='
    };

    let pool = '';
    if (options.uppercase) pool += chars.upper;
    if (options.lowercase) pool += chars.lower;
    if (options.numbers) pool += chars.nums;
    if (options.symbols) pool += chars.syms;
    if (!pool) pool = chars.lower;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += pool[Math.floor(Math.random() * pool.length)];
    }
    
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 15000);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg mb-6">
      <h3 className="text-xl font-bold text-white mb-4">Password Generator</h3>
      
      {password && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white font-mono"
          />
          <button onClick={copyToClipboard} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition">
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      )}

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <label className="text-slate-300">Length: {length}</label>
        </div>
        <input type="range" min="8" max="32" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { key: 'uppercase', label: 'Uppercase (A-Z)' },
          { key: 'lowercase', label: 'Lowercase (a-z)' },
          { key: 'numbers', label: 'Numbers (0-9)' },
          { key: 'symbols', label: 'Symbols (!@#$)' }
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={options[key]}
              onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
              className="mr-2"
            />
            {label}
          </label>
        ))}
        <label className="flex items-center text-slate-300 cursor-pointer col-span-2">
          <input
            type="checkbox"
            checked={options.excludeSimilar}
            onChange={(e) => setOptions({ ...options, excludeSimilar: e.target.checked })}
            className="mr-2"
          />
          Exclude similar (i, l, 1, I, 0, O)
        </label>
      </div>

      <button onClick={generatePassword} className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded font-semibold transition">
        Generate Password
      </button>
    </div>
  );
}