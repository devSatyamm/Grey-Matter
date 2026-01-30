import React from 'react';
import { Mail, User } from 'lucide-react';

export const AmongUsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
     <path d="M12 2C8 2 5 5 5 9v6c0 4 3 7 7 7s7-3 7-7V9c0-4-3-7-7-7z" />
     <path d="M14 7h-4" />
  </svg>
);

export const WalkieTalkieIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="6" y="8" width="12" height="14" rx="2" />
    <line x1="12" y1="2" x2="12" y2="8" />
    <line x1="10" y1="12" x2="14" y2="12" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
);

export const IdCardIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="2" />
    <line x1="15" y1="8" x2="19" y2="8" />
    <line x1="15" y1="12" x2="19" y2="12" />
    <path d="M7 16h4" />
  </svg>
);

export const EmailIcon = Mail;
export const UserIcon = User;
