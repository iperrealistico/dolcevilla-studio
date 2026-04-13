import Image from "next/image";
import type { ServicePageContent } from "@/types/content";
import { FloatIn } from "@/components/motion/FloatIn";
import { Container } from "@/components/ui/Container";
import { getImageAsset } from "@/lib/images/imageManifest";

export function StudioTeamBlock({
  team,
}: {
  team?: ServicePageContent["team"];
}) {
  if (!team) {
    return null;
  }

  const totalStudioCount = team.members.length + team.supportingRoles.length;

  return (
    <Container>
      <section className="relative overflow-hidden rounded-[2.4rem] border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(247,243,237,0.86))] px-6 py-8 shadow-[0_34px_80px_rgba(30,20,12,0.1)] md:px-10 md:py-10">
        <div className="pointer-events-none absolute -top-16 right-[-4rem] h-56 w-56 rounded-full bg-[rgb(212_195_166_/_0.18)] blur-3xl" />
        <div className="pointer-events-none absolute left-[-2rem] top-10 h-40 w-40 rounded-full bg-[rgb(95_113_103_/_0.1)] blur-3xl" />

        <div className="relative grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
          <FloatIn from="left">
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.28em] text-[var(--color-mist)] uppercase">
                  {team.eyebrow ?? "The team"}
                </p>
                <h2 className="font-display-face max-w-xl text-3xl leading-[0.96] tracking-[-0.04em] md:text-4xl xl:text-[3.55rem]">
                  {team.heading}
                </h2>
              </div>

              <div className="space-y-3 text-sm leading-7 text-[var(--color-mist)] md:text-[15px]">
                {team.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.72)] px-5 py-5 shadow-[0_18px_40px_rgba(30,20,12,0.08)]">
                  <p className="text-xs font-semibold tracking-[0.26em] text-[var(--color-mist)] uppercase">
                    Studio size
                  </p>
                  <p className="font-display-face mt-3 text-5xl tracking-[-0.06em]">
                    {String(totalStudioCount).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-mist)]">
                    People across photography, production, film handling, archive, and finish.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.58)] px-5 py-5 shadow-[0_18px_40px_rgba(30,20,12,0.06)]">
                  <p className="text-xs font-semibold tracking-[0.26em] text-[var(--color-mist)] uppercase">
                    Core shown here
                  </p>
                  <p className="font-display-face mt-3 text-5xl tracking-[-0.06em]">
                    {String(team.members.length).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-mist)]">
                    Principal leads shaping direction, production, analog craft, and finishing.
                  </p>
                </div>
              </div>

              {team.groupNote ? (
                <p className="max-w-xl text-sm leading-7 text-[var(--color-mist)]">
                  {team.groupNote}
                </p>
              ) : null}
            </div>
          </FloatIn>

          <FloatIn from="right" delay={0.06}>
            <div className="space-y-4">
              <div className="-mx-1 flex gap-5 overflow-x-auto pb-4 pr-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {team.members.map((member, index) => {
                  const image = getImageAsset(member.imageId as never);

                  return (
                    <article
                      key={member.name}
                      className="group min-w-[18.5rem] snap-start rounded-[1.9rem] border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.84)] p-3 shadow-[0_22px_52px_rgba(30,20,12,0.1)] transition duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_68px_rgba(30,20,12,0.14)] md:min-w-[20.5rem]"
                    >
                      <div className="overflow-hidden rounded-[1.4rem] border border-[var(--color-line)] bg-[var(--color-shell)]">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          sizes="(min-width: 1280px) 24rem, (min-width: 768px) 42vw, 82vw"
                          placeholder="blur"
                          blurDataURL={image.blurDataURL}
                          className="aspect-[4/5] h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                        />
                      </div>

                      <div className="space-y-3 px-1 pb-2 pt-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-display-face text-[1.7rem] leading-[1.02] tracking-[-0.03em]">
                              {member.name}
                            </h3>
                            <p className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-[var(--color-mist)] uppercase">
                              {member.role}
                            </p>
                          </div>
                          <span className="font-display-face text-3xl tracking-[-0.08em] text-[rgb(95_113_103_/_0.5)]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <p className="text-sm leading-7 text-[var(--color-mist)]">
                          <span aria-hidden="true">&quot;</span>
                          {member.quote}
                          <span aria-hidden="true">&quot;</span>
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <p className="text-xs leading-6 text-[var(--color-mist)]">
                Core leadership is shown here. The wider studio includes second photographers,
                producers, assistants, scanners, archive support, and finishing specialists who
                work to the same visual standards.
              </p>
            </div>
          </FloatIn>
        </div>

        {team.supportingRoles.length ? (
          <FloatIn from="left" delay={0.1}>
            <div className="relative mt-6 flex flex-wrap gap-2.5">
              {team.supportingRoles.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-[var(--color-line)] bg-[rgb(255_255_255_/_0.74)] px-3.5 py-2 text-[11px] font-semibold tracking-[0.18em] text-[var(--color-mist)] uppercase"
                >
                  {role}
                </span>
              ))}
            </div>
          </FloatIn>
        ) : null}
      </section>
    </Container>
  );
}
