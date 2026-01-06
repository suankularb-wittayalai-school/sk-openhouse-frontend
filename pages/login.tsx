import AccountSection from "@/components/register/AccountSection";
import { useUser } from "@/contexts/UserContext";
import getStaticTranslations from "@/utils/helpers/getStaticTranslations";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();
  const { user, isLoading: userIsLoading } = useUser();

  useEffect(
    () => {
      if (userIsLoading || user === null) return;

      if (typeof user.onboarded_at !== "string") {
        router.push("/register");
        return;
      }
      router.push("/me");
    },
    [userIsLoading], // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (userIsLoading) return <span>Loading...</span>;

  return (
    <div className="p-3 pt-0">
      <AccountSection
        type="login"
        onRedirect={() => {
          if (typeof user?.onboarded_at === "string") router.push("/me");
          else router.push("/register");
        }}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const messages = await getStaticTranslations("common", "register");

  return {
    props: { messages },
  };
};

export default LoginPage;
