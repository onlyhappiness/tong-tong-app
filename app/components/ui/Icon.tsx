import {icons} from 'lucide-react-native';
import React from 'react';

interface Props {
  name: any;
  color?: string;
  size?: number;
}

const Icon = ({name, color, size = 20}: Props) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
