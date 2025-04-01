import CopyRightAndPowerBy from "@/components/common/powerby";
import CopyHistory from "@/components/featues/copy-history";
import RandomUUID from "@/components/featues/random-uuid";

export default function Home() {

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4">
      <RandomUUID />
      <CopyHistory />
      <CopyRightAndPowerBy />
    </div>
  );
}
