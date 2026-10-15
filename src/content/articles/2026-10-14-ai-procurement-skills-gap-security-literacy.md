---
title: "The AI skills gap in procurement is about judgment and security, not tools"
dek: "As AI agents move from drafting supplier summaries to acting inside business systems, procurement teams need enough security literacy to question outputs and vet vendors, and a plan to keep training junior staff."
date: 2026-10-14
topic: ai-procurement
type: analysis
signal: 3
categories: ["talent", "ai", "proc-tech"]
keyfacts:
  - value: "3"
    label: "skills to build: output checking, vendor vetting, escalation"
  - value: "6"
    label: "questions to ask any AI vendor before contract"
tags: ["AI", "procurement talent", "cybersecurity", "vendor risk", "agentic AI"]
image:
  src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.1.0"
  alt: "Colleagues with laptops listening to a presenter at a whiteboard"
  credit: "Austin Distel"
  creditUrl: "https://unsplash.com/photos/three-men-sitting-while-using-laptops-and-watching-man-beside-whiteboard-wD1LRb9OeEo"
  license: "Unsplash"
sources:
  - name: "CPOstrategy — AI in procurement's biggest barrier isn't technology. It's talent."
    url: "https://cpostrategy.media/blog/2026/10/09/ai-in-procurements-biggest-barrier-isnt-technology-its-talent/"
faqs:
  - q: "What AI skills do procurement teams actually need?"
    a: "Enough security literacy to spot risk, challenge unsupported AI outputs and know when to escalate to security specialists. Procurement does not need to become a cybersecurity function."
  - q: "What should procurement ask an AI vendor beyond a security questionnaire?"
    a: "What data and systems the AI can access, what permissions it holds, where its training and input data come from, how outputs are validated, and what happens if it is manipulated or behaves unexpectedly."
  - q: "What questions should procurement ask AI vendors?"
    a: "Ask what the AI can access and with what permissions, where its data comes from, how outputs are validated before actions, what happens if it is manipulated or misbehaves, and whether every action is logged."
  - q: "What should procurement ask vendors selling AI agents?"
    a: "Ask what data and systems the agent can reach and with what permissions, whether outside content can influence it, how outputs are validated before actions, what happens if it is manipulated, and whether every action is logged."
  - q: "Do procurement staff need cybersecurity training to buy AI?"
    a: "They don't need to become security experts, but they need to know which questions to ask and when to bring in the security team, according to Hack The Box's Nikos Fountas."
---

## Why it matters

Procurement sits on both sides of the AI question. Teams use AI to analyze suppliers and draft documents, and they also buy AI products for the rest of the business. Both roles now require people who can tell when an AI output is wrong and when a vendor's AI creates risk the standard questionnaire won't catch.

## The details

In a CPOstrategy column, Nikos Fountas, chief operations officer at cybersecurity training company Hack The Box, argues that talent, not technology, is the main barrier to using AI well in procurement.

He argues procurement needs two complementary capabilities: staff who can use AI securely in their own work, and access to specialists who can assess and secure the AI the business buys. Procurement staff don't need to become cybersecurity experts, he writes, but they need to know which questions to ask and when to bring security in. "Procurement can't be used as a substitute for the security team's involvement."

His central point is that autonomy changes the stakes. A tool that writes a supplier summary is low risk. An agent that reads data and takes actions across systems is not, and the people supervising it need to understand its limits and failure modes. Procurement roles are shifting from doing tasks to supervising AI that does them.

Three risks stand out for procurement leaders:

- **Automation bias.** People accept plausible AI outputs without checking them.
- **Vendor blind spots.** Certifications and questionnaires don't reveal what an AI agent can access or how it behaves if manipulated through techniques such as prompt injection or data poisoning.
- **A thinning talent pipeline.** AI handles the routine, medium-complexity work that has always trained junior buyers. Without a plan, teams lose the path that builds future category managers.

**What security teams need, too.** Fountas argues the gap runs both ways. Penetration testers need to assess AI applications and agents, security operations analysts need to check AI-generated analysis independently, and security architects need to understand how AI changes data flows, permissions and trust boundaries. Training should be hands-on, with people working with AI in realistic environments and seeing how attackers could exploit it. "Capability needs to be developed, practised and demonstrated," he writes; it can't be assumed.

