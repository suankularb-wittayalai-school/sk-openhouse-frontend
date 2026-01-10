import { useUser } from "@/contexts/UserContext";
import getUserType from "@/utils/helpers/getUserType";
import Image from "next/image";

const BackgroundDecoration = () => {
  const { user } = useUser();

  return (
    <Image
      src={
        getUserType(user ?? undefined) == "staff"
          ? "/longbuilding-secondary.svg"
          : "/longbuilding-primary.svg"
      }
      alt="Suankularb Building (Long Building)"
      width={1920}
      height={396.35}
      className="fixed bottom-12 left-0 -z-1000 min-h-60 w-screen object-cover"
    />
  );
};

export default BackgroundDecoration;
