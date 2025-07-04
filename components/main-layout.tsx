"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, Package, Store, Users, Megaphone, DollarSign, Bell, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signOut } from "next-auth/react"


export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    products: pathname.startsWith("/products"),
    shops: pathname.startsWith("/shops"),
    users: pathname.startsWith("/users"),
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleExpanded = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const NavigationContent = () => (
    <nav className="flex-1 overflow-y-auto p-2 space-y-1">
      <Link
        href="/"
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
          pathname === "/"
            ? "bg-maroon/10 text-maroon"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M2.8 1C2.24772 1 1.8 1.44772 1.8 2V6.5C1.8 7.05228 2.24772 7.5 2.8 7.5H6.2C6.75228 7.5 7.2 7.05228 7.2 6.5V2C7.2 1.44772 6.75228 1 6.2 1H2.8ZM2.8 8.5C2.24772 8.5 1.8 8.94772 1.8 9.5V13C1.8 13.5523 2.24772 14 2.8 14H6.2C6.75228 14 7.2 13.5523 7.2 13V9.5C7.2 8.94772 6.75228 8.5 6.2 8.5H2.8ZM8.8 1C8.24772 1 7.8 1.44772 7.8 2V6.5C7.8 7.05228 8.24772 7.5 8.8 7.5H12.2C12.7523 7.5 13.2 7.05228 13.2 6.5V2C13.2 1.44772 12.7523 1 12.2 1H8.8ZM8.8 8.5C8.24772 8.5 7.8 8.94772 7.8 9.5V13C7.8 13.5523 8.24772 14 8.8 14H12.2C12.7523 14 13.2 13.5523 13.2 13V9.5C13.2 8.94772 12.7523 8.5 12.2 8.5H8.8Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        Dashboard
      </Link>
      <Link
        href="/orders"
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
          pathname === "/orders" ? "bg-maroon/10 text-maroon" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        <ShoppingCart className="h-4 w-4" />
        Orders
      </Link>

      <div>
        <button
          onClick={() => toggleExpanded("products")}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
            pathname.startsWith("/products")
              ? "bg-maroon/10 text-maroon"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </div>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("h-4 w-4 transition-transform", expanded.products ? "rotate-180" : "")}
          >
            <path
              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        {expanded.products && (
          <div className="ml-6 mt-1 space-y-1">
            <Link
              href="/products"
              className={cn(
                "flex items-center rounded-md px-3 py-1.5 text-sm",
                pathname === "/products" ? "font-medium text-maroon" : "text-gray-500 hover:text-gray-900",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            
            
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleExpanded("shops")}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
            pathname.startsWith("/shops")
              ? "bg-maroon/10 text-maroon"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Shops
          </div>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("h-4 w-4 transition-transform", expanded.shops ? "rotate-180" : "")}
          >
            <path
              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        {expanded.shops && (
          <div className="ml-6 mt-1 space-y-1">
            <Link
              href="/shops"
              className={cn(
                "flex items-center rounded-md px-3 py-1.5 text-sm",
                pathname === "/shops" ? "font-medium text-maroon" : "text-gray-500 hover:text-gray-900",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Shops
            </Link>
            <Link
              href="/shops/categories"
              className={cn(
                "flex items-center rounded-md px-3 py-1.5 text-sm",
                pathname === "/shops/categories" ? "font-medium text-maroon" : "text-gray-500 hover:text-gray-900",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
          </div>
        )}
      </div>

      

      <Link
        href="/adverts"
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
          pathname === "/adverts"
            ? "bg-maroon/10 text-maroon"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        <Megaphone className="h-4 w-4" />
        Adverts
      </Link>

      

      <div>
        <button
          onClick={() => toggleExpanded("users")}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
            pathname.startsWith("/users")
              ? "bg-maroon/10 text-maroon"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </div>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("h-4 w-4 transition-transform", expanded.users ? "rotate-180" : "")}
          >
            <path
              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        {expanded.users && (
          <div className="ml-6 mt-1 space-y-1">
            <Link
              href="/users"
              className={cn(
                "flex items-center rounded-md px-3 py-1.5 text-sm",
                pathname === "/users" ? "font-medium text-maroon" : "text-gray-500 hover:text-gray-900",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              All Users
            </Link>
            
            
          </div>
        )}
      </div>

      
    </nav>
  )

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-[240px] flex-shrink-0 bg-white border-r flex-col h-full">
        <div className="h-16 border-b flex items-center px-4 flex-shrink-0">
          <div className="flex items-center">
            <img src="/images/imago-full-logo.jpg" alt="Imago Logo" className="h-10 object-contain" />
          </div>
        </div>

        <div className="p-2 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-8 h-9" />
          </div>
        </div>

        <NavigationContent />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center px-4 gap-4 flex-shrink-0">
          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <div className="flex flex-col h-full">
                <div className="h-16 border-b flex items-center px-4 flex-shrink-0">
                  <img src="/images/imago-full-logo.jpg" alt="Imago Logo" className="h-10 object-contain" />
                </div>

                <div className="p-2 flex-shrink-0">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search..." className="pl-8 h-9" />
                  </div>
                </div>

                <NavigationContent />
              </div>
            </SheetContent>
          </Sheet>

          {/* Breadcrumb - hidden on mobile */}
          <div className="flex-1 font-medium text-sm hidden sm:block">
            {pathname.split("/").map((segment, i, arr) => {
              if (!segment) return null
              const path = `/${arr.slice(1, i + 1).join("/")}`
              return (
                <span key={path}>
                  {i > 1 && " / "}
                  <Link
                    href={path}
                    className={cn(i === arr.length - 1 ? "font-medium" : "text-gray-500 hover:text-gray-900")}
                  >
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </Link>
                </span>
              )
            })}
          </div>

          {/* Mobile title */}
          <div className="flex-1 font-medium text-sm sm:hidden">
            {pathname.split("/").pop()?.charAt(0).toUpperCase() + pathname.split("/").pop()?.slice(1)}
          </div>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
