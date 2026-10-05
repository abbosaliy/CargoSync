import { useState } from "react";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabaseClient";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import RegisterForm from "./RegisterForm";
import {
  authCard,
  authInput,
  authLabel,
  authSubmit,
  authSubtitle,
  authSwitchLink,
  authSwitchText,
  authTitle,
} from "./authStyles";
import { PasswordInput } from "../ui/passwort-input";
type LoginFormProps = {
  /** "register" öffnet direkt das Registrierungsformular */
  defaultMode?: "login" | "register";
};

function LoginForm({ defaultMode = "login" }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(defaultMode === "register");

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
    <div className="flex w-full justify-center">
      {!open ? (
        <Card className={authCard}>
          <div>
            <h2 className={authTitle}>Anmelden</h2>
            <p className={authSubtitle}>
              Willkommen zurück! Melde dich mit deinem Konto an.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className={authLabel}>
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@firma.de"
                className={authInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className={authLabel}>
                Password
              </label>
              <PasswordInput
                id="password"
                placeholder="••••••••"
                className={authInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleLogin} className={authSubmit}>
            Anmelden
          </Button>

          <p className={authSwitchText}>
            Noch kein Konto?{" "}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={authSwitchLink}
            >
              Registrieren
            </button>
          </p>
        </Card>
      ) : (
        <RegisterForm />
      )}
    </div>
  );
}

export default LoginForm;
