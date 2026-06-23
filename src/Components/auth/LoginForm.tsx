import { useState } from "react";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabaseClient";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import RegisterForm from "./RegisterForm";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  async function handleLogin() {
    if (!email || !password) {
      toast.error("Bitte email und passwort eingeben!");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Fehler beim einloggen!");
      return;
    }

    const userId = data.user?.id;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      toast.error("Profil nicht gefunden!");
      return;
    }

    if (profile.role === "fahrer") {
      navigate("/fahrer-dashboard");
    } else if (profile.role === "disponent") {
      navigate("/disponent-dashboard");
    } else {
      toast.error("Unbekannte Rolle!");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {!open ? (
        <Card className="dark:bg-slate-900  h-auto w-[350px] p-5 gap-15 flex flex-col items-center shadow-md ">
          <h2>Anmelden</h2>
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col w-full">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Email adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center gap-2.5">
              <Button onClick={handleLogin} className="cursor-pointer">
                Anmelden
              </Button>
              <p className="text-sm text-gray-600 flex flex-col items-center dark:text-white/50">
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
        </Card>
      ) : (
        <RegisterForm />
      )}
    </div>
  );
}

export default LoginForm;
