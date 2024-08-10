
import { useSelector, useSettings } from '@/store';

export default function ThemeOne() {

  // const { theme, SET_THEME } = useSettings();
  // const theme = useSettings((state) => state.theme);
  // const SET_THEME = useSettings((state) => state.SET_THEME);
  const { theme, SET_THEME } = useSettings(useSelector(['theme', 'SET_THEME']));
  // const { theme, SET_THEME } = useSettings(useShallow(state => ({
  //   theme: state.theme,
  //   SET_THEME: state.SET_THEME
  // })));

  return (
    <div>
      <div>theme: {theme}</div>
      <button className="p-1 bg-pink-400" onClick={() => SET_THEME(theme === 'dark' ? 'light' : 'dark')}>ThemeOne theme</button>
    </div>
  );
}
