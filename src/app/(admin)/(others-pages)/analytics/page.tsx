import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { getVisits } from "@/lib/api";
import VisitTable from "@/components/VisitTable";
import ComponentCard from "@/components/common/ComponentCard";

export default async function Analytics() {
  const pageNum = 0;
  const { visits, totalPages } = await getVisits(pageNum); // server-side fetch

  return (
    <div>
      <PageBreadcrumb pageTitle="Analytics Page" />
      <div className="space-y-6">
        <ComponentCard title="Analytics">
          {/* Pass data awal ke VisitTable */}
          <VisitTable initialVisits={visits} totalPages={totalPages} />
        </ComponentCard>
      </div>
    </div>
  );
}
