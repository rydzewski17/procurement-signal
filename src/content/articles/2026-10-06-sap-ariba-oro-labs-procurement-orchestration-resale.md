---
title: "SAP will sell ORO Labs' orchestration platform as an Ariba extension, conceding that procurement runs on more than one system"
dek: "The deal brands ORO's intake and workflow layer as 'SAP Ariba Procurement Orchestration by ORO Labs,' with general availability planned for November. Customers named include Coca-Cola, Pfizer, Siemens Energy and Novartis."
date: 2026-10-06
updated: 2026-10-14
topic: ai-procurement
type: news
signal: 3
categories: ["proc-tech", "ai"]
keyfacts:
  - value: "Nov. 2026"
    label: "planned general availability"
  - value: "Oct. 5"
    label: "announcement date, a day before SAP Connect"
  - value: "Resale"
    label: "SAP Solution Extension, not an acquisition"
  - value: "4"
    label: "named customers: Coca-Cola, Pfizer, Siemens Energy, Novartis"
tags: ["SAP Ariba", "ORO Labs", "procurement orchestration", "intake", "procurement software"]
image:
  src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.1.0"
  alt: "Graphs of performance analytics on a laptop screen"
  credit: "Luke Chesser"
  creditUrl: "https://unsplash.com/photos/graphs-of-performance-analytics-on-a-laptop-screen-JKUTrJ4vK00"
  license: "Unsplash"
sources:
  - name: "SAPinsider \u2014 Orchestration extended: SAP to sell ORO Labs platform"
    url: "https://sapinsider.org/blogs/orchestration-extended-sap-to-sell-oro-labs-platform/"
  - name: "SAPinsider \u2014 SAP delivers Joule agents across Ariba and Fieldglass"
    url: "https://sapinsider.org/blogs/sap-delivers-joule-agents-across-ariba-and-fieldglass-in-june-2026/"
faqs:
  - q: "Did SAP acquire ORO Labs?"
    a: "No. SAP will resell ORO Labs' platform as an SAP Solution Extension called SAP Ariba Procurement Orchestration by ORO Labs. SAP brands, sells and supports solution extensions, but ORO remains independent."
  - q: "What is procurement orchestration?"
    a: "Software that gives employees one place to start and track purchase requests, then routes them through the right approvals and systems, such as an ERP, sourcing tool, contract system or risk platform."
  - q: "What is SAP Ariba Procurement Orchestration by ORO Labs?"
    a: "It is ORO Labs' intake and orchestration platform resold by SAP through its Solution Extension program. It gives employees one place to start procurement requests and connects processes across SAP and non-SAP systems. General availability is planned for November 2026."
  - q: "How is procurement orchestration different from a procurement suite?"
    a: "An orchestration layer manages how requests are captured, routed and reviewed across teams and systems. A suite such as SAP Ariba executes the sourcing, contracting and purchasing transactions. Many large companies use both."
---

## Why it matters

Large companies rarely run procurement on one platform. By reselling an orchestration layer that connects SAP Ariba with other tools, SAP is acknowledging what procurement teams already know: the request front door and the systems behind it are separate buying decisions. It also raises the bar for standalone intake vendors such as [Zip and Omnea](/software/procurement-software/).

## The details

ORO Labs announced on Oct. 5, a day before SAP Connect 2026 in Las Vegas, that SAP will sell its platform as "SAP Ariba Procurement Orchestration by ORO Labs." It is a resale arrangement through SAP's Solution Extension program, in which partner products pass SAP's qualification process and SAP brands, sells and supports them. General availability is planned for November.

**What the product does:**

- Gives employees one experience to start and track procurement work
- Connects processes across SAP and non-SAP systems, in both current and next-generation Ariba environments, using pre-built connectors, APIs and SAP Integration Suite
- Supports low-code and no-code workflow changes as policies shift
- Places AI agent steps inside governed processes that keep approvals and human oversight

ORO Labs, founded by former SAP Ariba product leaders, names Coca-Cola, Pfizer, Siemens Energy and Novartis as customers. It says it will work alongside SAP's Joule assistant, though the companies didn't explain how. Pricing wasn't disclosed.

