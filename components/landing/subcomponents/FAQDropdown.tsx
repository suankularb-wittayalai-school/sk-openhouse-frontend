import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import { useState } from "react";
import Text from "@/components/common/Text";
import MaterialIcon from "@/components/common/MaterialIcon";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/components/common/Button";

/**
 * A card that show question and answer as a drop down
 * @param question The question to show.
 * @param answer The answer to show under dropdown.
 */

const FAQDropdown: StylableFC<{
  question: string;
  children: React.ReactNode;
}> = ({ style, className, question, children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(!open);
  return (
    <div
      style={style}
      className={cn(
        "bg-on-background border-primary-border flex flex-col rounded-lg",
        "border",
        className,
      )}
    >
      <div
        className="flex cursor-pointer items-center justify-between p-2 pl-3"
        onClick={handleOpen}
      >
        <Text type="title" className="text-primary! font-bold! opacity-100!">
          {question}
        </Text>
        <Button variant="transparent" className="h-6! w-6! *:p-0!">
          <motion.div
            animate={{ rotate: open ? 0 : 180 }}
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="border-primary-border text-tertiary! border-t p-2
                text-sm! opacity-100!"
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQDropdown;
