import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import RegisterForm from "./RegisterForm";

// ─────────────────────────────────────────────────────────────
// MOCKS
// Die Tests müssen ohne Browser und ohne Server laufen. Deshalb
// ersetzen wir externe Abhängigkeiten (Supabase, Router, Toast)
// durch Fake-Versionen. Das macht die Tests schnell und isoliert.
// ─────────────────────────────────────────────────────────────

// Supabase-Mock: signUp und from() werden gefälscht
const mockSignUp = vi.fn();
const mockInsert = vi.fn();
vi.mock("../../lib/supabaseClient", () => ({
  default: {
    auth: { signUp: (...args: unknown[]) => mockSignUp(...args) },
    from: () => ({ insert: (...args: unknown[]) => mockInsert(...args) }),
  },
}));

// react-router-dom-Mock: navigate wird überwacht
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// sonner (Toast)-Mock: Fehlermeldungen werden überwacht
const mockToastError = vi.fn();
vi.mock("sonner", () => ({
  toast: { error: (...args: unknown[]) => mockToastError(...args) },
}));

// LoginForm-Mock: vereinfachte Komponente, da sie separat getestet wird
vi.mock("./LoginForm", () => ({
  default: () => <div>Login-Formular</div>,
}));

// Vor jedem Test alle Mocks zurücksetzen, um sauber zu starten
beforeEach(() => {
  vi.clearAllMocks();
});

describe("RegisterForm", () => {
  // ── TEST 1: Validierung ─────────────────────────────────────
  // Bei leerem Formular soll eine Fehlermeldung erscheinen und
  // Supabase NICHT aufgerufen werden
  test("zeigt einen Fehler an und ruft Supabase nicht auf, wenn das Formular leer ist", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.click(screen.getByRole("button", { name: /registrieren/i }));

    expect(mockToastError).toHaveBeenCalledWith(
      "Bitte alle pflichtfelder Ausfüllen",
    );
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  // ── TEST 2: Eingabefelder ───────────────────────────────────
  // Beim Tippen soll der Wert korrekt im Feld gespeichert werden
  test("speichert den Wert, wenn in ein Eingabefeld geschrieben wird", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const vorname = screen.getByLabelText("Vorname");
    await user.type(vorname, "Abbos");

    expect(vorname).toHaveValue("Abbos");
  });

  // ── TEST 3: Rollenauswahl ───────────────────────────────────
  // Beim Auswählen einer Rolle soll sich der Wert ändern
  test("wählt einen Wert aus dem Positions-Dropdown aus", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const roleSelect = screen.getByLabelText("Position");
    await user.selectOptions(roleSelect, "fahrer");

    expect(roleSelect).toHaveValue("fahrer");
  });

  // ── TEST 4: Vollständig ausgefülltes Formular ───────────────
  // Wenn alle Felder ausgefüllt sind, soll die Validierung
  // bestanden und Supabase signUp aufgerufen werden
  test("ruft Supabase signUp auf, wenn alle Felder ausgefüllt sind", async () => {
    // signUp gibt eine erfolgreiche Antwort zurück
    mockSignUp.mockResolvedValue({
      data: { user: { id: "test-user-id" } },
      error: null,
    });
    mockInsert.mockResolvedValue({ error: null });

    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByLabelText("Vorname"), "Abbos");
    await user.type(screen.getByLabelText("Nachname"), "Anvarjonov");
    await user.type(screen.getByLabelText("Dienst Nummer"), "12345");
    await user.type(screen.getByLabelText("Email"), "abbos@example.com");
    await user.type(screen.getByLabelText("Password"), "GeheimesPasswort1");
    await user.selectOptions(screen.getByLabelText("Position"), "disponent");

    await user.click(screen.getByRole("button", { name: /registrieren/i }));

    // handleRegister ist async – wir warten, bis signUp aufgerufen wurde
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: "abbos@example.com",
        password: "GeheimesPasswort1",
      });
    });

    // Da die Validierung bestanden wurde, darf kein Fehler erscheinen
    expect(mockToastError).not.toHaveBeenCalled();
  });

  // ── TEST 5: Ansicht wechseln ────────────────────────────────
  // Beim Klick auf "Anmelden" soll das Login-Formular erscheinen
  test("zeigt das Login-Formular an, wenn auf Anmelden geklickt wird", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    // Am Anfang ist das Registrierungsformular sichtbar
    expect(
      screen.getByRole("button", { name: /registrieren/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByText("Anmelden"));

    // Jetzt soll das gemockte Login-Formular sichtbar sein
    expect(screen.getByText("Login-Formular")).toBeInTheDocument();
  });
});
