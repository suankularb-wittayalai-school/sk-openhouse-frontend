import { GSIStatus } from "@/components/common/GSIButton";
import { useUser } from "@/contexts/UserContext";
import { fetchAPI2 } from "@/utils/helpers/fetchAPI";
import type { User } from "@/utils/types/user";
import type { GsiButtonConfiguration, IdConfiguration } from "google-one-tap";
import { useLocale } from "next-intl";
import { useEffect } from "react";

export default function useGoogleIdentityServices(options: {
  parentButtonID: string;
  onStateChange: (state: GSIStatus) => void;
}) {
  const { parentButtonID, onStateChange } = options;

  const locale = useLocale();
  const { setUser } = useUser();

  const logInWithGoogle = async (credential: string) => {
    onStateChange(GSIStatus.processing);
    fetchAPI2<{ auth_token: string } | null>("/v1/user/oauth/code", {
      method: "POST",
      body: JSON.stringify({ id_token: credential }),
    }).then((body) => {
      if (!body.success) throw new Error("Failed to authenticate with the API");
      if (process.env.NODE_ENV === "development" && body.data !== null) {
        localStorage.setItem("skopen26-sessionToken", body.data.auth_token);
        document.cookie = `auth_token=${body.data.auth_token}`;
        console.log("[dev] Saved `auth_token` to localStorage");
      }

      fetchAPI2<User>("/v1/user").then((body) => {
        if (!body.success) throw new Error("Failed to fetch user");

        setUser(body.data);
        onStateChange(GSIStatus.redirecting);
      });
    });
  };

  const initializeOneTap = async () => {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      cancel_on_tap_outside: false,
      use_fedcm_for_prompt: true,
      log_level: "info",
      callback: async ({ credential }) => logInWithGoogle(credential),
    } satisfies IdConfiguration);
  };

  const promptOneTapUI = async () => {
    window.google.accounts.id.prompt((notification) => {
      if (notification.isSkippedMoment()) {
      }
    });
  };

  const renderGSIButton = async () => {
    const parentButton = document.getElementById(parentButtonID);
    if (parentButton === null) throw new Error("Failed to render GSI button");

    window.google.accounts.id.renderButton(parentButton, {
      theme: "outline",
      text: "signin_with",
      width: 256, // 256px, Google fixes width when <iframe> is loaded
      shape: "pill",
      locale,
      click_listener: () => onStateChange(GSIStatus.chooserShown),
    } satisfies GsiButtonConfiguration);
  };

  // Top-level effect to handle GIS button and Google initialization
  useEffect(
    () => {
      const handleLoad = async () => {
        await initializeOneTap();
        await promptOneTapUI();
        await renderGSIButton();
      };

      if (window.google) {
        handleLoad();
        return;
      }

      document
        .querySelector("script[src*='accounts.google.com']")
        ?.addEventListener("load", handleLoad);
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );
}
