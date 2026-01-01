import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import MaterialIcon from "@/components/common/MaterialIcon";
import Button from "@/components/common/Button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { StylableFC } from "@/utils/types/common";
import { MrtLocation } from "@/utils/types/landing";

const MrtStationCard: StylableFC<{ mrtLocation: MrtLocation }> = ({ mrtLocation }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(!open);
  return (
    <div
      className="border-primary-border w-full overflow-hidden rounded-xl border"
    >
      <div
        className="bg-primary-surface flex items-center justify-between px-2
          py-1"
      >
        <Text type="body" className="text-primary! opacity-100!">
          <span className="font-bold">{mrtLocation.station}</span>{" "}
          <span>{mrtLocation.exit}</span>
        </Text>
        <Button
          variant="transparent"
          className="h-6! w-6! *:p-0!"
          onClick={handleOpen}
        >
          <motion.div
            animate={{ rotate: open ? 0 : 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center justify-center"
          >
            <MaterialIcon icon="arrow_drop_down" />
          </motion.div>
        </Button>
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <hr className="border-primary-border w-[calc(100%+0.125rem)] border-t" />
          <iframe
            src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_MAPS_EMBED_API_KEY}&origin=${mrtLocation.mapLocation},Bangkok&destination=Suankularb+Wittayalai+School,Bangkok&mode=walking`}
            className="w-full border-none"
            height={250}
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MrtStationCard;
