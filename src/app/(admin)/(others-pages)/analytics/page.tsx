import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { getVisits } from "@/lib/api";
import VisitTable from "@/components/VisitTable";
import ComponentCard from "@/components/common/ComponentCard";
import BasicTableOne from "@/components/tables/BasicTableOne";

export default async function Analytics() {
  const visits = await getVisits();

  return (
    <div>
      {/* <PageBreadcrumb pageTitle="Analytics Page" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[800px]">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Visits Table
          </h3>

          <VisitTable visits={visits} />
        </div>
      </div> */}
      <PageBreadcrumb pageTitle="Analytics Page" />
      <div className="space-y-6">
        <ComponentCard title="Analytics">
          <VisitTable visits={visits} />
        </ComponentCard>
      </div>
    </div>
  );
}
