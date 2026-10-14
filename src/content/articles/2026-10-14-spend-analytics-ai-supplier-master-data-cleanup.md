---
title: "Before AI touches your spend data, fix the supplier master: a seven-step cleanup for procurement and finance"
dek: "AI spend tools categorize and flag faster than any analyst, but duplicate suppliers, misread invoices and loose coding still produce wrong totals. The fix is shared ownership and monthly checks, not more software."
date: 2026-10-14
topic: ai-procurement
type: analysis
signal: 3
categories: ["spend", "ai", "proc-tech"]
keyfacts:
  - value: "7"
    label: "data checks to run before trusting AI spend analysis"
  - value: "April 2029"
    label: "UK e-invoicing mandate for VAT invoices"
  - value: "6 years"
    label: "typical UK VAT record retention"
tags: ["spend analysis", "supplier master data", "AI", "e-invoicing", "data quality"]
image:
  src: "https://images.unsplash.com/photo-1783115259399-3a5a3e0e4592?ixlib=rb-4.1.0"
  alt: "Hands typing on a laptop displaying a data spreadsheet"
  credit: "Gorilla ROI Data Connector"
  creditUrl: "https://unsplash.com/photos/hands-typing-on-a-laptop-displaying-a-data-spreadsheet-9fZuqBYlV1w"
  license: "Unsplash"
sources:
  - name: "CPOstrategy — AI will read your spend data. It will not fix it."
    url: "https://cpostrategy.media/blog/2026/10/12/ai-will-read-your-spend-data-it-will-not-fix-it/"
  - name: "HMRC — Record keeping for VAT (Notice 700/21)"
    url: "https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021"
  - name: "UK Government — Promoting electronic invoicing: consultation response"
    url: "https://www.gov.uk/government/consultations/promoting-electronic-invoicing-across-uk-businesses-and-the-public-sector/outcome/promoting-electronic-invoicing-across-uk-businesses-and-the-public-sector-consultation-response"
faqs:
  - q: "Can AI spend analytics fix bad supplier data on its own?"
    a: "No. AI tools help categorize, match and flag anomalies, but they analyze the records underneath them. Duplicate suppliers, misread invoices and inconsistent coding produce wrong totals unless someone owns and checks the data."
  - q: "What is the first data fix procurement should make?"
    a: "Clean the supplier master: give it one owner and match suppliers on registration and tax numbers rather than names, so 'Acme Ltd' and 'ACME Limited' count as one supplier."
---

## Why it matters

Spend visibility is the starting point for every savings case, and AI tools are now the default way teams build it. But a model that reads "Acme Ltd" and "ACME Limited" as two suppliers will understate your leverage with that supplier, and a misread invoice date or total will flow straight into your category reports.

## The details

In a CPOstrategy column, Harvey Dhillon, founder of UK accountancy firm Zmartly, argues that AI spend tools only reflect the finance records beneath them. Clean records come from ownership and routine checks agreed between procurement and finance, not from the software.

His checklist translates into seven controls procurement teams can own or co-own:

1. **Supplier master data.** One owner. Match suppliers on company and tax registration numbers, not names, to remove duplicates that split spend.
2. **Invoice capture.** OCR tools misread dates and totals. Sample-check monthly, including credit notes, part payments and foreign-currency invoices.
3. **Tax evidence.** In the UK, valid VAT invoices are the evidence for reclaiming VAT and generally must be kept at least six years. Making a valid invoice a condition of payment keeps the data complete.
4. **Overseas suppliers.** Foreign software vendors may not charge VAT, but the buyer can still owe it under the reverse charge. Keep a list for finance.
5. **Category mapping.** One agreed map from spend categories to general ledger codes, with the fallback "miscellaneous" code cleared every month.
6. **Duplicate payments.** Check supplier, amount and invoice number before each payment run.
7. **Monthly reconciliation.** Match every bank and card line to an invoice and a code. This is where card-bought software below approval limits shows up.

The UK will require e-invoicing for all VAT invoices from April 2029, through the Peppol network. Structured invoices will improve capture accuracy, but as the column notes, they will not merge duplicate supplier records.

## What procurement teams should do

- **Agree ownership before buying tools.** Write down who owns the supplier master, the category map and the fallback code, and how often each is reviewed.
- **Run a duplicate-supplier sweep.** Group suppliers by tax ID or registration number and merge records before your next spend cube refresh.
- **Measure the "unclassified" line.** Track the share of spend in fallback codes each month. If it isn't shrinking, the AI is classifying around a data problem.
- **Ask vendors the right question.** In demos, ask how the tool handles duplicate suppliers and low-confidence classifications, not just how fast it categorizes.

## What to watch next

- **E-invoicing mandates.** More countries are requiring structured e-invoices, which will improve data quality if suppliers comply.
- **AI classification claims.** Ask vendors how their accuracy changes when the supplier master is clean versus messy.
- **Tariff exposure analysis.** Expect spend tools to add country of origin, which only works if supplier records include it.

## The bigger picture

AI is making spend analysis faster and cheaper, which raises the cost of bad inputs: wrong answers now arrive with more confidence. The teams getting value treat data quality as an operating rhythm shared with finance. For how leading platforms approach classification, see our [spend analytics software ranking](/software/spend-analytics/).
