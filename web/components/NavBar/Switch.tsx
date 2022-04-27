import { useTheme as useNextTheme } from 'next-themes';
import { Switch, useTheme } from '@nextui-org/react';

export const Switcher = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  return (
    <Switch
      size={'xs'}
      checked={isDark}
      onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
    />
  );
};
