import { LucideProps } from 'lucide-react';
import React from 'react';

export type Redepemtion = {
  id: string;
  listLabel: string;
  buttonLabel: string;
  value: number;
};

export type SettingsNavItem = {
  key: string;
  path: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
};

export type CustomerType = {
  birthday: string;
  createdAt: string;
  firstName: string;
  id: string;
  phoneNumber: string;
  points: number;
  updatedAt: string;
  visits: number;
};
