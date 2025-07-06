import React, { useState } from "react";
import InterviewList from "../components/InterviewList";
import CandidateList from "../components/CandidateList";
import InterviewCreateModal from "../components/InterviewCreateModal";
import AssignCandidateModal from "../components/AssignCandidateModal";
import CandidateDetailModal from "../components/CandidateDetailModal";
import { Calendar, Users, Plus } from "lucide-react";

const RecruitmentPage = () => {
  // Dữ liệu mẫu cho lịch phỏng vấn
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      date: "2025-06-25",
      time: "09:00",
      position: "Frontend Developer",
      lead: "Nguyễn Văn A",
      department: "IT",
      location: "Phòng họp A1",
      maxCandidates: 3,
      status: "scheduled",
      candidateIds: [1, 2],
      description: "Phỏng vấn kỹ thuật cho vị trí Frontend Developer",
    },
    {
      id: 2,
      date: "2025-06-26",
      time: "14:00",
      position: "Backend Developer",
      lead: "Trần Thị B",
      department: "IT",
      location: "Phòng họp B2",
      maxCandidates: 2,
      status: "scheduled",
      candidateIds: [],
      description: "Phỏng vấn kỹ thuật Backend và thiết kế hệ thống",
    },
    {
      id: 3,
      date: "2025-06-27",
      time: "10:30",
      position: "UI/UX Designer",
      lead: "Lê Văn C",
      department: "Design",
      location: "Studio Design",
      maxCandidates: 4,
      status: "scheduled",
      candidateIds: [3],
      description: "Phỏng vấn thiết kế và thuyết trình portfolio",
    },
    {
      id: 4,
      date: "2025-06-28",
      time: "15:30",
      position: "Marketing Manager",
      lead: "Phạm Thị D",
      department: "Marketing",
      location: "Phòng họp C3",
      maxCandidates: 2,
      status: "scheduled",
      candidateIds: [],
      description: "Phỏng vấn chiến lược marketing và quản lý team",
    },
  ]);

  // Dữ liệu mẫu cho ứng viên
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Nguyễn Minh Tuấn",
      email: "tuan.nguyen@email.com",
      phone: "0123456789",
      position: "Frontend Developer",
      experience: "junior",
      status: "scheduled",
      appliedDate: "2025-06-20",
      cv: "tuan_nguyen_cv.pdf",
      skills: ["React", "JavaScript", "HTML/CSS", "TypeScript"],
      education: "Đại học Bách Khoa",
      expectedSalary: "15-18 triệu",
      location: "TP.HCM",
      rating: 4,
    },
    {
      id: 2,
      name: "Trần Thị Lan",
      email: "lan.tran@email.com",
      phone: "0987654321",
      position: "Frontend Developer",
      experience: "middle",
      status: "scheduled",
      appliedDate: "2025-06-21",
      cv: "lan_tran_cv.pdf",
      skills: ["Vue.js", "React", "Node.js", "MongoDB"],
      education: "Đại học Công Nghệ",
      expectedSalary: "20-25 triệu",
      location: "TP.HCM",
      rating: 5,
    },
    {
      id: 3,
      name: "Lê Hoàng Nam",
      email: "nam.le@email.com",
      phone: "0369852147",
      position: "UI/UX Designer",
      experience: "senior",
      status: "scheduled",
      appliedDate: "2025-06-19",
      cv: "nam_le_cv.pdf",
      skills: ["Figma", "Adobe XD", "Photoshop", "User Research"],
      education: "Đại học Mỹ Thuật",
      expectedSalary: "25-30 triệu",
      location: "TP.HCM",
      rating: 5,
    },
    {
      id: 4,
      name: "Phạm Thị Hương",
      email: "huong.pham@email.com",
      phone: "0258741369",
      position: "Marketing Manager",
      experience: "middle",
      status: "pending",
      appliedDate: "2025-06-22",
      cv: "huong_pham_cv.pdf",
      skills: ["Digital Marketing", "SEO/SEM", "Analytics", "Team Management"],
      education: "Đại học Kinh Tế",
      expectedSalary: "22-28 triệu",
      location: "TP.HCM",
      rating: 4,
    },
    {
      id: 5,
      name: "Võ Minh Khoa",
      email: "khoa.vo@email.com",
      phone: "0147852369",
      position: "Backend Developer",
      experience: "senior",
      status: "pending",
      appliedDate: "2025-06-23",
      cv: "khoa_vo_cv.pdf",
      skills: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
      education: "Đại học Bách Khoa",
      expectedSalary: "28-35 triệu",
      location: "TP.HCM",
      rating: 5,
    },
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeTab, setActiveTab] = useState("interviews");
  const [newInterview, setNewInterview] = useState({
    date: "",
    time: "",
    position: "",
    lead: "",
    department: "",
    location: "",
    maxCandidates: 2,
    description: "",
  });

  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "Marketing Manager",
    "Product Manager",
  ];
  const departments = ["IT", "Design", "Marketing", "Product"];
  const leads = [
    "Nguyễn Văn A",
    "Trần Thị B",
    "Lê Văn C",
    "Phạm Thị D",
    "Hoàng Văn E",
  ];

  // Các hàm xử lý (giữ nguyên như file gốc)
  const createInterview = () => {
    const interview = {
      id: interviews.length + 1,
      ...newInterview,
      candidateIds: [],
      status: "scheduled",
    };
    setInterviews((prev) => [...prev, interview]);
    setNewInterview({
      date: "",
      time: "",
      position: "",
      lead: "",
      department: "",
      location: "",
      maxCandidates: 2,
      description: "",
    });
    setShowCreateModal(false);
    alert("Đã tạo buổi phỏng vấn mới thành công!");
  };

  const assignCandidateToInterview = (candidateId, interviewId) => {
    const candidate = candidates.find((c) => c.id === candidateId);
    const interview = interviews.find((i) => i.id === interviewId);
    if (interview.candidateIds.length >= interview.maxCandidates) {
      alert("Buổi phỏng vấn này đã đủ số lượng ứng viên!");
      return;
    }
    setInterviews((prev) =>
      prev.map((i) =>
        i.id === interviewId
          ? { ...i, candidateIds: [...i.candidateIds, candidateId] }
          : i
      )
    );
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId ? { ...c, status: "scheduled" } : c
      )
    );
    alert(
      `Đã phân công ${candidate.name} vào buổi phỏng vấn!\n\nThông tin:\n- Vị trí: ${interview.position}\n- Thời gian: ${interview.date} lúc ${interview.time}\n- Địa điểm: ${interview.location}\n- Người phỏng vấn: ${interview.lead}`
    );
    setShowAssignModal(false);
    setSelectedCandidate(null);
  };

  const rejectCandidate = (candidateId) => {
    const candidate = candidates.find((c) => c.id === candidateId);
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: "rejected" } : c))
    );
    alert(`Đã gửi email từ chối đến ${candidate.name}`);
  };

  // Các hàm helper
  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "assigned":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const getStatusText = (status) => {
    switch (status) {
      case "scheduled":
        return "Đã lên lịch";
      case "assigned":
        return "Đã phân công";
      case "pending":
        return "Chờ xử lý";
      case "rejected":
        return "Đã từ chối";
      default:
        return status;
    }
  };
  const getExperienceColor = (experience) => {
    switch (experience) {
      case "junior":
        return "bg-blue-100 text-blue-800";
      case "middle":
        return "bg-purple-100 text-purple-800";
      case "senior":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <polygon points="9.9,1.1 7.6,6.6 1.6,7.6 6,11.7 4.8,17.6 9.9,14.6 15,17.6 13.8,11.7 18.2,7.6 12.2,6.6 " />
      </svg>
    ));
  };

  // Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header - Phần mới */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                <Users className="w-6 h-6 md:w-8 md:h-8 inline-block mr-2 text-blue-600" />
                Hệ Thống Quản Lý Tuyển Dụng
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Quản lý hiệu quả lịch phỏng vấn và ứng viên
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Cập nhật: {new Date().toLocaleString("vi-VN")}</span>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 trchonjansition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                <span className="hidden md:inline">Tạo buổi phỏng vấn </span>
                <span className="md:hidden">Tạo PV</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
          <button
            onClick={() => setActiveTab("interviews")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "interviews"
                ? "bg-white text-blue-600 shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Calendar className="w-5 h-5 inline mr-2" />
            Lịch Phỏng Vấn
          </button>
          <button
            onClick={() => setActiveTab("candidates")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "candidates"
                ? "bg-white text-blue-600 shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            Ứng Viên
          </button>
        </div>
        {/* Danh sách phỏng vấn */}
        {activeTab === "interviews" && (
          <InterviewList
            interviews={interviews}
            candidates={candidates}
            renderStars={renderStars}
            getExperienceColor={getExperienceColor}
            onShowDetail={(candidate) => {
              setSelectedCandidate(candidate);
              setShowDetailModal(true);
            }}
          />
        )}
        {/* Danh sách ứng viên */}
        {activeTab === "candidates" && (
          <CandidateList
            candidates={candidates}
            renderStars={renderStars}
            getExperienceColor={getExperienceColor}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
            onShowDetail={(candidate) => {
              setSelectedCandidate(candidate);
              setShowDetailModal(true);
            }}
            onShowAssign={(candidate) => {
              setSelectedCandidate(candidate);
              setShowAssignModal(true);
            }}
            onReject={rejectCandidate}
          />
        )}
        {/* Modal tạo buổi phỏng vấn */}
        <InterviewCreateModal
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={createInterview}
          newInterview={newInterview}
          setNewInterview={setNewInterview}
          positions={positions}
          departments={departments}
          leads={leads}
        />
        {/* Modal phân công ứng viên */}
        <AssignCandidateModal
          show={showAssignModal}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedCandidate(null);
          }}
          selectedCandidate={selectedCandidate}
          interviews={interviews}
          assignCandidateToInterview={assignCandidateToInterview}
        />
        {/* Modal chi tiết ứng viên */}
        <CandidateDetailModal
          show={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedCandidate(null);
          }}
          selectedCandidate={selectedCandidate}
          getExperienceColor={getExperienceColor}
          renderStars={renderStars}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
          onAssign={() => {
            setShowDetailModal(false);
            setShowAssignModal(true);
          }}
          onReject={rejectCandidate}
          onSendMail={() => {
            if (selectedCandidate)
              alert(`Đã gửi email đến ${selectedCandidate.email}`);
          }}
        />
      </div>
    </div>
  );
};

export default RecruitmentPage;
