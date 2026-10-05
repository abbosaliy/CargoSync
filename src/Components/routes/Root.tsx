import { Outlet, useLocation, useNavigate } from "react-router-dom";
import supabase from "../../lib/supabaseClient";
import { useEffect } from "react";

function Rooute() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {

    if (!pathname.includes("-dashboard")) return;

    async function chekAuth() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/anmelden");
      }
    }

    chekAuth();
  }, [navigate, pathname]);

  return <Outlet></Outlet>;
}

export default Rooute;
