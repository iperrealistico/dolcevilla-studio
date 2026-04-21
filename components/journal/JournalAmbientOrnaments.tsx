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
      <div className="absolute top-[9rem] right-[-3rem] hidden h-[16rem] w-[16rem] opacity-55 mix-blend-multiply md:block lg:top-[12rem] lg:right-[4%] lg:h-[21rem] lg:w-[21rem]">
        <Image
          src={orbitAsset.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 336px, 0px"
          className="object-contain"
        />
      </div>
      <div className="absolute top-[34rem] left-[-7rem] h-[18rem] w-[18rem] opacity-35 mix-blend-multiply md:top-[42rem] md:left-[2%] md:h-[28rem] md:w-[28rem]">
        <Image
          src={washAsset.src}
          alt=""
          fill
          sizes="(min-width: 768px) 448px, 288px"
          className="object-contain"
        />
      </div>
      <div className="absolute top-[54%] right-[-5rem] h-[14rem] w-[14rem] opacity-40 mix-blend-multiply md:right-[7%] md:h-[18rem] md:w-[18rem] lg:top-[58%]">
        <Image
          src={orbitAsset.src}
          alt=""
          fill
          sizes="(min-width: 768px) 288px, 224px"
          className="object-contain"
        />
      </div>
      <div className="absolute right-[-6rem] bottom-[7rem] h-[18rem] w-[18rem] opacity-36 mix-blend-multiply md:right-[5%] md:bottom-[4rem] md:h-[26rem] md:w-[26rem]">
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
