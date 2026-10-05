import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CheckCheck,
  ClipboardList,
  MapPin,
  MonitorSmartphone,
  ShieldCheck,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import ThemaToggle from "../ThemaToggle";



const features = [
  {
    icon: MapPin,
    title: "Lieferstatus per Klick",
    text: "Fahrer melden „Beladen“, „Unterwegs“, „Entladen“ und „Zugestellt“. Jeder Schritt wird mit Uhrzeit gespeichert.",
  },
  {
    icon: Users,
    title: "Fahrer zuweisen",
    text: "Beim Erstellen eines Auftrags direkt den passenden Fahrer auswählen. Jeder Fahrer sieht nur seine eigenen Touren.",
  },
  {
    icon: ClipboardList,
    title: "Auftragsmanagement",
    text: "Aufträge mit Firma, Abhol- und Lieferadresse, Termin, Ladungsart und Gewicht erstellen und bearbeiten.",
  },
  {
    icon: CheckCheck,
    title: "Erledigte Aufträge",
    text: "Abgeschlossene Lieferungen bleiben als Verlauf erhalten – für Disponenten und Fahrer.",
  },
  {
    icon: ShieldCheck,
    title: "Sichere Anmeldung",
    text: "Login über Supabase Auth. Nach der Anmeldung landet jeder automatisch im Dashboard seiner Rolle.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive & Dark Mode",
    text: "Funktioniert im Büro am Desktop genauso wie unterwegs auf dem Smartphone – hell oder dunkel.",
  },
];

const steps = [
  {
    title: "Konto erstellen",
    text: "Registrieren, Rolle wählen (Disponent oder Fahrer) und direkt im Dashboard starten.",
  },
  {
    title: "Auftrag anlegen",
    text: "Der Disponent erfasst den Auftrag und weist ihn einem Fahrer zu.",
  },
  {
    title: "Lieferung verfolgen",
    text: "Der Fahrer meldet jeden Schritt. Der Disponent sieht sofort den aktuellen Stand.",
  },
];

const tech = [
  { name: "React", note: "Komponentenbasierte UI" },
  { name: "TypeScript", note: "Typsichere Codebasis" },
  { name: "Tailwind CSS", note: "Responsives Design-System" },
  { name: "Supabase", note: "Auth & Datenbank" },
];

/* ----------------------------------------------------------------------------
 * Dashboard-Vorschau im Hero (reines JSX/CSS, Beispieldaten)
 * ------------------------------------------------------------------------- */

type Status = "Unterwegs" | "Zugestellt" | "Beladen";

const shipments: {
  id: string;
  route: string;
  driver: string;
  status: Status;
}[] = [
  {
    id: "CS-1042",
    route: "Berlin → Hamburg",
    driver: "M. Weber",
    status: "Unterwegs",
  },
  {
    id: "CS-1041",
    route: "Leipzig → Dresden",
    driver: "A. Kaya",
    status: "Zugestellt",
  },
  {
    id: "CS-1040",
    route: "Halle → München",
    driver: "J. Braun",
    status: "Beladen",
  },
];

const statusStyle: Record<Status, string> = {
  Unterwegs:
    "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  Zugestellt:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Beladen:
    "bg-slate-100 text-slate-600 dark:bg-slate-700/60 dark:text-slate-300",
};

const stats = [
  { label: "Offene Aufträge", value: "8" },
  { label: "Unterwegs", value: "5" },
  { label: "Erledigt", value: "42" },
];

