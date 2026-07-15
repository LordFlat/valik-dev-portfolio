"use client";

import Link from "next/link";
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { submitChatEnquiryAction } from "@/lib/actions/chat";

const QUICK_REPLY_SETS = {
  main: [
    "Website prices",
    "Project timing",
    "Website redesign",
    "Discuss a project",
  ],
  afterPrice: [
    "What is included?",
    "How long does it take?",
    "View website examples",
    "Request a quote",
  ],
  afterTiming: [
    "Website prices",
    "What do you need from me?",
    "View website examples",
    "Request a quote",
  ],
  afterRedesign: [
    "What can be improved?",
    "Website prices",
    "View redesign examples",
    "Request a redesign quote",
  ],
  afterServices: [
    "Landing page",
    "Small business website",
    "Website redesign",
    "Discuss a project",
  ],
  afterLanding: [
    "What is included?",
    "Project timing",
    "View landing pages",
    "Request a quote",
  ],
  afterBusinessSite: [
    "What is included?",
    "Project timing",
    "View website examples",
    "Request a quote",
  ],
  afterPortfolio: [
    "Website prices",
    "Project timing",
    "Discuss a similar project",
    "What services do you offer?",
  ],
  afterUnknown: [
    "Website prices",
    "Website options",
    "View website examples",
    "Contact Valentyn",
  ],
} as const;

type QuickReplyContext = keyof typeof QUICK_REPLY_SETS;
type Stage = "name" | "main" | "project" | "email" | "sent";
type Role = "assistant" | "visitor";
type ChatMessage = {
  id: string;
  role: Role;
  text: string;
  link?: { href: string; label: string };
};

type Intent =
  | "price"
  | "timing"
  | "redesign"
  | "services"
  | "portfolio"
  | "project"
  | "contact"
  | "landing"
  | "businessWebsite"
  | "included"
  | "requirements"
  | "improvements"
  | "greeting"
  | "thanks"
  | "unknown";

const makeMessage = (
  role: Role,
  text: string,
  link?: ChatMessage["link"],
): ChatMessage => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  role,
  text,
  link,
});

