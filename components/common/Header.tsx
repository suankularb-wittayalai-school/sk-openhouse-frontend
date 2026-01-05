import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import { useLogin } from "@/contexts/LoginContext";
import fetchAPI from "@/utils/helpers/fetchAPI";
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
  // Frontend User and Backend User is not compatable here!
  const [user, setUser] = useState<any>();

  useEffect(() => {
    isLoggedIn &&
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
              <Image
                src={user.data.profile_url}
                width={40}
                height={40}
                alt="User Avatar"
                className="block aspect-square h-10 w-10 rounded-lg"
              />
              <MaterialIcon
                icon="face"
                size={24}
                className="text-primary fixed top-1/2 left-1/2 -translate-1/2"
              />
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
            <div
              className="border-primary-border flex items-center gap-2
                rounded-lg border p-2"
            >
              <Image
                src={user.data.profile_url}
                width={40}
                height={40}
                alt="User Avatar"
                className="block aspect-square h-10 w-10 rounded-lg"
              />
              <div className="flex flex-col">
                <Text type="body" className="text-tertiary">
                  {t("header.loggedAccount")}
                </Text>
                <Text type="title" className="text-tertiary">
                  {user.data.email}
                </Text>
              </div>
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
