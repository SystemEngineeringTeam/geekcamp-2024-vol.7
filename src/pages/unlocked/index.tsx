import { Box } from "@radix-ui/themes";
import { useEffect, type ReactElement } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { match } from "ts-pattern";
import { UnlockableCard } from "@/components/achievements/UnlockableCard";
import { useAchievements } from "@/hooks/db/achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";

const BoxStyle = styled(Box)`
  margin: 0 auto;
`;

export default function Page(): ReactElement {
  const { init, fetch } = useAchievements(useTeam);
  const swrFetchAchievements = useSWR("fetchAchievements", fetch);

  useEffect(() => {
    void init();
  }, []);

  return match(swrFetchAchievements)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(S.Success, ({ data }) => (
      <BoxStyle width="70%">
        <Box mt="20vh" />

        {data?.map((achievement) => (
          <UnlockableCard key={achievement.id} achievement={achievement} />
        ))}
      </BoxStyle>
    ))
    .otherwise(({ error }) => {
      throw error;
    });
}
