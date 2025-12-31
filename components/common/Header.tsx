import Image from "next/image";
import Button from "./Button";
import { FC } from "react";
import { useTranslations } from "next-intl";
import MaterialIcon from "./MaterialIcon";

const Header: FC = () => {
  const t = useTranslations();

  const isLogin = false; // change later when auth is ready

  const handleOnClick = () => {};

  return (
    <div className="flex items-center justify-between">
      <Image
        src={"/icons/OPH_logo.png"}
        alt="Open House Logo"
        width={48}
        height={48}
      />

      <div className="flex">
        {isLogin ? (
          <div
            className="bg-primary-surface flex h-8 w-8 items-center
              justify-center rounded-full"
          >
            <MaterialIcon icon="face" size={24} />
          </div>
        ) : (
          <>
            <Button onClick={handleOnClick} varient="transparent">
              {t("registration.login")}
            </Button>
            <Button onClick={handleOnClick} varient="primary">
              {t("registration.signup")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
