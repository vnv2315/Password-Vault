'use client';
import { useState } from 'react';
import { decryptData } from '@/utils/crypto';

export default function VaultItem({ item, onDelete, onEdit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const decryptedPassword = decryptData(item.password);

  const copyPassword = () => {
    navigator.clipboard.writeText(decryptedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 10000); // 10 seconds as per assignment
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-purple-500 transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          {item.username && (
            <p className="text-slate-400 text-sm mt-1">👤 {item.username}</p>
          )}
          {item.url && (
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm mt-1 inline-block"
            >
              🔗 {item.url}
            </a>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(item)} className="text-blue-400 hover:text-blue-300 text-sm">
            Edit
          </button>
          <button onClick={() => onDelete(item._id)} className="text-red-400 hover:text-red-300 text-sm">
            Delete
          </button>
        </div>
      </div>

      <div className="mb-3">
        <label className="text-slate-400 text-sm">Password</label>
        <div className="flex gap-2 mt-1">
          <input
            type={showPassword ? 'text' : 'password'}
            value={decryptedPassword}
            readOnly
            className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm font-mono"
          />
          <button 
            onClick={() => setShowPassword(!showPassword)} 
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
          <button 
            onClick={copyPassword} 
            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
            title="Copy password (auto-clears in 10s)"
          >
            {copied ? '✓' : '📋'}
          </button>
        </div>
        {copied && (
          <p className="text-green-400 text-xs mt-1">Copied! Will auto-clear in 10 seconds</p>
        )}
      </div>

      {item.notes && (
        <div>
          <label className="text-slate-400 text-sm">Notes</label>
          <p className="text-slate-300 text-sm mt-1 whitespace-pre-wrap">{item.notes}</p>
        </div>
      )}
    </div>
  );
}