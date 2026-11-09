import { profile } from "@/data/profile";
import { site } from "@/data/site";
import { conversation, type Exchange } from "@/data/conversation";
import { projects } from "@/data/projects";
import { resolveAsset } from "@/lib/assets";
import { CinematicHero } from "@/components/hero/CinematicHero";
import { Introduction } from "@/components/sections/Introduction";
import { Numbers } from "@/components/sections/Numbers";
import { Chapters, WhatIDo } from "@/components/sections/Chapters";
import { Story } from "@/components/sections/Story";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Speaking } from "@/components/sections/Speaking";
import { AskBar } from "@/components/chat/AskBar";
import { ContactFab } from "@/components/layout/ContactFab";
import { SideProgress } from "@/components/layout/SideProgress";
import { Ambient } from "@/components/webgl/Ambient";
import { visibleExchanges } from "@/components/chat/ChatThread";
import { JsonLd, pageNode, personNode, websiteNode, yardexNode } from "@/lib/seo";

/** Home: the full story as one scrolling conversation. Sub-pages go deeper. */
export default function HomePage() {
  const portrait = resolveAsset(profile.portrait.src);

  // Every question on the page, in reading order, for the Ask bar.
  const withContext = (items: Exchange[], context?: string) =>
    visibleExchanges([items]).map(({ id, question, answer }) => ({ id, question, context, keywords: answer?.join(" ") }));
  const questions = [
    ...withContext(conversation.intro, "About"),
    ...projects.flatMap((p) => withContext(p.qa, p.tag)),
    ...withContext(conversation.story, "Story"),
    ...withContext(conversation.education, "Western"),
    ...withContext(conversation.contact, "Contact"),
  ];

  return (
    <>
      <JsonLd
        graph={[
          websiteNode(),
          personNode(),
          yardexNode(),
          pageNode({ type: "ProfilePage", path: "/", name: site.title, description: site.description }),
        ]}
      />
      <Ambient />
      <CinematicHero portraitSrc={portrait} availability={profile.availability.open ? profile.availability.label : null} />
      <Introduction />
      <Numbers />
      <Chapters />
      <WhatIDo />
      <Story />
      <Speaking />
      <Education />
      <Contact />
      <AskBar questions={questions} contactHref="#contact" />
      <ContactFab />
      <SideProgress
        stops={[
          { id: "about", label: "Intro" },
          { id: "numbers", label: "Numbers" },
          ...projects.map((p) => ({ id: `work-${p.slug}`, label: p.tag })),
          { id: "what-i-do", label: "What I do" },
          { id: "story", label: "Story" },
          { id: "speaking", label: "Speaking" },
          { id: "now", label: "Now" },
          { id: "contact", label: "Contact" },
        ]}
      />
    </>
  );
}
