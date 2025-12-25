import { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  Toaster,
} from "@stargazers-stella/cosmic-ui";
import { toast } from "sonner";
import {
  Check,
  Command as CommandIcon,
  Copy,
  Github,
  Layers,
  Moon,
  Palette,
  Rocket,
  Sparkles,
  Sun,
  Terminal,
  Zap,
} from "lucide-react";

type ViewMode = "gallery" | "overlays" | "themes";

type Plan = {
  name: string;
  usage: string;
  uptime: string;
  requests: string;
};

const plans: Plan[] = [
  { name: "Nebula", usage: "36%", uptime: "99.91%", requests: "1.2M" },
  { name: "Quasar", usage: "64%", uptime: "99.97%", requests: "4.8M" },
  { name: "Supernova", usage: "81%", uptime: "99.99%", requests: "12.3M" },
];

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });
  const [commandOpen, setCommandOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [framework, setFramework] = useState("next");
  const [showBeta, setShowBeta] = useState(true);
  const [density, setDensity] = useState("comfortable");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Auto-open overlays in overlay view
  useEffect(() => {
    if (viewMode === "overlays") {
      setTimeout(() => setDialogOpen(true), 300);
    } else {
      setDialogOpen(false);
      setDropdownOpen(false);
    }
  }, [viewMode]);

  const backgroundClass =
    theme === "dark"
      ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-slate-900 to-black"
      : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-blue-50 to-slate-100";

  return (
    <div className={`min-h-screen ${backgroundClass} text-foreground relative`}>
      {/* Cosmic grid overlay */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 pointer-events-none" />

      {/* Starfield effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 0.5 + "px",
              height: Math.random() * 2 + 0.5 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Mission Control Header */}
        <header className="border-b border-border/40 bg-background/60 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Terminal className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-bold tracking-tight font-mono">
                        COSMIC UI
                      </h1>
                      <Badge variant="glow" className="text-xs">
                        v0.1.4
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">
                      Component Observatory System
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 bg-muted/30 text-xs text-muted-foreground font-mono">
                  <CommandIcon className="h-3 w-3" />
                  <span>⌘K</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="gap-2"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">
                    {theme === "dark" ? "Light" : "Dark"}
                  </span>
                </Button>
              </div>
            </div>

            {/* View Mode Selector */}
            <div className="flex items-center gap-2 mt-6 p-1 bg-muted/30 rounded-lg border border-border/40 w-fit">
              <Button
                variant={viewMode === "gallery" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("gallery")}
                className="gap-2 text-xs"
              >
                <Layers className="h-3.5 w-3.5" />
                Component Gallery
              </Button>
              <Button
                variant={viewMode === "overlays" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("overlays")}
                className="gap-2 text-xs"
              >
                <Zap className="h-3.5 w-3.5" />
                Overlay Showcase
              </Button>
              <Button
                variant={viewMode === "themes" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("themes")}
                className="gap-2 text-xs"
              >
                <Palette className="h-3.5 w-3.5" />
                Theme Comparison
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          {viewMode === "gallery" && <GalleryView />}
          {viewMode === "overlays" && (
            <OverlayView
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              framework={framework}
              setFramework={setFramework}
              showBeta={showBeta}
              setShowBeta={setShowBeta}
              density={density}
              setDensity={setDensity}
            />
          )}
          {viewMode === "themes" && <ThemeComparisonView />}
        </main>
      </div>

      {/* Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search components, actions..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Views">
            <CommandItem
              onSelect={() => {
                setViewMode("gallery");
                setCommandOpen(false);
              }}
            >
              <Layers className="mr-2 h-4 w-4" />
              Component Gallery
              <CommandShortcut>G</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setViewMode("overlays");
                setCommandOpen(false);
              }}
            >
              <Zap className="mr-2 h-4 w-4" />
              Overlay Showcase
              <CommandShortcut>O</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setViewMode("themes");
                setCommandOpen(false);
              }}
            >
              <Palette className="mr-2 h-4 w-4" />
              Theme Comparison
              <CommandShortcut>T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              Light Mode
            </CommandItem>
            <CommandItem onSelect={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              Dark Mode
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={() => {
                toast.success("Repository opened");
                window.open("https://github.com", "_blank");
              }}
            >
              <Github className="mr-2 h-4 w-4" />
              Open Repository
            </CommandItem>
            <CommandItem onSelect={() => toast.info("Link copied to clipboard")}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Share Link
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <Toaster position="bottom-center" richColors />
    </div>
  );
}

// Component Gallery View
function GalleryView() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold font-mono tracking-tight">
            COMPONENT CATALOG
          </h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Complete component library reference · Screenshot optimized
        </p>
      </div>

      {/* Buttons Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            001
          </Badge>
          <h3 className="text-lg font-semibold font-mono">BUTTON VARIANTS</h3>
        </div>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <Button className="gap-2">
                <Check className="h-4 w-4" />
                Primary
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Badges Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            002
          </Badge>
          <h3 className="text-lg font-semibold font-mono">BADGE VARIANTS</h3>
        </div>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="glow">
                <Sparkles className="h-3 w-3 mr-1" />
                Glow Effect
              </Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Cards Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            003
          </Badge>
          <h3 className="text-lg font-semibold font-mono">CARD COMPONENTS</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Standard Card</CardTitle>
              <CardDescription>
                Default card styling with header and content sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cards provide a flexible container for grouping related content.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
              <CardDescription>
                Glassmorphism effect with backdrop blur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Glass effect adds depth and visual interest to your interface.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="secondary">
                Explore
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle>Highlighted Card</CardTitle>
              <CardDescription>Custom border and background tint</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Emphasize important content with custom styling.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="outline">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Form Controls */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            004
          </Badge>
          <h3 className="text-lg font-semibold font-mono">FORM CONTROLS</h3>
        </div>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Input Field</label>
                <Input placeholder="Enter your project name..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Dropdown</label>
                <Select defaultValue="next">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="remix">Remix</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="vite">Vite</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Textarea</label>
                <Textarea
                  placeholder="Describe your project goals and requirements..."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Alerts */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            005
          </Badge>
          <h3 className="text-lg font-semibold font-mono">ALERT MESSAGES</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Alert>
            <Rocket className="h-4 w-4" />
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>
              Standard alert for general notifications and information.
            </AlertDescription>
          </Alert>
          <Alert variant="info">
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Info Alert</AlertTitle>
            <AlertDescription>
              Informational messages to guide users through workflows.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Destructive Alert</AlertTitle>
            <AlertDescription>
              Critical warnings and error messages for user attention.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Table */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            006
          </Badge>
          <h3 className="text-lg font-semibold font-mono">DATA TABLES</h3>
        </div>
        <Card className="glass">
          <CardHeader>
            <CardTitle>Service Plans</CardTitle>
            <CardDescription>
              Current deployment status and usage metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Uptime</TableHead>
                  <TableHead>Requests</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.name}>
                    <TableCell className="font-medium font-mono">
                      {plan.name}
                    </TableCell>
                    <TableCell>{plan.usage}</TableCell>
                    <TableCell>{plan.uptime}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {plan.requests}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={plan.name === "Quasar" ? "glow" : "outline"}>
                        {plan.name === "Quasar" ? "Active" : "Available"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// Overlay Showcase View
function OverlayView({
  dialogOpen,
  setDialogOpen,
  dropdownOpen,
  setDropdownOpen,
  framework,
  setFramework,
  showBeta,
  setShowBeta,
  density,
  setDensity,
}: {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  framework: string;
  setFramework: (value: string) => void;
  showBeta: boolean;
  setShowBeta: (value: boolean) => void;
  density: string;
  setDensity: (value: string) => void;
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold font-mono tracking-tight">
            OVERLAY COMPONENTS
          </h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Dialogs and dropdowns powered by Radix UI primitives
        </p>
      </div>

      <Alert variant="info">
        <Sparkles className="h-4 w-4" />
        <AlertTitle>Screenshot Mode Active</AlertTitle>
        <AlertDescription>
          Dialog and dropdown are automatically opened for easy screenshot capture.
          Click outside or use the buttons to interact.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Dialog Showcase */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                DIALOG
              </Badge>
            </div>
            <CardTitle>Modal Dialogs</CardTitle>
            <CardDescription>
              Accessible modal overlays with focus management and animations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full gap-2">
                  <Rocket className="h-4 w-4" />
                  Launch Configuration Dialog
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-mono">
                    System Configuration
                  </DialogTitle>
                  <DialogDescription>
                    Configure your deployment settings and preferences. Changes
                    apply immediately.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Name</label>
                    <Input placeholder="cosmic-ui-production" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Framework</label>
                    <Select value={framework} onValueChange={setFramework}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="remix">Remix</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Build Command</label>
                    <Input
                      placeholder="npm run build"
                      className="font-mono text-xs"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      toast.success("Configuration saved");
                      setDialogOpen(false);
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="rounded-lg border border-dashed border-border/50 p-4 space-y-2">
              <p className="text-xs text-muted-foreground font-mono">
                Features: Keyboard navigation, focus trap, backdrop dismiss, ESC
                to close
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">Accessible</Badge>
                <Badge variant="outline">Animated</Badge>
                <Badge variant="outline">Responsive</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dropdown Showcase */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                DROPDOWN
              </Badge>
            </div>
            <CardTitle>Dropdown Menus</CardTitle>
            <CardDescription>
              Rich context menus with submenus, checkboxes, and radio groups
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between gap-2">
                  Project Actions
                  <Terminal className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel className="font-mono text-xs">
                  DEPLOYMENT
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onSelect={() => toast.message("Deploying to preview...")}
                  >
                    <Rocket className="mr-2 h-4 w-4" />
                    Deploy Preview
                    <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => toast.message("Opening repository...")}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Open Repository
                    <DropdownMenuShortcut>⇧⌘G</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => toast.info("Link copied to clipboard")}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Deploy URL
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="font-mono text-xs">
                  SETTINGS
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={showBeta}
                  onCheckedChange={setShowBeta}
                >
                  Show Beta Features
                </DropdownMenuCheckboxItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>UI Density</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
                      <DropdownMenuRadioItem value="compact">
                        Compact
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="comfortable">
                        Comfortable
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="spacious">
                        Spacious
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="rounded-lg border border-dashed border-border/50 p-4 space-y-2">
              <p className="text-xs text-muted-foreground font-mono">
                Features: Nested submenus, checkbox items, radio groups, keyboard
                shortcuts
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">Radix UI</Badge>
                <Badge variant="outline">Keyboard Nav</Badge>
                <Badge variant="outline">Themeable</Badge>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-xs font-medium text-muted-foreground">
                Current Settings:
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge>{showBeta ? "Beta: On" : "Beta: Off"}</Badge>
                <Badge variant="secondary">Density: {density}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Theme Comparison View
function ThemeComparisonView() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold font-mono tracking-tight">
            THEME COMPARISON
          </h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Light and dark mode side-by-side · CSS variable-driven theming
        </p>
      </div>

      <Alert variant="info">
        <Palette className="h-4 w-4" />
        <AlertTitle>Theme System</AlertTitle>
        <AlertDescription>
          All components automatically adapt to light/dark themes using CSS
          variables. Toggle the theme switcher in the header to see the live
          changes.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Light Theme Preview */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold font-mono">LIGHT MODE</h3>
            <Badge variant="outline">Default</Badge>
          </div>
          <ThemePreviewCard mode="light" />
        </div>

        {/* Dark Theme Preview */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold font-mono">DARK MODE</h3>
            <Badge variant="glow">Active</Badge>
          </div>
          <ThemePreviewCard mode="dark" />
        </div>
      </div>

      {/* Token Reference */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-mono">Design Token Reference</CardTitle>
          <CardDescription>
            CSS variables that power the theming system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-sm font-medium font-mono">Color Tokens</p>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary border" />
                  <span className="text-muted-foreground">--primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-secondary border" />
                  <span className="text-muted-foreground">--secondary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-accent border" />
                  <span className="text-muted-foreground">--accent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-destructive border" />
                  <span className="text-muted-foreground">--destructive</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium font-mono">Surface Tokens</p>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-background border" />
                  <span className="text-muted-foreground">--background</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-card border" />
                  <span className="text-muted-foreground">--card</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-muted border" />
                  <span className="text-muted-foreground">--muted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded border border-border" />
                  <span className="text-muted-foreground">--border</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Theme Preview Component
function ThemePreviewCard({ mode }: { mode: "light" | "dark" }) {
  return (
    <div
      className={`rounded-lg border ${
        mode === "dark"
          ? "bg-[#14151a] border-[#3a3c47]"
          : "bg-white border-[#d4d8e8]"
      } p-6 space-y-4`}
    >
      {/* Buttons */}
      <div className="space-y-2">
        <p
          className={`text-xs font-medium font-mono ${
            mode === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Buttons
        </p>
        <div className="flex gap-2 flex-wrap">
          <button
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              mode === "dark"
                ? "bg-[#5eead4] text-black"
                : "bg-[#2563eb] text-white"
            }`}
          >
            Primary
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              mode === "dark"
                ? "bg-[#a78bfa] text-white"
                : "bg-[#06b6d4] text-black"
            }`}
          >
            Secondary
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
              mode === "dark"
                ? "border-[#3a3c47] text-gray-200"
                : "border-[#cbd5e1] text-gray-900"
            }`}
          >
            Outline
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="space-y-2">
        <p
          className={`text-xs font-medium font-mono ${
            mode === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Badges
        </p>
        <div className="flex gap-2 flex-wrap">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              mode === "dark"
                ? "bg-[#5eead4] text-black"
                : "bg-[#2563eb] text-white"
            }`}
          >
            Active
          </span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium border ${
              mode === "dark"
                ? "border-[#3a3c47] text-gray-300"
                : "border-[#cbd5e1] text-gray-700"
            }`}
          >
            Available
          </span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              mode === "dark"
                ? "bg-[#a78bfa]/20 text-[#e9d5ff] border border-[#a78bfa]/30"
                : "bg-[#ddd6fe] text-[#6d28d9] border border-[#c4b5fd]"
            }`}
          >
            Beta
          </span>
        </div>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <p
          className={`text-xs font-medium font-mono ${
            mode === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Input Field
        </p>
        <input
          type="text"
          placeholder="Enter text..."
          className={`w-full px-3 py-2 rounded-lg text-sm border ${
            mode === "dark"
              ? "bg-transparent border-[#3a3c47] text-gray-200 placeholder-gray-500"
              : "bg-white border-[#cbd5e1] text-gray-900 placeholder-gray-400"
          }`}
        />
      </div>

      {/* Card */}
      <div
        className={`p-4 rounded-lg border ${
          mode === "dark"
            ? "bg-[#1a1b21] border-[#3a3c47]"
            : "bg-gray-50 border-[#e2e8f0]"
        }`}
      >
        <p
          className={`font-medium text-sm mb-1 ${
            mode === "dark" ? "text-gray-200" : "text-gray-900"
          }`}
        >
          Card Component
        </p>
        <p
          className={`text-xs ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}
        >
          Flexible container for grouping content with consistent styling across
          themes.
        </p>
      </div>
    </div>
  );
}

export default App;
