// components
import CopyHistory from "@/components/features/copy-history";
import RandomThaiCodeName from "@/components/features/random-thai-code-name";
import RandomThaiNationalID from "@/components/features/random-thai-national-id";
import RandomTimestamp from "@/components/features/random-timestamp";
import RandomUUID from "@/components/features/random-uuid";

export default function Home() {

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4">
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
        <section className="flex flex-col gap-4">
          <RandomUUID />
          <RandomThaiNationalID />
          <RandomThaiCodeName />
          <RandomTimestamp />
        </section>
        <section className="h-full">
          <CopyHistory rootClassName="min-h-auto" />
        </section>
      </div>
    </div>
  );
}
