import Image from "next/image";
import type { ImageAsset } from "@/types/gallery";

type JournalAmbientOrnamentsProps = {
  washAsset: ImageAsset;
  orbitAsset: ImageAsset;
};

export function JournalAmbientOrnaments({
  washAsset,
  orbitAsset,
}: JournalAmbientOrnamentsProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="journal-ornament absolute top-[10rem] right-[-2rem] hidden h-[12rem] w-[12rem] opacity-24 md:block lg:top-[13rem] lg:right-[6%] lg:h-[16rem] lg:w-[16rem]">
        <Image
          src={orbitAsset.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 336px, 0px"
          className="journal-ornament-image object-contain"
        />
      </div>
      <div className="journal-ornament absolute top-[34rem] left-[-5rem] h-[12rem] w-[12rem] opacity-18 md:top-[40rem] md:left-[4%] md:h-[18rem] md:w-[18rem]">
        <Image
          src={washAsset.src}
          alt=""
          fill
          sizes="(min-width: 768px) 448px, 288px"
          className="journal-ornament-image object-contain"
        />
      </div>
      <div className="journal-ornament absolute top-[54%] right-[-3rem] h-[9rem] w-[9rem] opacity-20 md:right-[9%] md:h-[13rem] md:w-[13rem] lg:top-[58%]">
        <Image
          src={orbitAsset.src}
          alt=""
          fill
          sizes="(min-width: 768px) 288px, 224px"
          className="journal-ornament-image object-contain"
        />
      </div>
      <div className="journal-ornament absolute right-[-4rem] bottom-[7rem] h-[12rem] w-[12rem] opacity-18 md:right-[6%] md:bottom-[5rem] md:h-[18rem] md:w-[18rem]">
        <Image
          src={washAsset.src}
          alt=""
          fill
          sizes="(min-width: 768px) 416px, 288px"
          className="journal-ornament-image object-contain"
        />
      </div>
    </div>
  );
}
