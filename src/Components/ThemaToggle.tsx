import { useEffect, useState } from 'react';
import { Switch } from './ui/switch';

function ThemaToggle() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const savedThema = localStorage.getItem('thema');
    if (savedThema === 'dark') {
      document.documentElement.classList.add('dark');
      setToggle(true);
    } else {
      document.documentElement.classList.remove('dark');
      setToggle(false);
    }
  }, []);

  function handleToggle() {
    setToggle(!toggle);
    if (!toggle) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('thema', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('thema', 'light');
    }
  }

  return (
    <Switch
      checked={toggle}
      onCheckedChange={handleToggle}
    ></Switch>
  );
}

export default ThemaToggle;
