import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ClipboardList,
  MapPin,
  ShieldCheck,
  Zap,
} from "lucide-react";
import ThemaToggle from "../ThemaToggle";
import LoginForm from "./LoginForm";

type AuthPageProps = {
  /** "login" zeigt zuerst das Login-, "register" das Registrierungsformular */
  mode: "login" | "register";
};

/* Texte für die linke Seite – je nach Modus */
const content = {
  login: {
    title: "Willkommen zurück.",
    text: "Melde dich an und mach dort weiter, wo du aufgehört hast – deine Aufträge warten schon.",
  },
  register: {
    title: "In einer Minute startklar.",
    text: "Konto erstellen, Rolle wählen und direkt mit den ersten Aufträgen loslegen.",
  },
};

const benefits = [
  {
    icon: ClipboardList,
    title: "Aufträge & Fahrer",
    text: "Disponenten erstellen Aufträge und weisen sie direkt zu.",
  },
  {
    icon: MapPin,
    title: "Status per Klick",
    text: "Beladen, Unterwegs, Entladen, Zugestellt – mit Uhrzeit.",
  },
  {
    icon: ShieldCheck,
    title: "Rollenbasiert",
    text: "Nach dem Login landet jeder im passenden Dashboard.",
  },
];

const statusSteps = ["Beladen", "Unterwegs", "Entladen", "Zugestellt"];

function AuthPage({ mode }: AuthPageProps) {
  const { title, text } = content[mode];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      {/* ------------------------------ Header ------------------------------ */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2.5"
            aria-label="Zur Startseite"
          >
            <img
              src="/images/logo.png"
              alt=""
              className="h-9 w-9 object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              CargoSync
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200/60 sm:inline-flex dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Startseite
            </Link>
            <ThemaToggle />
          </div>
        </div>
      </header>

      {/* ------------------------------- Inhalt ------------------------------ */}
      <main className="relative flex flex-1 overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-blue-100/70 to-transparent dark:from-blue-950/40" />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-10 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-16">
          {/* Linke Seite: nur ab Desktop sichtbar */}
          <section className="hidden lg:block">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
              <Zap className="h-3.5 w-3.5" />
              Für Disponenten und Fahrer
            </span>

            <h1 className="mt-5 text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 xl:text-5xl dark:text-white">
              {title}
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {text}
            </p>

            <ul className="mt-10 space-y-5">
              {benefits.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {title}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Kleine Status-Leiste als Wiedererkennung zur Startseite */}
            <div className="mt-10 flex max-w-md items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
              {statusSteps.map((step, i) => (
                <div key={step} className="flex flex-col items-center gap-1.5">
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${
                      i < 2
                        ? "bg-blue-600 text-white"
                        : "border border-slate-300 text-slate-400 dark:border-slate-600"
                    }`}
                  >
                    {i < 2 ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Rechte Seite: Formular */}
          <section className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-blue-500/20 via-sky-400/10 to-orange-400/20 blur-2xl" />

            {/* key sorgt dafür, dass das Formular beim Wechsel zwischen
                /anmelden und /registrieren neu startet */}
            <LoginForm key={mode} defaultMode={mode} />

            <Link
              to="/"
              className="mt-6 flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 sm:hidden dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Zur Startseite
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AuthPage;
