import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ConnectButton from '@/components/connect-button';

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-4">
            Web3 Template Branch
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">Next.js Crypto Project Template</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            A production-ready Next.js 15 template with Web3 wallet connection and authentication for crypto projects
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Connection</CardTitle>
              <CardDescription>Multi-provider Web3 integration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Full-featured wallet connection with support for multiple providers including MetaMask, WalletConnect,
                and more. Includes state management with Zustand.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Better Auth</CardTitle>
              <CardDescription>Modern authentication system</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Integrated better-auth for secure authentication, supporting both traditional and Web3 authentication
                flows.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smart Contracts</CardTitle>
              <CardDescription>Contract interaction ready</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pre-configured contract ABIs and interaction patterns for minting, transfers, approvals, and balance
                queries.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Type-Safe</CardTitle>
              <CardDescription>Full TypeScript support</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Strongly typed throughout with TypeScript, Zod schemas, and comprehensive type definitions for all Web3
                interactions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>State Management</CardTitle>
              <CardDescription>Zustand store architecture</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Organized Zustand slices for wallet state, balance tracking, and transaction management with optimistic
                updates.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modern Stack</CardTitle>
              <CardDescription>Latest technologies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built with Next.js 15, React 19, TailwindCSS, Shadcn UI, Drizzle ORM, and comprehensive testing setup.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-semibold">About This Template</h2>
          <p className="text-muted-foreground">
            This is the <strong>web3</strong> branch of the Next.js Basic Template repository. It&apos;s specifically
            designed for crypto and blockchain projects that require wallet integration and secure authentication.
          </p>
          <p className="text-muted-foreground">
            The template follows strict architectural patterns with feature-based organization, server-side rendering
            prioritization, and comprehensive type safety throughout the application.
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild size="lg">
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
          <ConnectButton />
          <Button asChild variant="outline" size="lg">
            <Link href="/log-in">Try Authentication</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
