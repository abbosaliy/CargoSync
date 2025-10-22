import { useState } from 'react';
import supabase from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import RegisterForm from './RegisterForm';
import { toast } from 'sonner';

function SingUpUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  async function LoginUser() {
    if (!email || !password) {
      toast.error('Bitte email und passwort eingeben!');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error('Fehler beim einloggen!');
      console.log(error);
      return;
    }

    const userId = data.user?.id;
    console.log(userId);

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      toast.error('Profil nicht gefunden!');
      return;
    }

    //role

    if (profile.role === 'fahrer') {
      navigate('/fahrer-dashboard');
    } else if (profile.role === 'disponent') {
      navigate('/disponent-dashboard');
    } else {
      alert('Unbekannta Rolle!');
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className=" absolute top-8 left-8 flex items-center gap-2">
        <img
          src="/Logistik-App/images/logo.png"
          alt="CargoSync Logo"
          className="w-10 h-10"
        />
        <h1 className="text-xl font-bold text-[#0C77FF] tracking-wide">
          CargoSync
        </h1>
      </div>
      <div className="flex items-center justify-center">
        {!open ? (
          <div className="h-auto w-[350px] p-5 gap-15 border  border-black/10 rounded-md border-solid flex flex-col items-center shadow-md ">
            <h2>Anmelden</h2>
            <div className="w-full flex flex-col gap-5">
              <div className="flex flex-col w-full">
                <p>Email</p>
                <Input
                  className="border-1 border-black/20 rounded-md p-2"
                  type="email"
                  placeholder="max@mustermann.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col">
                <p>Password</p>
                <Input
                  className=" border-1 border-black/20 rounded-md p-2"
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col items-center gap-2.5">
                <Button onClick={LoginUser}>Anmelden</Button>
                <p className="text-sm text-gray-600 flex flex-col items-center">
                  Noch kein Konto?
                  <span
                    onClick={() => setOpen(true)}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Registerieren
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <RegisterForm></RegisterForm>
        )}
      </div>
    </div>
  );
}

export default SingUpUser;
