import { Outlet, useNavigate } from 'react-router-dom';
import supabase from '../../lib/supabaseClient';
import { useEffect } from 'react';

function Rooute() {
  const navigate = useNavigate();

  useEffect(() => {
    async function chekAuth() {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
      } else {
        navigate('/');
      }
    }

    chekAuth();
  }, [navigate]);

  return <Outlet></Outlet>;
}

export default Rooute;
