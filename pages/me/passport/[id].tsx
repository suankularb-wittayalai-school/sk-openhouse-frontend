import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import PassportQRCard from "@/components/passport/PassportQRCard";
import fetchAPI from "@/utils/helpers/fetchAPI";
import getStaticTranslations from "@/utils/helpers/getStaticTranslations";
import { GetServerSideProps } from "next";

const PassportPage = ({ activities }: { activities: any }) => {
  return (
    <div className="flex flex-col gap-3 p-3 pt-0">
      <div
        className="justity-center flex print:fixed print:top-0 print:left-0
          print:z-100 print:h-dvh print:w-dvw print:bg-white"
      >
        <PassportQRCard
          passport="f192bbe1-049d-4b86-bf67-60b9920adabf"
          owner={"Atipol S."}
          className="m-auto"
        />
      </div>
      <Button variant="primary" icon="print" onClick={() => window.print()}>
        พิมพ์พาสปอร์ต
      </Button>

      <div>
        <div
          className="border-primary-border rounded-lg border bg-white
            [&>div]:not-first:border-t"
        >
          {activities.data.map((activity: any) => {
            return (
              <div
                key={activity.id}
                className="border-primary-border flex items-center gap-2 p-2"
              >
                <Text type="title" className="w-6 text-center">
                  {activity.number}
                </Text>
                <div className="flex grow flex-col">
                  <Text type="title" element="p">
                    {activity.name}
                  </Text>
                  <Text type="body" element="p">
                    {activity.location}
                  </Text>
                </div>
                <MaterialIcon
                  icon={"close"}
                  className={"text-secondary"}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Text type="body" element="p">
          แลกของรางวัล
        </Text>
        <div
          className="border-primary-border rounded-lg border bg-white
            [&>div]:not-first:border-t"
        >
          <div className="border-primary-border flex items-center gap-2 p-2">
            <div className="flex grow flex-col">
              <Text type="body" element="p">
                คุณยังไม่ได้แลกของรางวัล
              </Text>
            </div>
          </div>
        </div>
        <Text type="body" element="p" className="text-right">
          คุณสามารถแลกของรางวัลได้ 1 ครั้งเท่านั้น
        </Text>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const messages = await getStaticTranslations("common");

  const activities = await fetchAPI("/v1/activities", {}, req.cookies);
  return { props: { messages, activities } };
};

export default PassportPage;
