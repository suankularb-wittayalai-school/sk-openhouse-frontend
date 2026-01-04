import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import GSIButton from "@/components/common/GSIButton";
import Text from "@/components/common/Text";
import TextField from "@/components/common/TextField";
import fetchAPI from "@/utils/helpers/fetchAPI";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

export enum GSIStatus {
  initial = "initial",
  chooserShown = "chooserShown",
  processing = "processing",
  redirecting = "redirecting",
}

const AccountSection: FC<{ onRedirect: () => void }> = ({ onRedirect }) => {
  const [state, setState] = useState<GSIStatus>(GSIStatus.initial);
  const [token, setToken] = useState<string>("");
  const [testResponse, setTestResponse] = useState<string>("");

  useEffect(() => {
    if (state == GSIStatus.redirecting) {
      onRedirect();
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-primary text-2xl font-bold">ลงทะเบียน</h1>
      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={{ opacity: 0, y: "-0.5rem", filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: "0.5rem", filter: "blur(4px)" }}
            transition={{ duration: 0.25 }}
          >
            {
              {
                [GSIStatus.initial]: <GSIButton onStateChange={setState} />,
                [GSIStatus.chooserShown]: (
                  <>
                    <Text type="title">
                      ดำเนินการต่อในหน้าต่างใหม่ที่เพิ่งเปิด
                    </Text>
                    <Button
                      variant="primarySurface"
                      onClick={() => setState(GSIStatus.initial)}
                    >
                      ยกเลิก
                    </Button>
                  </>
                ),
                [GSIStatus.processing]: (
                  <Text type="title">กำลังดำเนินการ</Text>
                ),
                [GSIStatus.redirecting]: (
                  <Text type="title">กำลังเปลี่ยนเส้นทาง</Text>
                ),
              }[state]
            }
          </motion.div>
        </AnimatePresence>
      </div>
      {process.env.NODE_ENV == "development" && (
        <Card className="flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="text-lg font-bold">DEV: Signing in via OAUTH2.0</p>
            <p className="text-sm">
              This method is only available in development builds.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm">
              1. Get <b>auth_token</b> from backend:
            </p>
            <Link
              target="_blank"
              href={
                process.env.NEXT_PUBLIC_OPENHOUSE_API_URL +
                "/v1/user/oauth/init"
              }
            >
              <Button variant="primary" className="w-full">
                Sign in with OAUTH2.0
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              2. Paste <b>auth_token</b> from backend onto the field below,
              submit, then go on your day.
              <br />
              (You may test if it's functioning by using the <b>
                testFetch()
              </b>{" "}
              function below.):
            </p>
            <TextField
              name={"token"}
              label="Token"
              value={token}
              setValue={setToken}
              className="w-full"
            />
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex w-full flex-col gap-2">
                <Button
                  variant={"primary"}
                  disabled={token == ""}
                  onClick={() => {
                    setToken("");
                    if (typeof window !== "undefined") {
                      localStorage.setItem("skopen26-sessionToken", token);
                    }
                  }}
                >
                  Set Token (localStorage)
                </Button>
                <Button
                  variant={"primarySurface"}
                  onClick={() => {
                    setTestResponse("Fetching...");
                    fetchAPI("/v1/user", {
                      method: "GET",
                    })
                      .then((res) => res.json())
                      .then((data) => setTestResponse(data));
                  }}
                >
                  Test Fetch (/user)
                </Button>
              </div>
              <div
                className="border-primary-border w-full rounded-lg border p-2"
              >
                <p className="font-[monospace]! text-xs break-all">
                  <b>GET {process.env.NEXT_PUBLIC_OPENHOUSE_API_URL}/v1/user</b>
                  <br />
                  {testResponse !== ""
                    ? JSON.stringify(testResponse)
                    : "No requests have been taken yet."}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AccountSection;
