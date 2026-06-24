import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import LoginForm from "./LoginForm";


// MOCKS
// Externe Abhängigkeiten werden durch Fake-Versionen ersetzt,
// damit die Tests ohne Browser und ohne echten Server laufen.

// Supabase-Mock: signInWithPassword und Profilabfrage werden gefälscht.
// Der Pfad muss exakt mit dem Import in der Komponente übereinstimmen.
const mockSignIn = vi.fn();
const mockSingle = vi.fn();
vi.mock("../../lib/supabaseClient", () => ({
  default: {
    auth: {
      signInWithPassword: (...args: unknown[]) => mockSignIn(...args),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: (...args: unknown[]) => mockSingle(...args),
        }),
      }),
    }),
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

// RegisterForm-Mock: vereinfacht, da separat getestet
vi.mock("./RegisterForm", () => ({
  default: () => <div>Registrierungs-Formular</div>,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("LoginForm (SingUpUser)", () => {
  // TEST 1: Validierung 
  // Bei leerem Formular soll ein Fehler erscheinen und kein Login erfolgen
  test("zeigt einen Fehler an und meldet sich nicht an, wenn Felder leer sind", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /anmelden/i }));

    expect(mockToastError).toHaveBeenCalledWith(
      "Bitte email und passwort eingeben!",
    );
    expect(mockSignIn).not.toHaveBeenCalled();
  });

  // TEST 2: Eingabefelder
  test("speichert die eingegebenen Werte in den Feldern", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const email = screen.getByLabelText("Email");
    await user.type(email, "abbos@example.com");

    expect(email).toHaveValue("abbos@example.com");
  });

  //  TEST 3: Erfolgreicher Login 
  // Bei gültigen Daten soll signInWithPassword mit den richtigen
  // Argumenten aufgerufen werden
  test("ruft signInWithPassword auf, wenn Email und Passwort eingegeben sind", async () => {
    mockSignIn.mockResolvedValue({
      data: { user: { id: "test-user-id" } },
      error: null,
    });
    mockSingle.mockResolvedValue({
      data: { role: "fahrer" },
      error: null,
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "abbos@example.com");
    await user.type(screen.getByLabelText("Password"), "GeheimesPasswort1");
    await user.click(screen.getByRole("button", { name: /anmelden/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: "abbos@example.com",
        password: "GeheimesPasswort1",
      });
    });
  });

  // TEST 4: Navigation nach Rolle
  // Bei Rolle "fahrer" soll zum Fahrer-Dashboard navigiert werden
  test("navigiert zum Fahrer-Dashboard, wenn die Rolle 'fahrer' ist", async () => {
    mockSignIn.mockResolvedValue({
      data: { user: { id: "test-user-id" } },
      error: null,
    });
    mockSingle.mockResolvedValue({
      data: { role: "fahrer" },
      error: null,
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "abbos@example.com");
    await user.type(screen.getByLabelText("Password"), "GeheimesPasswort1");
    await user.click(screen.getByRole("button", { name: /anmelden/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/fahrer-dashboard");
    });
  });

  // TEST 5: Fehlerhafter Login 
  // Wenn Supabase einen Fehler zurückgibt, soll eine Fehlermeldung
  // erscheinen und keine Navigation stattfinden
  test("zeigt einen Fehler an, wenn die Anmeldung fehlschlägt", async () => {
    mockSignIn.mockResolvedValue({
      data: { user: null },
      error: { message: "Invalid login credentials" },
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "falsch@example.com");
    await user.type(screen.getByLabelText("Password"), "falschesPasswort");
    await user.click(screen.getByRole("button", { name: /anmelden/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith("Fehler beim einloggen!");
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  // TEST 6: Ansicht wechseln 
  // Beim Klick auf "Registerieren" soll das Registrierungsformular erscheinen
  test("zeigt das Registrierungs-Formular an, wenn auf Registerieren geklickt wird", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByText("Registerieren"));

    expect(screen.getByText("Registrierungs-Formular")).toBeInTheDocument();
  });
});
