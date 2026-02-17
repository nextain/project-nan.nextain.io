import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { signIn } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{dict.auth.loginTitle}</CardTitle>
        <CardDescription>{dict.auth.loginDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: `/${lang}/dashboard` });
          }}
        >
          <Button type="submit" variant="outline" className="w-full">
            {dict.auth.googleLogin}
          </Button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("discord", { redirectTo: `/${lang}/dashboard` });
          }}
        >
          <Button type="submit" variant="outline" className="w-full">
            {dict.auth.discordLogin}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
