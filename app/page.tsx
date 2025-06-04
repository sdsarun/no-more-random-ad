// components
import FooterCopyRight from "@/components/common/footer";
import CopyHistory from "@/components/features/copy-history";
import RandomThaiCodeName from "@/components/features/random-thai-code-name";
import RandomThaiNationalID from "@/components/features/random-thai-national-id";
import RandomTimestamp from "@/components/features/random-timestamp";
import RandomUUID from "@/components/features/random-uuid";

export default function Home() {
  return (
    <div className="h-[calc(100dvh-(53px))] overflow-x-hidden overflow-y-auto flex">
      <div className="h-full flex flex-col flex-1 overflow-auto">
        <main className="p-6">
          <section className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <RandomUUID />
              <RandomThaiNationalID />
            </div>
            <RandomThaiCodeName />
            <RandomTimestamp />
          </section>
        </main>
        <FooterCopyRight />
      </div>
      <aside className="h-full bg-transparent hidden xl:block">
        <CopyHistory
          rootClassName="h-full overflow-auto bg-transparent rounded-none border-none"
        />
      </aside>
    </div>
  );
}
