import { getStaticTranslations } from "@/utils/helpers/getStaticTranslations";

const LoginPage = () => {
  return <></>;
};

export async function getStaticProps() {
  const messages = await getStaticTranslations("common");

  return {
    props: { messages },
  };
}

export default LoginPage;
