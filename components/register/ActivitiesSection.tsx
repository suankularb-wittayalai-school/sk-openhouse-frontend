import SegmentedButton from "@/components/common/SegmentedButton";
import Button from "@/components/common/Button";

const ActivitiesSection = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-primary text-2xl font-bold">กิจกรรมที่จะเข้าร่วม</h1>
      <div className="flex flex-col gap-1">
        <div className="border-primary-border rounded-lg border bg-white p-3">
          <div className="flex items-center gap-2">
            <div
              className="bg-primary-surface border-primary-border text-primary
                rounded-full border px-2 py-1 text-xs"
            >
              กิจกรรม
            </div>
            <p className="text-primary text-sm">แนะนำภาพรวมหลักสูตร</p>
          </div>
          <SegmentedButton>
            <Button icon="check_small" variant="primarySurface">
              เข้าร่วม
            </Button>{" "}
            <Button className="border-l-0!" variant="primarySurface">
              ไม่เข้าร่วม
            </Button>
          </SegmentedButton>
        </div>
        <div className="border-primary-border rounded-lg border bg-white p-3">
          <div className="flex items-center gap-2">
            <div
              className="bg-primary-surface border-primary-border text-primary
                rounded-full border px-2 py-1 text-xs"
            >
              กิจกรรม
            </div>
            <p className="text-primary text-sm">School Tour</p>
          </div>
          <SegmentedButton>
            <Button variant="primarySurface">เข้าร่วม</Button>{" "}
            <Button
              className="border-l-0!"
              icon="check_small"
              variant="primarySurface"
            >
              ไม่เข้าร่วม
            </Button>
          </SegmentedButton>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesSection;
