// components/ManageTab.jsx
import { useState, useMemo } from "react";
import AttendanceFilters from "./AttendanceFilters";
import AttendanceTable from "./AttendanceTable";
import MonthlyAttendanceView from "./MonthlyAttendanceView";
import { mockAttendanceData } from "../data/mockData";

const ManageTab = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7) // YYYY-MM format
  );
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewType, setViewType] = useState("daily");

  // Filter records based on selected criteria
  const filteredRecords = useMemo(() => {
    return mockAttendanceData.filter((record) => {
      // Date/Month filter
      const dateMatch =
        viewType === "daily"
          ? record.date === selectedDate
          : record.date.startsWith(selectedMonth);

      // Status filter
      const statusMatch =
        filterStatus === "all" || record.status === filterStatus;

      return dateMatch && statusMatch;
    });
  }, [selectedDate, selectedMonth, filterStatus, viewType]);

  // Calculate monthly statistics and group by date
  const monthlyData = useMemo(() => {
    if (viewType !== "monthly") return null;

    const monthlyRecords = mockAttendanceData.filter((record) =>
      record.date.startsWith(selectedMonth)
    );

    // Group by date
    const dateGroups = monthlyRecords.reduce((acc, record) => {
      if (!acc[record.date]) {
        acc[record.date] = [];
      }
      acc[record.date].push(record);
      return acc;
    }, {});

    // Calculate daily breakdown with full employee data
    const dailyBreakdown = Object.entries(dateGroups)
      .map(([date, records]) => {
        const filteredByStatus =
          filterStatus === "all"
            ? records
            : records.filter((r) => r.status === filterStatus);

        return {
          date,
          records: filteredByStatus,
          total: records.length,
          present: records.filter((r) => r.status === "present").length,
          late: records.filter((r) => r.status === "late").length,
          absent: records.filter((r) => r.status === "absent").length,
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending

    const stats = {
      totalDays: Object.keys(dateGroups).length,
      totalPresent: monthlyRecords.filter((r) => r.status === "present").length,
      totalAbsent: monthlyRecords.filter((r) => r.status === "absent").length,
      totalLate: monthlyRecords.filter((r) => r.status === "late").length,
      dailyBreakdown,
    };

    return stats;
  }, [selectedMonth, viewType, filterStatus]);

  return (
    <div className="space-y-6">
      <AttendanceFilters
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filteredRecords={filteredRecords}
        viewType={viewType}
        setViewType={setViewType}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        monthlyStats={monthlyData}
      />

      {viewType === "daily" ? (
        <AttendanceTable
          selectedDate={selectedDate}
          filteredRecords={filteredRecords}
          viewType={viewType}
        />
      ) : (
        <MonthlyAttendanceView
          monthlyData={monthlyData}
          selectedMonth={selectedMonth}
        />
      )}
    </div>
  );
};

export default ManageTab;
