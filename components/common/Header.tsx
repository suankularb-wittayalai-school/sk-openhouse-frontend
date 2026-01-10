import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import { useUser } from "@/contexts/UserContext";
import { fetchAPI } from "@/utils/helpers/fetchAPI";
import getUserType from "@/utils/helpers/getUserType";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";

const Header: FC = () => {
  const t = useTranslations("common");
  const router = useRouter();
  const { user, setUser } = useUser();
  const isLoggedIn = user !== null;

  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

  return (
    <div
      data-theme={getUserType(user ?? undefined) == "staff" ? "orange" : "blue"}
      className="max-w-content-max mb-6 flex w-screen items-center
        justify-between overflow-auto p-2 px-3 pb-0"
    >
      <Link href="/" className="shrink-0">
        <Image
          src={"/icons/event-logo.png"}
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
            {getUserType(user ?? undefined) != "staff" ? (
              <Link href="/me">
                <Button variant="primary" className="text-nowrap">
                  {t("header.myregistration")}
                </Button>
              </Link>
            ) : (
              <Link href="/staff">
                <Button variant="primary" className="text-nowrap">
                  จัดการพาสปอร์ต
                </Button>
              </Link>
            )}
            <div
              className="bg-primary-surface border-primary-border flex h-10 w-10
                cursor-pointer items-center justify-center rounded-full border"
              onClick={() => setUserMenuOpen(true)}
            >
              {user && user.profile_url ? (
                <Image
                  src={user.profile_url}
                  width={40}
                  height={40}
                  alt="User Avatar"
                  className="block aspect-square h-10 w-10 rounded-full"
                />
              ) : (
                <MaterialIcon icon="face" size={24} className="text-primary" />
              )}
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
            <Text type="headline">บัญชีของคุณ</Text>
            {user && user.profile_url && (
              <div
                className="border-primary-border flex items-center gap-2
                  rounded-lg border p-2"
              >
                <Image
                  src={user.profile_url}
                  width={40}
                  height={40}
                  alt="User Avatar"
                  className="block aspect-square h-10 w-10 rounded-full"
                />
                <div className="flex flex-col">
                  <Text type="body" className="text-tertiary">
                    {t("header.loggedAccount")}
                  </Text>
                  <Text type="title" className="text-tertiary">
                    {user.email}
                  </Text>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <Button
                variant="primarySurface"
                onClick={() => {
                  fetchAPI("/v1/user/signout", {
                    method: "POST",
                  }).then((body) => {
                    if (body.success) {
                      if (process.env.NODE_ENV === "development") {
                        localStorage.removeItem("skopen26-sessionToken");
                        document.cookie = "";
                      }

                      setUser(null);
                      setUserMenuOpen(false);
                    }

                    router.push("/").then(() => window.location.reload());
                  });
                }}
              >
                ออกจากระบบ
              </Button>
              <Button variant="primary" onClick={() => setUserMenuOpen(false)}>
                ปิด
              </Button>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
