"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Point = { day: string; visitors: number; sessions: number; pageviews: number };

export default function DailyChart({ data }: { data: Point[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="visitorsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F7A3C" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#0F7A3C" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="pageviewsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(10,15,30,0.06)" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} tickLine={false} axisLine={false} width={40} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid rgba(10,15,30,0.08)",
              fontSize: 12,
            }}
          />
          <Area type="monotone" dataKey="visitors" stroke="#0F7A3C" strokeWidth={2} fill="url(#visitorsFill)" />
          <Area type="monotone" dataKey="pageviews" stroke="#F59E0B" strokeWidth={2} fill="url(#pageviewsFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
