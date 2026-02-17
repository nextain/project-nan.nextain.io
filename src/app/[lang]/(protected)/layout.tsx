import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { AuthHeader } from "@/components/layout/auth-header";
import { ProtectedSidebar } from "@/components/layout/protected-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default async function ProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const session = await auth();
  const { lang } = await params;

  if (!session?.user) {
    redirect(`/${lang}/login`);
  }

  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen flex-col">
        <AuthHeader user={session.user} />
        <div className="flex flex-1">
          <ProtectedSidebar />
          <main className="flex-1 overflow-auto p-4 pb-20 md:p-6 md:pb-6">
            {children}
          </main>
        </div>
        <MobileNav />
      </div>
    </SessionProvider>
  );
}
