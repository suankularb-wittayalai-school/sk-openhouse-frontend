import Image from "next/image";
import Button from "./Button";

const Header = () => {
  const handleOnClick = () => {};

  return (
    <div className="flex items-center justify-between">
      <Image
        src={"/icons/OPH_logo.png"}
        alt="Open House Logo"
        width={48}
        height={48}
      />

      <div className="flex">
        <Button onClick={handleOnClick} varient="transparent">
          เข้าสู่ระบบ
        </Button>
        <Button onClick={handleOnClick} varient="primary">
          ลงทะเบียน
        </Button>
      </div>
    </div>
  );
};

export default Header;
