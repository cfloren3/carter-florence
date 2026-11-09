import { story } from "@/data/experience";
import { resolveAsset } from "@/lib/assets";
import { StoryTimeline } from "./StoryTimeline";
import { conversation } from "@/data/conversation";
import { ChatThread } from "@/components/chat/ChatThread";

/** 04 — The Story So Far (server wrapper resolves photos). */
export function Story() {
  const entries = story.map((e) => ({ ...e, resolved: resolveAsset(e.image.src) }));
  return <StoryTimeline entries={entries} intro={<ChatThread items={conversation.story} className="mx-auto max-w-3xl" />} />;
}
