import {icons, LucideProps} from 'lucide-react-native';
import React from 'react';

interface Props extends LucideProps {
  name: string;
  color?: string;
  size?: number;
}

const Icon = ({name, color = 'black', size = 20, ...props}: Props) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} {...props} />;
};

export default Icon;
