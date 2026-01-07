import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
              ReactPR
            </Link>
            <div className="hidden md:flex gap-4">
              <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <ModeToggle />
          </div>

        </div>
      </div>
    </nav>
  )
}