"Procurement transformation happens across the entire technology landscape," said Manoj Swaminathan, president and chief product officer of SAP Autonomous Suite. ORO CEO Sudhir Bhojwani said enterprises want value from agentic AI now "while building on the technology investments they already trust."

**How it fits SAP's own roadmap.** SAP is also building its own intake tools. Its Ariba Intake Management agent, planned for general availability in June 2026, offers conversational intake through chat, email and Microsoft Teams, routes requests across SAP and non-SAP systems and checks policy at intake, according to SAPinsider. It runs on next-generation SAP Ariba, generally available since March 2026, and is part of a rollout of 11 Joule agents across Ariba and Fieldglass, five in June and six in September. SAP said its Joule agent runtime is free to current Ariba and Fieldglass customers through Dec. 31, 2026.

**Why resell a partner at the same time.** The ORO extension targets customers whose procurement runs across many systems, not just Ariba. In practice, SAP customers now have two front-door options sold by SAP: its native intake agent for Ariba-centered processes, and ORO's orchestration layer for mixed landscapes. Expect SAP sales teams to position them by how much of a customer's process sits outside Ariba.

**What SAPinsider suggests customers ask.** Because SAP sells and supports the extension, pricing and packaging questions go to the SAP account team, SAPinsider noted. It suggested customers in the middle of an Ariba migration confirm which Ariba generations are covered at launch, ask which Joule Work scenario applies to their landscape, and clarify where SAP Integration Suite fits alongside ORO's pre-built connectors. ORO says it will coordinate with Joule Work, including where Joule Work is the main way users engage. SAPinsider also flagged an open question for any agentic procurement deployment: who owns the governance and oversight controls.

## How this changes the intake decision

| If you... | Options now | Questions to ask |
|---|---|---|
| Run Ariba plus other tools | SAP-sold ORO extension, or an independent intake vendor | Who supports integrations; how pricing compares |
| Run Ariba only | Ariba's own intake and Joule agents | Whether you need a separate orchestration layer at all |
| Don't use Ariba | Independent intake vendors | No change, but expect suites to compete harder |

## What an intake and orchestration layer actually does

Most procurement requests start outside procurement systems: an email, a chat message or a form. An intake and orchestration layer sits in front of the buying systems and handles four jobs:

| Job | What happens | Why it matters |
|---|---|---|
| Capture | Employees describe what they need in one place | Fewer requests bypass procurement |
| Triage | The request is routed by category, value and risk | Low-risk buys move fast; risky ones get review |
| Coordinate | Legal, security, finance and the business review in the right order | Fewer stalled requests and email chains |
| Hand off | The approved request goes to the system that executes it, such as Ariba | The transaction system stays the record of the purchase |

This is our description of the category in general. Vendors differ in how much of each job they cover and how deep their integrations go.

## Questions for an evaluation

1. Which of our systems does the product connect to out of the box, and which need custom integration?
2. Who maintains the connectors when SAP or another vendor changes its APIs?
3. How do AI agent steps get approved, logged and reversed?
4. What does a policy change cost in time and services: can our team change workflows without the vendor?
5. How is the product priced: per user, per request or per module?
6. For the SAP-resold extension, which company provides first-line support and who owns the roadmap?

## What procurement teams should do

- **Separate the front door from the back end** in your technology roadmap. Decide what employees use to request, then what executes the purchase.
- **Ask about support boundaries.** With a resold extension, confirm who handles issues: SAP, ORO or both.
- **Test agent governance.** Ask to see how agent steps, approvals and audit logs work before buying.
- **Compare total cost.** Get pricing for the extension against independent intake tools and Ariba's native options.

## What to watch next

- **General availability in November** and early customer feedback.
- **SAP's broader agent roadmap**, as it ships Joule agents across Ariba.
- **Responses from intake vendors** that compete with ORO.

## The bigger picture

Procurement software is splitting into layers: intake and orchestration, transaction suites and specialist tools. Suites are now partnering for the front door rather than building everything themselves. See our [procurement software rankings](/software/procurement-software/) for how intake platforms compare.
