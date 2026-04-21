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
      <div className="absolute top-[10rem] right-[-3rem] hidden h-[15rem] w-[15rem] opacity-24 mix-blend-darken md:block lg:top-[13rem] lg:right-[5%] lg:h-[19rem] lg:w-[19rem]">
        <Image
          src={orbitAsset.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 336px, 0px"
          className="object-contain"
        />
      </div>
      <div className="absolute top-[35rem] left-[-6rem] h-[15rem] w-[15rem] opacity-18 mix-blend-darken md:top-[42rem] md:left-[3%] md:h-[22rem] md:w-[22rem]">
        <Image
          src={washAsset.src}
          alt=""
          fill
          sizes="(min-width: 768px) 448px, 288px"
          className="object-contain"
        />
      </div>
      <div className="absolute top-[54%] right-[-4rem] h-[12rem] w-[12rem] opacity-20 mix-blend-darken md:right-[8%] md:h-[16rem] md:w-[16rem] lg:top-[58%]">
        <Image
          src={orbitAsset.src}
          alt=""
          fill
          sizes="(min-width: 768px) 288px, 224px"
          className="object-contain"
        />
      </div>
      <div className="absolute right-[-5rem] bottom-[7rem] h-[15rem] w-[15rem] opacity-18 mix-blend-darken md:right-[5%] md:bottom-[5rem] md:h-[22rem] md:w-[22rem]">
        <Image
          src={washAsset.src}
          alt=""
          fill
          sizes="(min-width: 768px) 416px, 288px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
