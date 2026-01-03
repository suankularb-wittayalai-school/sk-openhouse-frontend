import Card from "@/components/common/Card";
import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import { motion } from "motion/react";

/**
 * A modal dialog component with an overlay and support for actions.
 *
 * It renders a title, a description, and a container for child elements,
 * typically buttons. The dialog can be configured to close when the user
 * clicks on the backdrop overlay. It features animations for appearing and
 * disappearing.
 *
 * @param children  The contents inside the dialog. [DOM]
 * @param onClickOutside  Logic when clicking backdrop. [func, optional]
 */

const Dialog: StylableFC<{
  children: React.ReactNode;
  onClickOutside?: () => void;
}> = ({ children, onClickOutside, style, className }) => {
  return (
    <motion.div
      className="h-vh w-vh bg-on-surface-variant fixed top-0 right-0 bottom-0
        left-0 z-1000 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{
        duration: 0.25,
        type: "spring",
        bounce: 0,
      }}
      onClick={() => {
        onClickOutside && onClickOutside();
      }}
    >
      <motion.div
        id="card"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1, pointerEvents: "none" }}
        transition={{
          duration: 0.25,
          type: "spring",
          bounce: 0,
        }}
        onClick={(e) => {
          // Prevent click inside from passing up to the parent.
          e.stopPropagation();
        }}
      >
        <Card
          style={style}
          className={cn(
            "flex w-92.5 flex-col gap-4 rounded-[1.75rem]! p-6",
            className,
          )}
        >
          {children}
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dialog;