function DashboardPreview() {
  return (
    <div className="relative">
      {/* Leuchtender Hintergrund */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-blue-500/20 via-sky-400/10 to-orange-400/20 blur-2xl" />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
        {/* Fensterleiste */}
        <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 text-xs font-medium text-slate-400">
            Dashboard
          </span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          {/* Kennzahlen */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60"
              >
                <p className="text-[11px] leading-tight text-slate-500 dark:text-slate-400">
                  {s.label}
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* Mini-Karte mit Route */}
          <div className="relative h-28 overflow-hidden rounded-xl bg-sky-50 dark:bg-slate-800/60">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(148_163_184/0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.15)_1px,transparent_1px)] bg-[size:22px_22px]" />
            <svg
              viewBox="0 0 300 110"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                d="M30 85 C 90 85, 90 30, 150 40 S 230 80, 265 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                className="text-blue-500"
              />
            </svg>
            <span className="absolute bottom-4 left-5 h-3 w-3 rounded-full border-2 border-white bg-blue-600 dark:border-slate-900" />
            <MapPin className="absolute top-3 right-6 h-6 w-6 text-orange-500" />
            <span className="absolute top-[30%] left-[46%] grid h-7 w-7 place-items-center rounded-full bg-white text-orange-500 shadow-md dark:bg-slate-900">
              <Truck className="h-4 w-4" />
            </span>
          </div>

          {/* Auftragsliste */}
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {shipments.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between gap-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                    {s.route}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {s.id} · {s.driver}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[s.status]}`}
                >
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <img src="/images/logo.png" alt="" className="h-9 w-9 object-contain" />
      <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        CargoSync
      </span>
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-balance text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {text && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
          {text}
        </p>
      )}
    </div>
  );
}

const primaryBtn =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/30 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-[0.98]";
const secondaryBtn =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800";



function HomePage() {
  const navigate = useNavigate();
  const goLogin = () => navigate("/anmelden");
  const goRegister = () => navigate("/registrieren");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      {/* ------------------------------ Header ------------------------------ */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" aria-label="CargoSync Startseite">
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex dark:text-slate-400">
            <a
              href="#funktionen"
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              Funktionen
            </a>
            <a
              href="#ablauf"
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              So funktioniert's
            </a>
            <a
              href="#technologie"
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              Technologie
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemaToggle />
            <button
              type="button"
              onClick={goLogin}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Anmelden
            </button>
            <button
              type="button"
              onClick={goRegister}
              className="hidden cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 sm:inline-flex"
            >
              Jetzt starten
            </button>
          </div>
        </div>
      </header>

      <main id="top">

        <section className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-blue-100/70 to-transparent dark:from-blue-950/40" />
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 md:pt-20 lg:grid-cols-2 lg:gap-10 lg:pb-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
                <Zap className="h-3.5 w-3.5" />
                Für Disponenten und Fahrer
              </span>

              <h1 className="mt-5 text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem] dark:text-white">
                Lieferungen, Fahrer und Aufträge –{" "}
                <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                  alles an einem Ort.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                CargoSync ist die moderne Plattform für Logistikteams: Aufträge
                erstellen, Fahrer zuweisen und jede Lieferung vom Beladen bis
                zur Zustellung verfolgen.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={goRegister}
                  className={primaryBtn}
                >
                  Kostenlos starten
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a href="#funktionen" className={secondaryBtn}>
                  Funktionen ansehen
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
                {["Status per Klick", "Mobil optimiert", "Dark Mode"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-emerald-500" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <DashboardPreview />
          </div>
        </section>

        <section id="funktionen" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Funktionen"
              title="Alles, was ein Logistikteam täglich braucht"
              text="Statt Excel-Listen, Telefonaten und verstreuten Notizen: ein zentrales Werkzeug für den gesamten Lieferprozess."
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/60 dark:text-blue-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>


        <section
          id="ablauf"
          className="scroll-mt-20 border-y border-slate-200 bg-white py-20 sm:py-24 dark:border-slate-800 dark:bg-slate-900/50"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="So funktioniert's"
              title="In drei Schritten startklar"
            />

            <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
              {steps.map((step, i) => (
                <li key={step.title} className="relative text-center md:px-4">
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-6 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] border-t-2 border-dashed border-slate-200 md:block dark:border-slate-700"
                    />
                  )}
                  <span className="relative mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-md shadow-blue-600/30">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="technologie" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Technologie"
              title="Modern gebaut – schnell und zuverlässig"
              text="CargoSync basiert auf einem aktuellen Frontend-Stack mit typsicherem Code und wiederverwendbaren Komponenten."
            />

            <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {tech.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900"
                >
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {t.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="px-4 pb-20 sm:px-6 sm:pb-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-14 text-center sm:px-12 sm:py-16">
            <Truck className="absolute -top-6 -right-6 h-40 w-40 text-white/10" />
            <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bereit, deine Logistik zu vereinfachen?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-blue-100">
              Erstelle jetzt ein Konto und verwalte deine ersten Lieferungen in
              wenigen Minuten.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={goRegister}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 active:scale-[0.98]"
              >
                Kostenlos registrieren
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goLogin}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ich habe schon ein Konto
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6 dark:text-slate-400">
          <Logo />
          <p>
            © {new Date().getFullYear()} CargoSync · Entwickelt von{" "}
            <a
              href="https://abbosbek-anvarjonov.com/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-slate-700 underline-offset-4 hover:underline dark:text-slate-200"
            >
              Abbosbek Anvarjonov
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