const normalise = (value: string) =>
  value
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\bweb\s+site\b/g, "website")
    .replace(/\bbussines(?:s)?\b/g, "business")
    .replace(/\bbusines\b/g, "business")
    .replace(/[^a-z0-9£\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function editDistance(a: string, b: string) {
  const rows = Array.from({ length: a.length + 1 }, (_, index) => index);

  for (let column = 1; column <= b.length; column += 1) {
    let previousDiagonal = rows[0];
    rows[0] = column;

    for (let row = 1; row <= a.length; row += 1) {
      const previousRowValue = rows[row];
      const substitutionCost = a[row - 1] === b[column - 1] ? 0 : 1;
      rows[row] = Math.min(
        rows[row] + 1,
        rows[row - 1] + 1,
        previousDiagonal + substitutionCost,
      );
      previousDiagonal = previousRowValue;
    }
  }

  return rows[a.length];
}

function roughlyContains(text: string, target: string) {
  if (text.includes(target)) return true;
  if (target.includes(" ")) return false;

  const tolerance = target.length >= 8 ? 2 : 1;
  return text
    .split(" ")
    .filter(Boolean)
    .some((word) => Math.abs(word.length - target.length) <= tolerance && editDistance(word, target) <= tolerance);
}

function detectIntent(value: string): Intent {
  const text = normalise(value);
  const hasWebsite = roughlyContains(text, "website") || /\bwebpage\b/.test(text);
  const hasBusiness = roughlyContains(text, "business") || /\b(company|shop|salon|restaurant|service)\b/.test(text);

  if (/\b(thank|thanks|cheers|perfect|great|helpful)\b/.test(text)) return "thanks";
  if (/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(text)) return "greeting";

  if (/\b(contact valentyn|discuss a project|discuss a similar project|request a quote|request a redesign quote|get a quote|send an enquiry|send my enquiry|speak to valentyn|talk to valentyn)\b/.test(text)) {
    return "contact";
  }

  if (/\b(what is included|what's included|whats included|included|what do i get|what comes with|package includes)\b/.test(text)) {
    return "included";
  }

  if (/\b(what do you need from me|what do i need|what should i provide|content needed|need from me|photos|logo|copy)\b/.test(text)) {
    return "requirements";
  }

  if (/\b(what can be improved|what would you improve|improve my website|website problems|fix my website)\b/.test(text)) {
    return "improvements";
  }

  if (/\b(landing page|one page website|single page website|one-page website)\b/.test(text)) return "landing";
  if (/\b(small business website|business website|company website|multi-page website|multipage website)\b/.test(text)) {
    return "businessWebsite";
  }

  if (/\b(price|prices|pricing|cost|costs|how much|budget|£|pound|quote)\b/.test(text)) return "price";
  if (/\b(how long|timeframe|timeline|turnaround|duration|when|timing|take)\b/.test(text)) return "timing";
  const mentionsExistingSite =
    /\b(my|our|current|existing|old) (website|site)\b/.test(text) ||
    /\b(website|site) (i|we) (have|already have|currently have)\b/.test(text);

  if (
    /\b(redesign|re-design|rework|revamp|redo|rebuild|refresh|modernise|modernize|update|upgrade)\b/.test(text) &&
    (hasWebsite || mentionsExistingSite)
  ) {
    return "redesign";
  }

  if (
    /\b(improve|fix|change|make better|work on|help with)\b/.test(text) &&
    mentionsExistingSite
  ) {
    return "redesign";
  }
  if (/\b(portfolio|work|examples|projects|case studies|show me|view landing pages|view redesign examples|view website examples)\b/.test(text)) {
    return "portfolio";
  }
  if (/\b(service|services|what do you do|what can you do|website type|website options|digital tools|automation)\b/.test(text)) {
    return "services";
  }

  const asksForWebsite =
    hasWebsite &&
    !mentionsExistingSite &&
    (/\b(looking|look|want|need|build|create|make|new|looking for|interested in)\b/.test(text) || hasBusiness);

  if (asksForWebsite || /\b(i need online presence|help my business online|start a website)\b/.test(text)) {
    return "project";
  }

  if (/\b(contact|speak|talk|call|email me|enquiry|inquiry|interested|start project)\b/.test(text)) return "contact";

  return "unknown";
}

function cleanName(value: string): string | null {
  const stripped = value
    .trim()
    .replace(/^(my name is|i am|i'm|im|call me)\s+/i, "")
    .replace(/[^\p{L}\p{M}\s'-]/gu, "")
    .replace(/\s+/g, " ")
    .trim();

  if (stripped.length < 2 || stripped.length > 60 || !/[\p{L}]/u.test(stripped)) return null;
  return stripped.split(" ").slice(0, 3).join(" ");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("name");
  const [quickReplyContext, setQuickReplyContext] = useState<QuickReplyContext>("main");
  const [unknownCount, setUnknownCount] = useState(0);
  const [name, setName] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    makeMessage(
      "assistant",
      "Hi! I’m the Valentyn Studio assistant. Before we begin, what should I call you?",
    ),
  ]);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(timer);
  }, [open, stage]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open, isPending]);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const placeholder = useMemo(() => {
    if (stage === "name") return "Your name…";
    if (stage === "project") return "Tell me briefly what you need…";
    if (stage === "email") return "Your email address…";
    if (stage === "sent") return "Enquiry sent";
    return "Type your question…";
  }, [stage]);

  const addAssistant = (text: string, link?: ChatMessage["link"]) => {
    setMessages((current) => [...current, makeMessage("assistant", text, link)]);
  };

  const addVisitor = (text: string) => {
    const message = makeMessage("visitor", text);
    setMessages((current) => [...current, message]);
    return message;
  };

  const beginEnquiry = (intro?: string) => {
    const firstName = name.split(" ")[0] || name;
    addAssistant(
      intro ??
        `Great, ${firstName}. Tell me briefly what you need — for example a new landing page, a small business website or a redesign.`,
    );
    setStage("project");
  };

  const respondToMainIntent = (value: string) => {
    const intent = detectIntent(value);
    const firstName = name.split(" ")[0] || name;

    if (intent !== "unknown") setUnknownCount(0);

    switch (intent) {
      case "price":
        addAssistant(
          `${firstName}, landing pages are £149. Small business websites and redesigns are quoted individually because the number of pages, content and functionality can vary.`,
        );
        setQuickReplyContext("afterPrice");
        break;
      case "timing":
        addAssistant(
          `${firstName}, the timeline is agreed before work begins. A focused landing page is usually the quickest option, while small business websites and redesigns depend on the amount of content, pages and revisions needed.`,
        );
        setQuickReplyContext("afterTiming");
        break;
      case "redesign":
        addAssistant(
          `Yes, ${firstName}. Valentyn Studio can redesign an existing website to make it cleaner, easier to use on mobile and clearer for customers. Pricing depends on the current site and the amount of work required.`,
        );
        setQuickReplyContext("afterRedesign");
        break;
      case "services":
        addAssistant(
          `${firstName}, Valentyn Studio creates £149 landing pages, small business websites, website redesigns and practical digital tools. Which option sounds closest to what you need?`,
        );
        setQuickReplyContext("afterServices");
        break;
      case "portfolio":
        addAssistant(
          `Of course, ${firstName}. You can view selected websites, landing pages and digital tools in the portfolio.`,
          { href: "/projects", label: "View selected work" },
        );
        setQuickReplyContext("afterPortfolio");
        break;
      case "project":
        addAssistant(
          `Absolutely, ${firstName}. That sounds like a new website for your business. Do you need a focused one-page landing page, a small multi-page business website, or are you not sure yet?`,
        );
        setQuickReplyContext("afterServices");
        break;
      case "contact":
        beginEnquiry();
        break;
      case "landing":
        addAssistant(
          `${firstName}, a landing page is £149. It is a focused one-page website built around one business, service or offer, with a clear route for visitors to contact you.`,
        );
        setQuickReplyContext("afterLanding");
        break;
      case "businessWebsite":
        addAssistant(
          `${firstName}, a small business website is a good fit when you need several pages such as Home, About, Services, Gallery and Contact. The price is quoted individually based on the pages, content and features you need.`,
        );
        setQuickReplyContext("afterBusinessSite");
        break;
      case "included":
        if (quickReplyContext === "afterLanding") {
          addAssistant(
            `${firstName}, the £149 landing page includes a clean responsive design, a clear page structure, mobile optimisation, contact calls to action and deployment of the finished page. The exact sections are shaped around your business and content.`,
          );
          setQuickReplyContext("afterLanding");
        } else if (quickReplyContext === "afterRedesign") {
          addAssistant(
            `${firstName}, a redesign can include a clearer structure, refreshed visuals, mobile improvements, stronger calls to action and cleaner presentation of your services. Valentyn reviews the current site before confirming the scope and quote.`,
          );
          setQuickReplyContext("afterRedesign");
        } else {
          addAssistant(
            `${firstName}, every project includes a clear agreed scope, responsive design, a structured route to contact your business and a final review before launch. The exact pages and functionality depend on the project.`,
          );
          setQuickReplyContext("afterBusinessSite");
        }
        break;
      case "requirements":
        addAssistant(
          `${firstName}, the useful starting points are your business name, services, preferred contact details, any existing logo or photos, and examples of websites you like. Don’t worry if everything is not ready yet — Valentyn can help organise the content.`,
        );
        setQuickReplyContext("afterTiming");
        break;
      case "improvements":
        addAssistant(
          `${firstName}, common improvements include a clearer first screen, stronger service descriptions, better mobile layout, faster loading and more obvious contact buttons. Valentyn can review the current website before recommending what is actually worth changing.`,
        );
        setQuickReplyContext("afterRedesign");
        break;
      case "greeting":
        addAssistant(
          `Hi ${firstName}! You can ask me naturally about prices, project timing, redesigns, website options or examples of previous work.`,
        );
        setQuickReplyContext("main");
        break;
      case "thanks":
        addAssistant(
          `You’re welcome, ${firstName}. What would you like to look at next?`,
        );
        break;
      default:
        if (unknownCount === 0) {
          addAssistant(
            `I’m not completely sure what you mean, ${firstName}. Choose the closest option below, or select Contact Valentyn and I’ll send him this chat so he can help directly.`,
          );
          setUnknownCount(1);
          setQuickReplyContext("afterUnknown");
        } else {
          addAssistant(
            `I still can’t answer that confidently, ${firstName}. Please leave your email address and I’ll send this full chat to Valentyn so he can contact you directly.`,
          );
          setStage("email");
        }
        break;
    }
  };

  const sendEnquiry = (email: string, transcript: ChatMessage[]) => {
    startTransition(async () => {
      const result = await submitChatEnquiryAction({
        name,
        email,
        projectSummary,
        sourcePage: window.location.pathname,
        transcript: transcript.map((message) => ({
          role: message.role,
          text: message.text,
        })),
        website: "",
      });

      if (result.status === "success") {
        setStage("sent");
        addAssistant(
          `Thank you, ${name.split(" ")[0] || name}. Your enquiry and chat have been sent to Valentyn. He’ll reply to ${email} as soon as possible.`,
          { href: "/projects", label: "View work while you wait" },
        );
      } else {
        addAssistant(result.message);
      }
    });
  };

  const handleMessage = (rawValue: string) => {
    const value = rawValue.trim();
    if (!value || isPending || stage === "sent") return;

    const visitorMessage = addVisitor(value);
    setInput("");

    if (stage === "name") {
      const cleaned = cleanName(value);
      if (!cleaned) {
        addAssistant("I didn’t catch a name there. What should I call you?");
        return;
      }

      setName(cleaned);
      setStage("main");
      setQuickReplyContext("main");
      addAssistant(
        `Nice to meet you, ${cleaned}. How can I help with your website today?`,
      );
      return;
    }

    if (stage === "project") {
      setProjectSummary(value);
      setStage("email");
      addAssistant(
        `Thanks, ${name.split(" ")[0] || name}. What email address should Valentyn use to contact you? I’ll include this full chat so you won’t need to explain everything again.`,
      );
      return;
    }

    if (stage === "email") {
      if (!isEmail(value)) {
        addAssistant(
          `That doesn’t look like a complete email address, ${name.split(" ")[0] || name}. Please enter something like name@example.com.`,
        );
        return;
      }

      const nextMessages = [...messages, visitorMessage];
      sendEnquiry(value, nextMessages);
      return;
    }

    respondToMainIntent(value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleMessage(input);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleMessage(input);
    }
  };

  const quickReplies = QUICK_REPLY_SETS[quickReplyContext];

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      {open && (
        <section
          className="mb-3 flex h-[min(620px,calc(100dvh-6rem))] w-[min(390px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[26px] border border-charcoal/10 bg-paper-soft shadow-[0_28px_90px_-28px_rgba(17,17,17,0.5)] max-sm:h-[calc(100dvh-5.5rem)]"
          role="dialog"
          aria-modal="false"
          aria-label="Valentyn Studio website assistant"
        >
          <header className="flex items-center justify-between border-b border-line bg-paper px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-charcoal text-sm font-semibold text-paper-soft">
                VS
              </div>
              <div>
                <h2 className="text-sm font-semibold text-charcoal">Valentyn Studio Assistant</h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-stone">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Website help &amp; enquiries
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-full text-stone transition-colors hover:bg-charcoal/5 hover:text-charcoal"
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div
            ref={scrollRef}
            className="no-scrollbar flex-1 space-y-3 overflow-y-auto bg-paper-deep/60 px-4 py-4"
            aria-live="polite"
          >
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.16em] text-stone/70">
              Today
            </p>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "visitor" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === "visitor"
                      ? "rounded-br-md bg-charcoal text-paper-soft"
                      : "rounded-bl-md border border-charcoal/10 bg-paper-soft text-charcoal shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  {message.link && (
                    <Link
                      href={message.link.href}
                      onClick={() => setOpen(false)}
                      className={`mt-2 inline-flex text-xs font-semibold underline underline-offset-2 ${
                        message.role === "visitor" ? "text-paper-soft" : "text-accent"
                      }`}
                    >
                      {message.link.label}
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {isPending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-charcoal/10 bg-paper-soft px-4 py-3 shadow-sm">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-line bg-paper-soft p-3.5">
            {stage === "main" && (
              <div className="mb-3 grid grid-cols-2 gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => handleMessage(reply)}
                    className="min-h-10 rounded-2xl border border-charcoal/15 bg-paper px-2.5 py-2 text-center text-[11px] font-medium leading-tight text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-paper-soft sm:text-xs"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onInputKeyDown}
                disabled={stage === "sent" || isPending}
                autoComplete={stage === "email" ? "email" : stage === "name" ? "name" : "off"}
                inputMode={stage === "email" ? "email" : "text"}
                aria-label={placeholder}
                placeholder={placeholder}
                maxLength={stage === "email" ? 160 : 1000}
                className="min-w-0 flex-1 rounded-full border border-charcoal/15 bg-paper px-4 py-3 text-sm text-charcoal placeholder:text-stone/65 outline-none transition focus:border-charcoal focus:ring-2 focus:ring-charcoal/10 disabled:cursor-not-allowed disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || stage === "sent" || isPending}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-charcoal text-paper-soft transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Send message"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </form>

            <p className="mt-2 px-1 text-[10px] leading-relaxed text-stone/75">
              This assistant uses guided answers, not generative AI. By sending your email, you agree to the{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-charcoal">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      <div className="flex items-center justify-end gap-2">
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="hidden rounded-full border border-charcoal/10 bg-paper-soft px-4 py-2.5 text-sm font-medium text-charcoal shadow-lg transition-transform hover:-translate-y-0.5 sm:block"
          >
            Need help with a website?
          </button>
        )}
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-charcoal text-paper-soft shadow-[0_16px_44px_-12px_rgba(17,17,17,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-accent"
          aria-label={open ? "Close website assistant" : "Open website assistant"}
          aria-expanded={open}
        >
          {!open && <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-paper bg-accent" />}
          {open ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
              <path d="M8 9h8M8 13h5" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
