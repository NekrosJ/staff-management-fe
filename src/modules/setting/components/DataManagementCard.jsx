import React, { useState } from "react";
import {
  Database,
  Download,
  RefreshCw,
  Trash2,
  FileText,
  Users,
  Clock,
  DollarSign,
  Calendar,
  Star,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { DATA_EXPORT_OPTIONS } from "../../../constants/settingOptions";
import { useDataManagement } from "../../../hooks/useSettingsForm";

const DataManagementCard = () => {
  const {
    dataStats,
    loading,
    exporting,
    resetting,
    handleExportData,
    handleResetDemoData,
  } = useDataManagement();

  const [selectedExportType, setSelectedExportType] = useState("employees");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const getIconForDataType = (iconName) => {
    const iconMap = {
      users: Users,
      clock: Clock,
      "dollar-sign": DollarSign,
      calendar: Calendar,
      star: Star,
      "file-text": FileText,
    };
    return iconMap[iconName] || FileText;
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  const formatCurrency = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  const handleExport = async () => {
    const success = await handleExportData(selectedExportType);
    if (success) {
      alert("Dữ liệu đã được xuất thành công!");
    } else {
      alert("Có lỗi xảy ra khi xuất dữ liệu");
    }
  };

  const handleReset = async () => {
    setShowResetConfirm(false);
    const success = await handleResetDemoData();
    if (success) {
      alert("Dữ liệu demo đã được reset thành công!");
    } else {
      alert("Có lỗi xảy ra khi reset dữ liệu demo");
    }
  };

  // Cấu hình cho các card thống kê
  const statsConfig = [
    {
      key: "totalEmployees",
      label: "Nhân viên",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      key: "totalAttendance",
      label: "Chấm công",
      icon: Clock,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      key: "totalSalary",
      label: "Tổng lương",
      icon: DollarSign,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      key: "totalLeave",
      label: "Nghỉ phép",
      icon: Calendar,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      key: "totalDocuments",
      label: "Tài liệu",
      icon: FileText,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Đang tải thống kê dữ liệu...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            Quản lý dữ liệu
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Xuất dữ liệu và quản lý hệ thống
          </p>
        </div>
      </div>

      {/* Data Statistics - Card vuông nhỏ, căn lề thẳng với header */}
      <div className="px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {statsConfig.map((stat) => {
            const Icon = stat.icon;
            const value =
              stat.key === "totalSalary"
                ? formatCurrency(dataStats[stat.key]) + "đ"
                : formatNumber(dataStats[stat.key]);
            return (
              <div
                key={stat.key}
                className="flex flex-col items-center justify-center bg-white w-32 h-32 sm:w-36 sm:h-36 rounded-xl border border-gray-200 shadow group hover:shadow-lg transition-all"
              >
                <div
                  className={`mb-2 p-3 ${stat.iconBg} rounded-full flex items-center justify-center`}
                >
                  <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-700 font-semibold">
                    {stat.label}
                  </p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Export Data */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-600" />
            Xuất dữ liệu
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Loại dữ liệu
              </label>
              <select
                value={selectedExportType}
                onChange={(e) => setSelectedExportType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {DATA_EXPORT_OPTIONS.map((option) => {
                  const IconComponent = getIconForDataType(option.icon);
                  return (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {DATA_EXPORT_OPTIONS.map((option) => {
                const IconComponent = getIconForDataType(option.icon);
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedExportType(option.id)}
                    className={`flex items-center gap-2 p-4 rounded-lg border transition-colors ${
                      selectedExportType === option.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm">{option.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleExport}
              disabled={exporting}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {exporting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Download className="w-4 h-4" />
              )}
              {exporting ? "Đang xuất..." : "Xuất dữ liệu"}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Dữ liệu sẽ được xuất dưới định dạng CSV
            </p>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            Quản lý dữ liệu
          </h3>

          <div className="space-y-6">
            {/* Backup Data */}
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-3">
                Sao lưu dữ liệu
              </h4>
              <p className="text-xs text-blue-700 mb-4">
                Tạo bản sao lưu toàn bộ dữ liệu hệ thống
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Tạo backup
              </button>
            </div>

            {/* Restore Data */}
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-sm font-medium text-green-900 mb-3">
                Khôi phục dữ liệu
              </h4>
              <p className="text-xs text-green-700 mb-4">
                Khôi phục dữ liệu từ file backup
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Khôi phục
              </button>
            </div>

            {/* Reset Demo Data */}
            <div className="p-6 bg-red-50 rounded-lg border border-red-200">
              <h4 className="text-sm font-medium text-red-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Reset dữ liệu demo
              </h4>
              <p className="text-xs text-red-700 mb-4">
                Xóa toàn bộ dữ liệu demo và khôi phục về trạng thái ban đầu
              </p>
              <button
                onClick={() => setShowResetConfirm(true)}
                disabled={resetting}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {resetting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                {resetting ? "Đang reset..." : "Reset dữ liệu demo"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Xác nhận reset
                </h3>
                <p className="text-sm text-gray-600">
                  Hành động này không thể hoàn tác
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm text-gray-700 mb-4">
                Bạn có chắc chắn muốn reset toàn bộ dữ liệu demo? Hành động này
                sẽ:
              </p>
              <ul className="text-sm text-gray-600 space-y-2 ml-4">
                <li>• Xóa tất cả nhân viên demo</li>
                <li>• Xóa tất cả dữ liệu chấm công</li>
                <li>• Xóa tất cả bảng lương</li>
                <li>• Xóa tất cả tài liệu</li>
                <li>• Khôi phục cài đặt về mặc định</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Xác nhận reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">
              Lưu ý về quản lý dữ liệu
            </h4>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>
                • Luôn tạo backup trước khi thực hiện các thao tác quan trọng
              </li>
              <li>• Dữ liệu xuất sẽ bao gồm tất cả thông tin hiện tại</li>
              <li>
                • Reset demo sẽ xóa toàn bộ dữ liệu và không thể khôi phục
              </li>
              <li>• Chỉ admin mới có quyền reset dữ liệu demo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagementCard;
