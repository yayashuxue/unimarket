// layout.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { SVGProps } from "react";
import { CreateBetPopup } from "./createBetPopup";
import { Dropdown } from "react-day-picker";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth";
function LoginButton() {
  const { ready, authenticated, login, logout } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);
  const { wallets } = useWallets();
  const wallet = wallets[0];
  const address = wallet?.address;
  return (
    <div className="flex items-center gap-4">
      {authenticated ? (
        <Link href="#" prefetch={false}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {address.slice(0, 6) + "..." + address.slice(-4)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={logout}>Disconnect</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Link>
      ) : (
        <Button
          variant="outline"
          size="sm"
          disabled={disableLogin}
          onClick={login}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
}

function BarChartIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}
export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
        <Link
          style={{ color: "white" }}
          className="flex items-center gap-2 font-bold text-xl"
          href="/"
        >
          <BarChartIcon className="h-6 w-6" style={{ fill: "white" }} />
          UniMarket
        </Link>
        <div className="flex items-center gap-4">
          <CreateBetPopup>
            <Link
              style={{ color: "white" }}
              className="text-sm font-medium hover:underline"
              href="#"
            >
              Create Market
            </Link>
          </CreateBetPopup>

          <LoginButton />
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};
