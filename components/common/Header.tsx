import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useLogin } from "@/contexts/LoginContext";

const Header: FC = () => {
  const t = useTranslations("common");

  const { isLoggedIn } = useLogin();

  return (
    <div
      className="max-w-content-max mb-6 flex w-screen items-center
        justify-between overflow-auto p-2 px-3 pb-0"
    >
      <Link href="/" className="shrink-0">
        <Image
          src={"/icons/OPH_logo.png"}
          alt="Open House Logo"
          width={64}
          height={64}
        />
      </Link>

      <div className="flex items-center gap-1">
        {isLoggedIn ? (
          <>
            <Link href="/">
              <Button variant="transparent" className="text-nowrap">
                {t("header.details")}
              </Button>
            </Link>
            <Link href="/me">
              <Button variant="primary" className="text-nowrap">
                {t("header.myregistration")}
              </Button>
            </Link>
            <div
              className="bg-primary-surface border-primary-border flex h-10 w-10
                items-center justify-center rounded-full border"
            >
              <MaterialIcon icon="face" size={24} className="text-primary" />
            </div>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="transparent" className="text-nowrap">
                {t("header.login")}
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" className="text-nowrap">
                {t("header.register")}
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
