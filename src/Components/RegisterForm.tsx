import { useState } from 'react';
import supabase from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import SingUpUser from './LoginForm';
import { Card } from './ui/card';

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  async function RegisterForm() {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !role ||
      !phoneNumber
    ) {
      toast.error('Bitte alle pflichtfelder Ausfüllen');
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      toast.error('Fehler beim Registrieren!');
      console.log(error);

      return;
    }

    const userId = data.user?.id;
    console.log(userId);

    const { error: profilerror } = await supabase.from('profiles').insert([
      {
        id: userId,
        firstName,
        lastName,
        email,
        role,
        phoneNumber,
      },
    ]);

    if (profilerror) {
      toast.error('Fehler beim Registrieren!'), console.log(profilerror);

      return;
    }

    if (role === 'fahrer') {
      navigate('/fahrer-dashboard');
    } else if (role === 'disponent') {
      navigate('/disponent-dashboard');
    } else {
      return;
    }
  }

  return (
    <div className="dark:bg-slate-900 flex  items-center justify-center">
      {!open ? (
        <Card className="dark:bg-slate-900 h-auto w-[350px] p-5 gap-15 border  flex flex-col items-center shadow-md ">
          <h2 className="text-xl ">Registrieren</h2>
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col">
              <p>Vorname</p>
              <Input
                type="text"
                placeholder=""
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <p>Nachname</p>
              <Input
                type="text"
                placeholder=""
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <p>Dienst Nummer</p>
              <Input
                type="text"
                placeholder=""
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <p>Email</p>
              <Input
                type="email"
                placeholder="Email adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className=" flex flex-col">
              <p>Password</p>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <select
              className="border border-black/10 dark:bg-slate-900 dark:border-white/20 rounded-md p-2  focus:outline-none cursor-pointer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Position auswählen</option>
              <option value={'disponent'}>Disponent/in</option>
              <option value={'fahrer'}> Fahrer/in</option>
            </select>
            <div className="flex flex-col items-center gap-2.5">
              <Button
                onClick={RegisterForm}
                className="cursor-pointer"
              >
                Registrieren
              </Button>
              <p className="flex flex-col  items-center text-sm text-gray-600 dark:text-white/50">
                Hast du schon ein Konto?
                <span
                  onClick={() => setOpen(true)}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Anmelden
                </span>
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <SingUpUser></SingUpUser>
      )}
    </div>
  );
}

export default RegisterForm;
