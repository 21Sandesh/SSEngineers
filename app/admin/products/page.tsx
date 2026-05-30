import RangePicker from "@/components/admin/RangePicker";
import SectionCard from "@/components/admin/SectionCard";
import DataTable from "@/components/admin/DataTable";
import { getProductViews } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

function parseDays(value: string | string[] | undefined): number {
  const v = Array.isArray(value) ? value[0] : value;
  const n = Number(v);
  if ([1, 7, 30, 90].includes(n)) return n;
  return 30;
}

export default async function ProductsAnalyticsPage({
  searchParams,
}: {
  searchParams: { days?: string };
}) {
  const days = parseDays(searchParams.days);
  const rows = await getProductViews(days, 30);
  const products = rows.filter((r) => r.label?.startsWith("product:"));
  const categories = rows.filter((r) => r.label?.startsWith("category:"));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="display-tight text-3xl text-ink">Product interest</h1>
        <RangePicker current={days} />
      </div>

      <SectionCard title="Most-viewed products">
        <DataTable
          rows={products.map((r) => ({ ...r }))}
          empty="No product opens yet."
          columns={[
            {
              key: "label",
              header: "Product",
              render: (r) => <span className="font-mono text-xs">{r.label?.replace(/^product:/, "")}</span>,
            },
            { key: "views", header: "Views", className: "text-right" },
          ]}
        />
      </SectionCard>

      <SectionCard title="Most-viewed categories">
        <DataTable
          rows={categories.map((r) => ({ ...r }))}
          empty="No category opens yet."
          columns={[
            {
              key: "label",
              header: "Category",
              render: (r) => <span className="font-mono text-xs">{r.label?.replace(/^category:/, "")}</span>,
            },
            { key: "views", header: "Views", className: "text-right" },
          ]}
        />
      </SectionCard>
    </div>
  );
}
