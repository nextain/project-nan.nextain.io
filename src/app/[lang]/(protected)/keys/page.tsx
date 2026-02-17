import { auth } from "@/lib/auth";
import {
  createVirtualKey,
  isKeyOwnedByUser,
  listKeys,
  revokeKey,
} from "@/lib/gateway-client";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

async function createKeyAction(formData: FormData) {
  "use server";

  const lang = String(formData.get("lang") ?? "ko");
  const keyName = String(formData.get("keyName") ?? "").trim();

  const session = await auth();
  if (!session?.gwUserId) redirect(`/${lang}/login`);

  const created = await createVirtualKey(session.gwUserId, keyName || undefined);
  const cookieStore = await cookies();
  cookieStore.set("lab-created-key", created.key, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: `/${lang}/keys`,
    maxAge: 120,
  });
  revalidatePath(`/${lang}/keys`);
  redirect(`/${lang}/keys?created=1`);
}

async function revokeKeyAction(formData: FormData) {
  "use server";

  const lang = String(formData.get("lang") ?? "ko");
  const keyId = String(formData.get("keyId") ?? "");

  const session = await auth();
  if (!session?.gwUserId) redirect(`/${lang}/login`);

  if (keyId) {
    const owned = await isKeyOwnedByUser(session.gwUserId, keyId);
    if (!owned) {
      redirect(`/${lang}/keys?error=forbidden`);
    }

    await revokeKey(keyId);
    revalidatePath(`/${lang}/keys`);
  }

  redirect(`/${lang}/keys`);
}

export default async function KeysPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ created?: string; error?: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  const session = await auth();
  if (!session?.gwUserId) redirect(`/${lang}/login`);

  let keys: Awaited<ReturnType<typeof listKeys>> = [];
  try {
    keys = await listKeys(session.gwUserId);
  } catch {
    keys = [];
  }

  const { created, error } = await searchParams;
  const createdKey = created ? (await cookies()).get("lab-created-key")?.value : undefined;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="text-2xl font-bold">{dict.keys.title}</h1>

      {created && createdKey ? (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">{dict.keys.keyCreated}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">{dict.keys.keyCreatedDescription}</p>
            <code className="block overflow-x-auto rounded-md border bg-background p-3 text-xs">
              {createdKey}
            </code>
          </CardContent>
        </Card>
      ) : null}

      {error === "forbidden" ? (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="pt-6 text-sm text-destructive">
            {dict.keys.forbiddenAction}
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{dict.keys.createKey}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createKeyAction} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input type="hidden" name="lang" value={lang} />
            <Input
              name="keyName"
              placeholder={dict.keys.keyNamePlaceholder}
              className="sm:max-w-sm"
            />
            <Button type="submit">{dict.keys.createKey}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{dict.keys.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {keys.length === 0 ? (
            <p className="text-sm text-muted-foreground">{dict.keys.noKeys}</p>
          ) : (
            <div className="space-y-3">
              {keys.map((keyRow) => (
                <div
                  key={keyRow.id}
                  className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {keyRow.key_name || dict.keys.unnamed}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(keyRow.created_at).toLocaleString(
                        lang === "ko" ? "ko-KR" : "en-US"
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={keyRow.is_active ? "secondary" : "outline"}>
                      {keyRow.is_active ? dict.keys.active : dict.keys.revoked}
                    </Badge>
                    {keyRow.is_active ? (
                      <form action={revokeKeyAction}>
                        <input type="hidden" name="lang" value={lang} />
                        <input type="hidden" name="keyId" value={keyRow.id} />
                        <Button type="submit" variant="outline" size="sm">
                          {dict.common.delete}
                        </Button>
                      </form>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
