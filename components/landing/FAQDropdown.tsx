import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import { useState } from "react";
import Text from "@/components/common/Text";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const FAQDropdown: StylableFC<{ question: string; answer: string }> = ({
  style,
  className,
  question,
  answer,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    if (open == false) {
      setOpen(true);
    } else setOpen(false);
  };
  return (
    <div
      style={style}
      className={cn(
        "bg-on-background border-primary-border flex flex-col gap-2 rounded-lg",
        "border p-2",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <Text type="body" className="text-primary! font-bold! opacity-100!">
          {question}
        </Text>
        <button onClick={handleOpen}>
          {open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </button>
      </div>
      {open && (
        <>
          <hr className="border-primary-border -mx-2 w-[calc(100%+1rem)] border-t" />
          <Text type="body" className="opacity-100!">
          {answer}
        </Text>
        </>
      )}
    </div>
  );
};

export default FAQDropdown;
