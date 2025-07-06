import ExportButton from "../../../components/common/ExportButton";

const AttendanceFilters = ({
  selectedDate,
  setSelectedDate,
  filterStatus,
  setFilterStatus,
  filteredRecords,
  viewType,
  setViewType,
  selectedMonth,
  setSelectedMonth,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex flex-wrap gap-4 items-center mb-4">
        {/* View Type Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loại xem
          </label>
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Theo ngày</option>
            <option value="monthly">Theo tháng</option>
          </select>
        </div>

        {/* Date/Month Filter */}
        {viewType === "daily" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tháng
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trạng thái
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả</option>
            <option value="present">Có mặt</option>
            <option value="late">Đi muộn</option>
            <option value="absent">Vắng mặt</option>
          </select>
        </div>

        {/* Export Excel Button */}
        <div className="mt-7">
          <ExportButton
            data={filteredRecords.map((record) => ({
              "Mã NV": record.employeeId,
              "Tên nhân viên": record.employeeName,
              Ngày: record.date,
              "Giờ vào": record.checkIn || "-",
              "Giờ ra": record.checkOut || "-",
              "Số giờ": record.workHours,
              "Trạng thái":
                record.status === "present"
                  ? "Có mặt"
                  : record.status === "late"
                  ? "Đi muộn"
                  : "Vắng mặt",
            }))}
            fileName={`bang_cham_cong_${
              viewType === "daily" ? selectedDate : selectedMonth
            }.xlsx`}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilters;