**Prompting isn't the skill.** He also argues these capabilities can't be built by teaching better prompt writing. They come from understanding how AI behaves, where its limits are and how it fails, which is why procurement staff need to know when to challenge or verify an output and when to bring in security.

## The vendor questions questionnaires miss

Fountas argues that standard security questionnaires and certifications don't reveal how an AI system behaves. When procurement evaluates AI tools for any part of the business, add these questions:

1. **Access:** What data and systems can the AI reach, and with what permissions?
2. **Sources:** Where does its data come from, and can outside content (emails, documents, websites) influence what it does?
3. **Validation:** How are outputs checked before they trigger actions?
4. **Failure:** What happens if it is manipulated, for example through prompt injection, or behaves unexpectedly? Who is alerted, and can actions be reversed?
5. **Logging:** Can you see every action an agent took and why?

## Who does what

| Task | Procurement | Security team |
|---|---|---|
| Identify AI in a purchase and its level of autonomy | Owns | Advises |
| Ask access, data and failure questions | Owns | Defines the question set |
| Challenge unsupported vendor claims | Owns | Supports |
| Technical testing and threat assessment | Escalates | Owns |
| Contract terms on permissions, logging and liability | Owns, with legal | Advises |

This split is our framework based on the column's argument; adapt it to your organization.

## Match the review to the level of autonomy

| What the AI does | Example | Review it needs |
|---|---|---|
| Drafts or summarizes | Supplier summary, first draft of an RFP | User checks it against source documents |
| Recommends | Suggests a supplier shortlist or award | Buyer verifies the reasoning and data before acting |
| Acts with approval | Prepares a purchase order a person approves | Approval step plus logging of what was proposed |
| Acts on its own | Sends RFQs, updates records or pays invoices | Security review, limited permissions, full action logs and a way to reverse actions |

This framework is ours, built on the column's point that autonomy changes the stakes. Most procurement teams are moving from the first row to the third; the fourth needs security involvement before it goes live.

## Contract terms for AI purchases

- **Permissions.** List the systems and data the AI may access, and require notice before that changes.
- **Data use.** State whether your data can be used to train models for other customers.
- **Logging.** Require logs of every action an agent takes, retained for a set period and available on request.
- **Incident notice.** Require prompt notice if the AI is manipulated or acts outside its permissions.
- **Liability.** Allocate responsibility for losses caused by incorrect AI actions.

These are our suggestions for discussion with legal and security teams.

## A practical training plan

1. **Everyone:** how the team's approved AI tools work, how to verify outputs and what data must never be pasted into them.
2. **Category managers:** how to evaluate AI in the products they buy, using the five vendor questions above.
3. **Team leads:** how to supervise AI-assisted work and when to escalate to security.
4. **New hires:** structured time doing core sourcing tasks by hand, then reviewing and correcting AI output, so they learn the fundamentals.

## What procurement teams should do

- **Train for judgment, not engineering.** Teach staff to verify AI outputs against source documents and to escalate when something looks wrong.
- **Add six questions to AI vendor evaluations:** what the AI can access, what permissions it has, where its data comes from, how outputs are validated, how it behaves under manipulation, and who is accountable when it acts incorrectly.
- **Bring security in early.** Procurement frames the questions; security teams test and validate. Write that split into your intake process for AI purchases.
- **Protect junior development.** Keep some routine sourcing work as deliberate training, or design rotations where new hires review and correct AI output.

## What to watch next

- **Agent permissions in vendor contracts.** Expect more procurement teams to add clauses on what AI agents can access and how actions are logged.
- **Training budgets.** Watch whether AI literacy and security training shows up in procurement team plans for 2027.
- **Junior roles.** Track how teams redesign entry-level work so category managers of the future still learn the fundamentals.

## The bigger picture

The column offers no survey data, but its argument matches a pattern across procurement: AI adoption is outrunning the governance and skills around it. Teams that pair AI rollouts with security literacy and vendor-vetting discipline will move faster with fewer surprises. For practical comparisons of procurement AI tools, see our [software rankings](/software/).
