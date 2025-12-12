import { useEffect, useMemo, useState } from "react";
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
  MoonStar,
  Rocket,
  Sparkles,
  SunMedium,
  Wand2,
} from "lucide-react";

type Plan = {
  name: string;
  usage: string;
  uptime: string;
};

const plans: Plan[] = [
  { name: "Nebula", usage: "36% of quota", uptime: "99.91%" },
  { name: "Luna", usage: "64% of quota", uptime: "99.97%" },
  { name: "Sol", usage: "81% of quota", uptime: "99.99%" },
];

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [framework, setFramework] = useState("next");
  const [density, setDensity] = useState("spacious");
  const [showBeta, setShowBeta] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const backgroundClass =
    theme === "dark"
      ? "bg-gradient-to-br from-[#06080f] via-[#0b1326] to-[#0b0f1e]"
      : "bg-gradient-to-br from-[#f5f7ff] via-[#eef1ff] to-[#e8edff]";

  const highlightedPlan = useMemo(() => plans[1], []);

  return (
    <div className={`min-h-screen ${backgroundClass} text-foreground transition-colors`}>
      <div className="container space-y-10 py-12">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <Badge variant="glow">Cosmic UI · Vite + Tailwind</Badge>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                Component constellation
              </h1>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <p className="max-w-3xl text-lg text-muted-foreground">
              A single screen that exercises every component in this package—ready for tweaks,
              theming, and experimentation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2" onClick={() => toast.success("Deployed to the edge")}>
                <Rocket className="h-4 w-4" />
                Deploy preview
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => setCommandOpen(true)}>
                <CommandIcon className="h-4 w-4" />
                Open command palette
              </Button>
              <Button variant="ghost" className="gap-2" onClick={() => toast.info("Copied URL")}>
                <Copy className="h-4 w-4" />
                Share link
              </Button>
              <Button
                variant="secondary"
                className="gap-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </Button>
            </div>
          </div>
          <Alert variant="info" className="md:max-w-sm">
            <AlertTitle>Quick start</AlertTitle>
            <AlertDescription>
              Run <code>npm install</code> inside <code>examples/showcase</code>, then <code>npm run dev</code>.
              All components below pull directly from <code>@stargazers-stella/cosmic-ui</code>.
            </AlertDescription>
          </Alert>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 glass">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Starter controls</CardTitle>
                <CardDescription>
                  Inputs, selects, and textareas styled with the design tokens in this library.
                </CardDescription>
              </div>
              <Badge variant="outline">Form kit</Badge>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-muted-foreground">
                Project name
                <Input placeholder="cosmic-ui-demo" />
              </label>
              <label className="space-y-2 text-sm font-medium text-muted-foreground">
                Framework
                <Select value={framework} onValueChange={setFramework}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a stack" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="next">Next.js + Tailwind</SelectItem>
                      <SelectItem value="astro">Astro + Tailwind</SelectItem>
                      <SelectItem value="remix">Remix + Tailwind</SelectItem>
                      <SelectItem value="expo">Expo + NativeWind</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </label>
              <label className="md:col-span-2 space-y-2 text-sm font-medium text-muted-foreground">
                Notes
                <Textarea rows={3} placeholder="Describe the vibe, constraints, or goals." />
              </label>
              <div className="flex items-center gap-3 md:col-span-2">
                <Button onClick={() => toast.success("Form submitted")}>Save changes</Button>
                <Button variant="secondary" onClick={() => toast.info("Draft saved")}>
                  Save as draft
                </Button>
                <Button variant="outline" onClick={() => toast.warning("Reset all fields")}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dialog & dropdown</CardTitle>
              <CardDescription>Radix-powered overlays with the same token set.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full gap-2">
                    <Wand2 className="h-4 w-4" />
                    Launch dialog
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Design tokens loaded</DialogTitle>
                    <DialogDescription>
                      This modal shares the same palette, radii, and shadows as every other component.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 rounded-lg border border-dashed border-border/50 p-4">
                    <p className="text-sm text-muted-foreground">
                      Swap values in <code>examples/showcase/src/style.css</code> to see live theming changes.
                    </p>
                    <div className="flex gap-2">
                      <Button onClick={() => toast.success("Changes applied")}>Apply</Button>
                      <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Project actions
                    <SunMedium className="h-4 w-4 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <DropdownMenuLabel>Environments</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => toast.message("Deploying to preview")}>
                      <Rocket className="mr-2 h-4 w-4" />
                      Deploy preview
                      <DropdownMenuShortcut>⇧+D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => toast.message("Syncing GitHub Actions")}>
                      <Github className="mr-2 h-4 w-4" />
                      Sync CI
                    </DropdownMenuItem>
                    <DropdownMenuCheckboxItem
                      checked={showBeta}
                      onCheckedChange={(checked) => setShowBeta(Boolean(checked))}
                    >
                      Show beta flag
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Density</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
                        <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Badge>Overlay ready</Badge>
              <Badge variant="outline">{density} mode</Badge>
              <Badge variant="glow">{showBeta ? "Beta on" : "Beta off"}</Badge>
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Plans table</CardTitle>
                <CardDescription>Styled table primitives with hover, focus, and spacing baked in.</CardDescription>
              </div>
              <Button variant="secondary" onClick={() => toast.info("Exported CSV")}>
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.name}>
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell>{plan.usage}</TableCell>
                      <TableCell>{plan.uptime}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={plan.name === highlightedPlan.name ? "glow" : "outline"}>
                          {plan.name === highlightedPlan.name ? "Recommended" : "Available"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle>Button set</CardTitle>
              <CardDescription>All button variants in one place for quick reference.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button>
                  <Check className="mr-2 h-4 w-4" />
                  Primary
                </Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link style</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass">
          <CardHeader className="flex flex-wrap items-center gap-3 md:justify-between">
            <div>
              <CardTitle>Command palette</CardTitle>
              <CardDescription>Uses the same Dialog + Command primitives; hit the button or press ⌘/.</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setCommandOpen(true)} className="gap-2">
              <CommandIcon className="h-4 w-4" />
              Open palette
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
            <div className="rounded-xl border border-dashed border-border/70 bg-card/80 p-6">
              <p className="text-sm text-muted-foreground">
                This demo wires up every Command subcomponent: input, groups, keyboard shortcuts, separators, and
                empty states. Swap the list or styling to fit your product.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Badge>Command</Badge>
                <Badge variant="outline">Dialog</Badge>
                <Badge variant="glow">Keyboard-friendly</Badge>
              </div>
            </div>
            <Alert>
              <AlertTitle>Pro tip</AlertTitle>
              <AlertDescription>
                You can pull these primitives into any app structure—Next.js, Remix, Expo, or plain Vite—as long as
                your Tailwind tokens match <code>style.css</code>.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search components, docs, or actions..." />
        <CommandList>
          <CommandEmpty>No results. Try a different query.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => toast.success("Opening dashboard")}>
              <Sparkles className="mr-2 h-4 w-4" />
              Dashboard
              <CommandShortcut>⌘1</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => toast.success("Opening components")}>
              <Wand2 className="mr-2 h-4 w-4" />
              Components
              <CommandShortcut>⌘2</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Appearance">
            <CommandItem onSelect={() => setTheme("light")}>
              <SunMedium className="mr-2 h-4 w-4" />
              Light mode
            </CommandItem>
            <CommandItem onSelect={() => setTheme("dark")}>
              <MoonStar className="mr-2 h-4 w-4" />
              Dark mode
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="External">
            <CommandItem onSelect={() => window.open("https://github.com", "_blank")}>
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <Toaster position="bottom-center" richColors />
    </div>
  );
}

export default App;
