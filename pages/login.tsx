import AccountSection from "@/components/register/AccountSection";
import { getStaticTranslations } from "@/utils/helpers/getStaticTranslations";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();

  return (
    <div className="p-3 pt-0">
      <AccountSection
        type="signIn"
        onRedirect={() => router.push("/me")}
      />
    </div>
  );
};

export async function getStaticProps() {
  const messages = await getStaticTranslations("common", "register");

  return {
    props: { messages },
  };
}

export default LoginPage;
