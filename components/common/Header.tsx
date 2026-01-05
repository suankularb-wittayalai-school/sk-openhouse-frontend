import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import { useLogin } from "@/contexts/LoginContext";
import fetchAPI from "@/utils/helpers/fetchAPI";
import { user } from "@/utils/types/user";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const Header: FC = () => {
  const t = useTranslations("common");
  const router = useRouter();

  const { isLoggedIn, setIsLoggedIn } = useLogin();

  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<user>();

  useEffect(() => {
    fetchAPI("/v1/user", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [isLoggedIn]);

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
                cursor-pointer items-center justify-center rounded-full border"
              onClick={() => setUserMenuOpen(true)}
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

      <AnimatePresence>
        {userMenuOpen && isLoggedIn && (
          <Dialog onClickOutside={() => setUserMenuOpen(false)}>
            <Text type="headline" className="text-xl!">
              บัญชีของคุณ
            </Text>
            <div>
              {JSON.stringify(user)}
            </div>
            <Button
              variant="primary"
              onClick={() => {
                fetchAPI("/v1/user/signout", {
                  method: "POST",
                }).then((res) => {
                  if (res.ok) {
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("loginStatus");
                    }
                    setIsLoggedIn(false);
                    setUserMenuOpen(false);
                    router.push("/");
                  }
                });
              }}
            >
              ออกจากระบบ
            </Button>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
