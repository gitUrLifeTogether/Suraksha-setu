import React from 'react';
import { User, Shield, Phone } from 'lucide-react';

export default function RoleSelector({ role, setRole }) {
  return (
    <div className="flex gap-2 bg-gray-800 p-2 rounded-lg">
      <button
        onClick={() => setRole('guest')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${role === 'guest' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
      >
        <User className="w-4 h-4" /> Guest
      </button>
      <button
        onClick={() => setRole('staff')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${role === 'staff' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
      >
        <Shield className="w-4 h-4" /> Hotel Staff
      </button>
      <button
  onClick={() => setRole('emergency')}
  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${role === 'emergency' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
>
  <Phone className="w-4 h-4" /> 112 Dispatch
</button>
    </div>
  );
}