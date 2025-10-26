"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

// ------------ Data (from CaseGuard Growth Report) ------------- //

const segments = [
  { segment: "Law Enforcement", count: 18000, gtm: ["FOIA backlog automation", "Police transparency campaigns", "On-prem AI deployments"] },
  { segment: "Prosecutors & Courts", count: 3000, gtm: ["Evidence readiness workflows", "District attorney associations", "Audit trail demos"] },
  { segment: "Education", count: 17500, gtm: ["FERPA compliance packages", "District training programs", "Email outreach to superintendents"] },
  { segment: "Corporate Legal", count: 2000, gtm: ["eDiscovery efficiency campaigns", "Legal ops community events", "On-prem privacy bundles"] },
  { segment: "State & Municipal", count: 6000, gtm: ["Public records automation", "Government IT resellers", "Procurement-friendly demos"] },
  { segment: "Healthcare", count: 6000, gtm: ["HIPAA compliance pilots", "Hospital IT data privacy webinars"] },
  { segment: "Insurance", count: 2500, gtm: ["Claims video redaction use cases", "Insurer privacy summit outreach"] },
  { segment: "Corrections", count: 5000, gtm: ["Facility privacy and litigation demos"] },
  { segment: "Retail & Security", count: 3000, gtm: ["CCTV privacy compliance workshops"] },
];

const competitors = [
  {
    name: "Axon (Evidence.com)",
    focus: "Hardware-first bundle; cloud-only",
    swot: {
      strengths: ["End-to-end police ecosystem", "Audit trails", "Strong brand presence"],
      weaknesses: ["Cloud-only", "Slow automation"],
      opportunities: ["Hybrid integrations", "Add-on redaction licensing"],
      threats: ["On-prem competition like CaseGuard", "Procurement fatigue"]
    }
  },
  {
    name: "Veritone Redact",
    focus: "AI cloud redaction & managed services",
    swot: {
      strengths: ["Strong AI marketing", "FOIAXpress integration"],
      weaknesses: ["Cloud-only", "Price point higher"],
      opportunities: ["Expand managed services", "Partner with legal associations"],
      threats: ["Privacy restrictions on outsourcing"]
    }
  },
  {
    name: "VIDIZMO Redactor",
    focus: "Video platform with hybrid options",
    swot: {
      strengths: ["Hybrid/on-prem deployments", "Compliance messaging"],
      weaknesses: ["Platform-first upsell"],
      opportunities: ["Government compliance expansions"],
      threats: ["Single-module specialists like CaseGuard"]
    }
  },
  {
    name: "Suspect Technology",
    focus: "LE focused on-prem/azure gov",
    swot: {
      strengths: ["CJIS-ready", "Simple deployment"],
      weaknesses: ["Limited product maturity"],
      opportunities: ["Local agency expansion"],
      threats: ["Feature-rich competitors"]
    }
  },
  {
    name: "Genetec/Adobe/manual",
    focus: "Basic built-ins",
    swot: {
      strengths: ["Low incremental cost", "Existing footprint"],
      weaknesses: ["Manual process", "Error-prone"],
      opportunities: ["Automation upgrades"],
      threats: ["Specialized tools like CaseGuard"]
    }
  }
];

const sources = [
  { title: "Law Enforcement", refs: ["~18,000 agencies; ~50% with body cams; ~80% of large PDs", "Federal FOIA ~1.5M requests FY2024 (+~25% YoY)"] },
  { title: "Prosecutors & Courts", refs: ["3,000+ DA offices; Queens DA expanded from 20→100 licenses (~700 users)"] },
  { title: "Education", refs: ["~13,500 districts + ~4,000 colleges/universities", "FERPA-driven redaction"] },
  { title: "Corporate Legal", refs: ["eDiscovery $17B+ globally; multimedia rising 10–15% YoY"] },
  { title: "State & Municipal", refs: ["FOIA compliance cost ~$596M (federal benchmark)"] },
];

// ------------ Helpers ------------- //

function useFilteredCompetitors(q) {
  return useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return competitors;
    return competitors.filter((c) => c.name.toLowerCase().includes(term));
  }, [q]);
}

// ------------ Component ------------- //

export default function CaseGuardPitchDashboard() {
  const [query, setQuery] = useState("");
  const filteredCompetitors = useFilteredCompetitors(query);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-gray-900">CaseGuard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-blue-600">Nytro</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card><CardContent className="p-4"><div className="text-sm text-gray-500">Primary Focus</div><div className="text-2xl font-semibold">Law, DAs, Education</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-sm text-gray-500">Report Insight</div><div className="text-2xl font-semibold">FOIA & Bodycam Demand</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-sm text-gray-500">Deployment Edge</div><div className="text-2xl font-semibold">On‑Prem Control</div></CardContent></Card>
        </motion.div>

        <Tabs defaultValue="market" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 gap-2 bg-white p-2 rounded-2xl shadow-sm">
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="competition">Competition</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="mt-4">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2">Documented Counts by Segment</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={segments}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="segment" hide />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#60a5fa" radius={[6,6,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-500 mt-2">All counts verified from CaseGuard Growth Report.</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competition" className="mt-4">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Search size={16} className="text-gray-500"/>
                  <Input placeholder="Search competitors..." value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredCompetitors.map((c) => (
                    <div key={c.name} className="rounded-2xl border bg-white p-4">
                      <h3 className="font-semibold mb-1">{c.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{c.focus}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                        <div><strong>Strengths</strong><ul className="list-disc pl-4">{c.swot.strengths.map((s,i)=><li key={i}>{s}</li>)}</ul></div>
                        <div><strong>Weaknesses</strong><ul className="list-disc pl-4">{c.swot.weaknesses.map((w,i)=><li key={i}>{w}</li>)}</ul></div>
                        <div><strong>Opportunities</strong><ul className="list-disc pl-4">{c.swot.opportunities.map((o,i)=><li key={i}>{o}</li>)}</ul></div>
                        <div><strong>Threats</strong><ul className="list-disc pl-4">{c.swot.threats.map((t,i)=><li key={i}>{t}</li>)}</ul></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sources.map((s) => (
                <Card key={s.title} className="rounded-2xl shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{s.title}</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      {s.refs.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="segments" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {segments.map((s) => (
                <Card key={s.segment} className="rounded-2xl shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{s.segment}</h3>
                    <div className="text-sm text-gray-600 mb-2">{s.count.toLocaleString()} organizations (report figure)</div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Go-To-Market Actions</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {s.gtm.map((g,i)=><li key={i}>{g}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="mt-4">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-4 text-sm text-gray-700">
                Data extracted exclusively from the CaseGuard North America Growth Scan report provided by Stan. No external estimates were added.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
