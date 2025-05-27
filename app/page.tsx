// components
import CopyHistory from "@/components/featues/copy-history";
import RandomThaiNationalID from "@/components/featues/random-thai-national-id";
import RandomUUID from "@/components/featues/random-uuid";

export default function Home() {

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4">
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
        <section className="flex flex-col gap-4">
          <RandomUUID />
          <RandomThaiNationalID />
        </section>
        <section className="h-full">
          <CopyHistory rootClassName="min-h-auto" />
        </section>
      </div>
    </div>
  );
}
