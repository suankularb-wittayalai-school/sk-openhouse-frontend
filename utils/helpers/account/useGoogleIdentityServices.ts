import { GSIStatus } from "@/components/register/AccountSection";
import UserContext from "@/contexts/UserContext";
import fetchAPI from "@/utils/helpers/fetchAPI";
import { GsiButtonConfiguration, IdConfiguration } from "google-one-tap";
import { useLocale } from "next-intl";
import { useContext, useEffect } from "react";

export default function useGoogleIdentityServices(
  options: Partial<{
    parentButtonID: string;
    onStateChange: (state: GSIStatus) => void;
  }>,
) {
  const { parentButtonID, onStateChange } = options;

  const locale = useLocale();
  const { setUser } = useContext(UserContext);

  async function logInWithGoogle(credential: string) {
    onStateChange?.(GSIStatus.processing);
    fetchAPI("/v1/user/oauth/code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: credential }),
    }).then((res) => {
      if (res.ok) {
        fetchAPI("/v1/user", { method: "GET" })
          .then((res) => res.json())
          .then(({ data }) => {
            // Check for error here
            setUser(data);
          });
        onStateChange?.(GSIStatus.redirecting);
      }
    });
  }

  async function initializeGoogle() {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      cancel_on_tap_outside: false,
      use_fedcm_for_prompt: true,
      log_level: "info",
      callback: async ({ credential }) => {
        logInWithGoogle(credential);
      },
    } as IdConfiguration);
  }

  async function promptOneTapUI() {
    window.google.accounts.id.prompt((notification) => {
      if (notification.isSkippedMoment()) {
      }
    });
  }

  async function renderGSIButton() {
    const parentButton = parentButtonID
      ? document.getElementById(parentButtonID)
      : null;
    if (!parentButton) return;
    window.google.accounts.id.renderButton(parentButton, {
      theme: "outline",
      text: "signin_with",
      width: 256, // 256px, Google fixes width when <iframe> is loaded
      shape: "pill",
      locale,
      click_listener: () => onStateChange?.(GSIStatus.chooserShown),
    } as GsiButtonConfiguration);
  }

  // Top-level effect to handle GIS button and Google initialization
  useEffect(() => {
    async function handleLoad() {
      await initializeGoogle();
      await promptOneTapUI();
      await renderGSIButton();
    }
    if (window.google) {
      handleLoad();
      return;
    }
    const script = document.querySelector("script[src*='accounts.google.com']");
    if (script) script.addEventListener("load", handleLoad);
  }, []);
}
