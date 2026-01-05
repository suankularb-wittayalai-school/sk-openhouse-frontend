import AccountSection from "@/components/register/AccountSection";
import { getStaticTranslations } from "@/utils/helpers/getStaticTranslations";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();

  return (
    <>
      <AccountSection
        type="signIn"
        onSignInSuccess={() => router.push("/me")}
        onRedirect={() => router.push("/me")}
      />
    </>
  );
};

export async function getStaticProps() {
  const messages = await getStaticTranslations("common", "register");

  return {
    props: { messages },
  };
}

export default LoginPage;
