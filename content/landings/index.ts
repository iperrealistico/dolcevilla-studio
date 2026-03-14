export { chiantiLanding } from "@/content/landings/chianti-wedding-photographer";
export { florenceLanding } from "@/content/landings/florence-wedding-photographer";
export { intimateWeddingLanding } from "@/content/landings/intimate-wedding-in-tuscany";
export { luccaLanding } from "@/content/landings/lucca-wedding-photographer";
export { sienaLanding } from "@/content/landings/siena-wedding-photographer";
export { tuscanyElopementLanding } from "@/content/landings/tuscany-elopement-photographer";
export { tuscanyLanding } from "@/content/landings/tuscany-wedding-photographer";
export { valDorciaLanding } from "@/content/landings/val-dorcia-wedding-photographer";

import { chiantiLanding } from "@/content/landings/chianti-wedding-photographer";
import { florenceLanding } from "@/content/landings/florence-wedding-photographer";
import { intimateWeddingLanding } from "@/content/landings/intimate-wedding-in-tuscany";
import { luccaLanding } from "@/content/landings/lucca-wedding-photographer";
import { sienaLanding } from "@/content/landings/siena-wedding-photographer";
import { tuscanyElopementLanding } from "@/content/landings/tuscany-elopement-photographer";
import { tuscanyLanding } from "@/content/landings/tuscany-wedding-photographer";
import { valDorciaLanding } from "@/content/landings/val-dorcia-wedding-photographer";

export const landings = {
  "tuscany-wedding-photographer": tuscanyLanding,
  "lucca-wedding-photographer": luccaLanding,
  "florence-wedding-photographer": florenceLanding,
  "val-dorcia-wedding-photographer": valDorciaLanding,
  "chianti-wedding-photographer": chiantiLanding,
  "siena-wedding-photographer": sienaLanding,
  "tuscany-elopement-photographer": tuscanyElopementLanding,
  "intimate-wedding-in-tuscany": intimateWeddingLanding,
};

export const landingSlugs = Object.keys(landings);
