import { auth } from "@/lib/auth";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound, redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DISCORD_OAUTH2_URL = process.env.DISCORD_OAUTH2_URL ?? "";

export default async function IntegrationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const session = await auth();
  if (!session?.gwUserId) redirect(`/${lang}/login`);

  const isDiscordLinked = session.provider === "discord";
  const isGoogleLinked = session.provider === "google";

  const t = dict.settings.integrations;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="text-sm text-muted-foreground">{t.description}</p>
      </div>

      {/* Discord */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{t.discord.title}</CardTitle>
            <Badge variant={isDiscordLinked ? "default" : "secondary"}>
              {isDiscordLinked ? t.discord.connected : t.discord.notConnected}
            </Badge>
          </div>
          <CardDescription>{t.discord.connectedHint}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{t.discord.howToUse}</p>
          {DISCORD_OAUTH2_URL && (
            <div className="space-y-2">
              <p className="text-sm font-medium">
                {t.discord.inviteBotDescription}
              </p>
              <Button asChild variant="outline" size="sm">
                <a
                  href={DISCORD_OAUTH2_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.discord.inviteBot}
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Google Chat */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              {t.googleChat.title}
            </CardTitle>
            <Badge variant={isGoogleLinked ? "default" : "secondary"}>
              {isGoogleLinked
                ? t.googleChat.connected
                : t.googleChat.notConnected}
            </Badge>
          </div>
          <CardDescription>{t.googleChat.connectedHint}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t.googleChat.howToUse}
          </p>
        </CardContent>
      </Card>

      {/* Back to settings */}
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/${lang}/settings`}>
            &larr; {dict.settings.title}
          </Link>
        </Button>
      </div>
    </div>
  );
}
