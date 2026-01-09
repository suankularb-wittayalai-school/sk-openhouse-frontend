import Text from "@/components/common/Text";
import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import Image from "next/image";
import QRCode from "react-qr-code";

const PassportQRCard: StylableFC<{
  passport: string;
  owner: string;
}> = ({ passport, owner, className, style }) => {
  return (
    <div
      className={cn(
        "flex h-105 w-74.25 flex-col rounded-lg bg-white p-4 shadow-lg",
        className,
      )}
      style={style}
    >
      <div className="flex flex-col">
        <Text type="body" className="opacity-100!">
          พาสปอร์ตดิจิตัล
        </Text>
        <Text type="headline">SK Open House 2026</Text>
      </div>
      <div className="relative h-full">
        <div
          className="border-primary-border absolute top-1/2 left-1/2
            aspect-square w-3/4 -translate-1/2 rounded-lg border-2 bg-white p-2"
        >
          <QRCode
            value={"https://o.mysk.school/p/" + passport}
            level="Q"
            bgColor="transparent"
            fgColor="var(--teitiary)"
            className="aspect-square h-min w-full select-none"
          />
        </div>
        <Image
          src={"/qr-branding.png"}
          width={128}
          height={128}
          alt="Lord of the Rings"
          className="border-primary-border absolute top-1/2 left-1/2 h-12 w-12
            -translate-1/2"
        />
        <Image
          src={"/ring.svg"}
          width={512}
          height={512}
          alt="Lord of the Rings"
          className="object-fit h-full select-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-0.5">
          <Text type="body" className="text-[10px]">
            พาสปอร์ตนี้เป็นของ
          </Text>
          <Text type="title" className="text-xs">
            {owner}
          </Text>
        </div>
        <div className="flex flex-col gap-0.5">
          <Text type="body" className="text-[10px]">
            หมดอายุ
          </Text>
          <Text type="title" className="text-xs">
            11-01-2569 / 23:59 น.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PassportQRCard;
