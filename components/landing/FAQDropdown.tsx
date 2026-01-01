import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import { useState } from "react";
import Text from "@/components/common/Text";
import MaterialIcon from "@/components/common/MaterialIcon";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/components/common/Button";

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
        "bg-on-background border-primary-border flex flex-col rounded-lg",
        "border",
        className,
      )}
    >
      <div className="flex items-center justify-between px-2 py-1">
        <Text type="body" className="text-primary! font-bold! opacity-100!">
          {question}
        </Text>
        <Button
          variant="transparent"
          className="h-6! w-6! *:p-0!"
          onClick={handleOpen}
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center justify-center"
          >
            <MaterialIcon icon="arrow_drop_down" />
          </motion.div>
        </Button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <hr
              className="border-primary-border -mx-px w-[calc(100%+0.125rem)]
                border-t"
            />
            <div className="px-2 py-1">
              <Text type="body" className="opacity-100!">
                {answer}
              </Text>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQDropdown;
