"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  startTransition,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getImageAsset } from "@/lib/images/imageManifest";
import { cn } from "@/lib/utils/cn";
import type { ServicePageContent } from "@/types/content";
import { Container } from "@/components/ui/Container";

type TeamMember = NonNullable<ServicePageContent["team"]>["members"][number];

type TeamSlide =
  | {
      kind: "member";
      key: string;
      indexLabel: string;
      title: string;
      subtitle: string;
      description: string;
      image: ReturnType<typeof getImageAsset>;
    }
  | {
      kind: "studio";
      key: string;
      eyebrow: string;
      title: string;
      subtitle: string;
      description: string;
      chips: string[];
      image: ReturnType<typeof getImageAsset>;
    };

const cardBaseClass =
  "group relative shrink-0 snap-start overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.86)] shadow-[0_22px_52px_rgba(30,20,12,0.08)]";

function buildMemberSlide(member: TeamMember, index: number): TeamSlide {
  return {
    kind: "member",
    key: member.name,
    indexLabel: String(index + 1).padStart(2, "0"),
    title: member.name,
    subtitle: member.role,
    description: member.quote,
    image: getImageAsset(member.imageId as never),
  };
}

export function StudioTeamBlock({
  team,
}: {
  team?: ServicePageContent["team"];
}) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const slides = useMemo<TeamSlide[]>(() => {
    if (!team) {
      return [];
    }

    const totalStudioCount = team.members.length + team.supportingRoles.length;

    return [
      ...team.members.map((member, index) => buildMemberSlide(member, index)),
      {
        kind: "studio",
        key: "wider-studio",
        eyebrow: `${String(totalStudioCount).padStart(2, "0")} person studio`,
        title: "The wider studio",
        subtitle:
          "Second photographers, producers, assistants, scanners, archive support, and finishing specialists work to the same taste.",
        description:
          team.groupNote ??
          "It is one working culture rather than a loose roster, which is why the experience can stay calm while the work behind it stays exacting.",
        chips: team.supportingRoles,
        image: getImageAsset("filmCameraCollectionStudioTable"),
      },
    ];
  }, [team]);

  const updateScrollState = useEffectEvent(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const maxScrollLeft = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
    setCanScrollPrev(viewport.scrollLeft > 8);
    setCanScrollNext(viewport.scrollLeft < maxScrollLeft - 8);

    let nextIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) {
        return;
      }

      const distance = Math.abs(slide.offsetLeft - viewport.scrollLeft - 8);

      if (distance < bestDistance) {
        bestDistance = distance;
        nextIndex = index;
      }
    });

    if (nextIndex !== activeIndex) {
      startTransition(() => setActiveIndex(nextIndex));
    }
  });

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || !slides.length) {
      return;
    }

    updateScrollState();

    viewport.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      viewport.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [slides.length]);

  if (!team || !slides.length) {
    return null;
  }

  const totalStudioCount = team.members.length + team.supportingRoles.length;

  const scrollToIndex = (nextIndex: number) => {
    const target = slideRefs.current[nextIndex];

    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "start",
    });

    startTransition(() => setActiveIndex(nextIndex));
  };

  return (
    <Container>
      <section className="relative overflow-hidden rounded-[2.5rem] border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,243,237,0.88))] px-6 py-8 shadow-[0_34px_80px_rgba(30,20,12,0.1)] md:px-8 md:py-10 lg:px-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(212,195,166,0.22),transparent_60%)]" />
        <div className="relative">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                {team.eyebrow ?? "The studio"}
              </p>
              <h2 className="font-display-face max-w-4xl text-3xl leading-[0.96] tracking-[-0.04em] md:text-5xl">
                {team.heading}
              </h2>
              <div className="max-w-2xl space-y-2 text-sm leading-7 text-[var(--color-mist)] md:text-[15px]">
                {team.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 xl:justify-end">
              <div className="rounded-full border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.72)] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[var(--color-mist)] uppercase">
                {String(totalStudioCount).padStart(2, "0")} person studio
              </div>
              <div className="rounded-full border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.62)] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[var(--color-mist)] uppercase">
                {String(team.members.length).padStart(2, "0")} principal leads
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.72)] px-2 py-2 shadow-[0_14px_34px_rgba(30,20,12,0.06)]">
                <span className="min-w-[3.6rem] px-2 text-center text-[11px] font-semibold tracking-[0.18em] text-[var(--color-mist)] uppercase">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  aria-label="Show previous team card"
                  onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
                  disabled={!canScrollPrev}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-ink)] transition disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Show next team card"
                  onClick={() => scrollToIndex(Math.min(activeIndex + 1, slides.length - 1))}
                  disabled={!canScrollNext}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-ink)] transition disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="relative mt-8">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-14 bg-[linear-gradient(90deg,rgba(247,243,237,0.96),rgba(247,243,237,0))] lg:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-14 bg-[linear-gradient(270deg,rgba(247,243,237,0.96),rgba(247,243,237,0))] lg:block" />

            <div
              ref={viewportRef}
              className="-mx-2 flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {slides.map((slide, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.article
                    key={slide.key}
                    ref={(node) => {
                      slideRefs.current[index] = node;
                    }}
                    initial={false}
                    animate={
                      reduceMotion
                        ? { opacity: 1, y: 0, scale: 1 }
                        : {
                            opacity: isActive ? 1 : 0.9,
                            y: isActive ? 0 : 10,
                            scale: isActive ? 1 : 0.985,
                          }
                    }
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      cardBaseClass,
                      "min-w-[82vw] max-w-[82vw] md:min-w-[23.5rem] md:max-w-[23.5rem] xl:min-w-[25.5rem] xl:max-w-[25.5rem]",
                      slide.kind === "studio" &&
                        "md:min-w-[26.5rem] md:max-w-[26.5rem] xl:min-w-[29rem] xl:max-w-[29rem]",
                    )}
                  >
                    <div className="relative overflow-hidden rounded-[1.7rem]">
                      <Image
                        src={slide.image.src}
                        alt={slide.image.alt}
                        width={slide.image.width}
                        height={slide.image.height}
                        sizes="(min-width: 1280px) 26rem, (min-width: 768px) 24rem, 82vw"
                        placeholder="blur"
                        blurDataURL={slide.image.blurDataURL}
                        className={cn(
                          "w-full object-cover transition duration-700 ease-out",
                          slide.kind === "studio" ? "aspect-[5/4]" : "aspect-[4/5]",
                          isActive ? "scale-[1.02]" : "scale-100",
                        )}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.02),rgba(10,10,10,0.12)_64%,rgba(10,10,10,0.34))]" />

                      <motion.div
                        initial={false}
                        animate={
                          reduceMotion
                            ? { opacity: 1, y: 0 }
                            : { opacity: 1, y: isActive ? 0 : 14 }
                        }
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-x-0 bottom-0 space-y-3 p-5 text-[var(--color-paper)]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5">
                            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[rgb(244_235_224_/_0.78)]">
                              {slide.kind === "studio" ? slide.eyebrow : slide.subtitle}
                            </p>
                            <h3 className="font-display-face text-[2rem] leading-[0.96] tracking-[-0.04em] md:text-[2.35rem]">
                              {slide.title}
                            </h3>
                          </div>
                          <div className="rounded-full border border-white/18 bg-[rgb(255_255_255_/_0.08)] px-3 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[rgb(244_235_224_/_0.88)] backdrop-blur-sm">
                            {slide.kind === "studio" ? "Studio" : slide.indexLabel}
                          </div>
                        </div>

                        <motion.div
                          initial={false}
                          animate={
                            reduceMotion
                              ? { opacity: 1, scaleX: 1 }
                              : { opacity: isActive ? 1 : 0.45, scaleX: isActive ? 1 : 0.58 }
                          }
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="h-px origin-left bg-[rgb(244_235_224_/_0.8)]"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={
                        reduceMotion
                          ? { opacity: 1, y: 0 }
                          : { opacity: 1, y: isActive ? 0 : 12 }
                      }
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                      className="space-y-4 px-5 pb-5 pt-4"
                    >
                      <p className="text-sm leading-7 text-[var(--color-mist)]">
                        {slide.description}
                      </p>

                      {slide.kind === "member" ? (
                        <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--color-mist)] uppercase">
                          {slide.subtitle}
                        </p>
                      ) : (
                        <>
                          <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--color-mist)] uppercase">
                            {slide.subtitle}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {slide.chips.map((chip) => (
                              <span
                                key={chip}
                                className="rounded-full border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.72)] px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-[var(--color-mist)] uppercase"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </motion.div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
