import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  const t = useTranslations("common");

  const isLogin = false; // change later when auth is ready

  return (
    <div className="flex items-center justify-between">
      <Link href="/" className="shrink-0">
        <Image
          src={"/icons/OPH_logo.png"}
          alt="Open House Logo"
          width={48}
          height={48}
        />
      </Link>

      <div className="flex gap-1">
        {isLogin ? (
          <div
            className="bg-primary-surface flex h-8 w-8 items-center
              justify-center rounded-full"
          >
            <MaterialIcon icon="face" size={24} />
          </div>
        ) : (
          <>
            <Link href="/login">
              <Button variant="transparent">{t("header.login")}</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary">{t("header.register")}</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
