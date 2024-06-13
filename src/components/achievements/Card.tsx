import { Achievement } from "@/types/achievement";
import { Text } from "@radix-ui/themes";
import { type ReactElement } from "react";

export function AchievementCard({
  data,
  showRelativeDate = false,
}: {
  data: Achievement;
  showRelativeDate: boolean;
}): ReactElement {
  return (
    <>
      {showRelativeDate && <Text>1日前</Text>}
      <Text>Hello This page is memberCard</Text>
      <Text>{data.name}</Text>
      <Text>{data.description}</Text>
    </>
  );
}
