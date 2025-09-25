import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { getVisits } from "@/lib/api";
import VisitTable from "@/components/VisitTable";
import ComponentCard from "@/components/common/ComponentCard";

export default async function Analytics() {
  const visits = await getVisits();

  return (
    <div>
      <PageBreadcrumb pageTitle="Analytics Page" />
      <div className="space-y-6">
        <ComponentCard title="Analytics">
          <VisitTable visits={visits.length ? visits : []} />
        </ComponentCard>
      </div>
    </div>
  );
}
