// components/MonthlyAttendanceView.jsx
import { useState } from "react";

const MonthlyAttendanceView = ({ monthlyData, selectedMonth }) => {
  const [expandedDates, setExpandedDates] = useState(new Set());

  const toggleDate = (date) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "absent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "present":
        return "Có mặt";
      case "late":
        return "Đi muộn";
      case "absent":
        return "Vắng mặt";
      default:
        return "Không xác định";
    }
  };

  if (!monthlyData || monthlyData.dailyBreakdown.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="text-center py-8">
          <p className="text-gray-500">
            Không có dữ liệu chấm công cho tháng này
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Báo cáo chấm công tháng {selectedMonth}
        </h2>

        {/* Monthly Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">
              {monthlyData.totalDays}
            </div>
            <div className="text-sm text-blue-800">Ngày có chấm công</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {monthlyData.totalPresent}
            </div>
            <div className="text-sm text-green-800">Lượt có mặt</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {monthlyData.totalLate}
            </div>
            <div className="text-sm text-yellow-800">Lượt đi muộn</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">
              {monthlyData.totalAbsent}
            </div>
            <div className="text-sm text-red-800">Lượt vắng mặt</div>
          </div>
        </div>
      </div>

      {/* Daily Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Chi tiết từng ngày:
        </h3>

        {monthlyData.dailyBreakdown.map((day) => (
          <div
            key={day.date}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Date Header */}
            <div
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                day.date === new Date().toISOString().split("T")[0]
                  ? "bg-blue-50 border-l-4 border-blue-400"
                  : "bg-white"
              }`}
              onClick={() => toggleDate(day.date)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-800">
                    {new Date(day.date).toLocaleDateString("vi-VN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h4>
                  {day.date === new Date().toISOString().split("T")[0] && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Hôm nay
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-3 text-sm">
                    <span className="text-green-600">
                      Có mặt: {day.present}
                    </span>
                    <span className="text-yellow-600">Muộn: {day.late}</span>
                    <span className="text-red-600">Vắng: {day.absent}</span>
                  </div>
                  <div className="text-gray-400">
                    {expandedDates.has(day.date) ? "▼" : "▶"}
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Details */}
            {expandedDates.has(day.date) && (
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                {day.records.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3">Mã NV</th>
                          <th className="text-left py-2 px-3">Tên nhân viên</th>
                          <th className="text-left py-2 px-3">Giờ vào</th>
                          <th className="text-left py-2 px-3">Giờ ra</th>
                          <th className="text-left py-2 px-3">Số giờ</th>
                          <th className="text-left py-2 px-3">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {day.records.map((record) => (
                          <tr
                            key={record.id}
                            className="border-b border-gray-100"
                          >
                            <td className="py-2 px-3 font-medium">
                              {record.employeeId}
                            </td>
                            <td className="py-2 px-3">{record.employeeName}</td>
                            <td className="py-2 px-3">
                              {record.checkIn || "-"}
                            </td>
                            <td className="py-2 px-3">
                              {record.checkOut || "-"}
                            </td>
                            <td className="py-2 px-3">{record.workHours}h</td>
                            <td className="py-2 px-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                  record.status
                                )}`}
                              >
                                {getStatusText(record.status)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Không có nhân viên nào phù hợp với bộ lọc đã chọn
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyAttendanceView;
