import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function Dashboard({
    auth,
    statistics,
    charts,
    recent_activities,
    summary,
}) {
    // Data untuk statistik cards dengan persentase dan trend
    const statCards = [
        {
            title: "Total DPD",
            value: statistics.total_dpd,
            subtitle: "Dewan Pimpinan Daerah",
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
            color: "bg-gradient-to-br from-blue-500 to-blue-600",
            bgLight: "bg-blue-50",
        },
        {
            title: "Total DPC",
            value: statistics.total_dpc,
            subtitle: "Dewan Pimpinan Cabang",
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                </svg>
            ),
            color: "bg-gradient-to-br from-green-500 to-green-600",
            bgLight: "bg-green-50",
        },
        {
            title: "Total Kader",
            value: statistics.total_kader,
            subtitle: `${statistics.kader_aktif} Aktif`,
            percentage:
                statistics.total_kader > 0
                    ? (
                          (statistics.kader_aktif / statistics.total_kader) *
                          100
                      ).toFixed(1)
                    : 0,
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                </svg>
            ),
            color: "bg-gradient-to-br from-purple-500 to-purple-600",
            bgLight: "bg-purple-50",
        },
        {
            title: "Total Admin",
            value: statistics.total_admin,
            subtitle: `${statistics.admin_aktif} Aktif`,
            percentage:
                statistics.total_admin > 0
                    ? (
                          (statistics.admin_aktif / statistics.total_admin) *
                          100
                      ).toFixed(1)
                    : 0,
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>
            ),
            color: "bg-gradient-to-br from-orange-500 to-orange-600",
            bgLight: "bg-orange-50",
        },
    ];

    // Data untuk status kader dengan detail
    const kaderStatusData = [
        { name: "Aktif", value: statistics.kader_aktif, color: "#10B981" },
        {
            name: "Non Aktif",
            value: statistics.kader_non_aktif,
            color: "#EF4444",
        },
    ];

    // Data untuk status admin
    const adminStatusData = [
        { name: "Aktif", value: statistics.admin_aktif, color: "#10B981" },
        {
            name: "Non Aktif",
            value: statistics.admin_non_aktif,
            color: "#EF4444",
        },
    ];

    // Data untuk distribusi gender dengan persentase
    const genderData = [
        {
            name: "Laki-laki",
            value: summary.kader_by_gender.laki_laki,
            color: "#3B82F6",
        },
        {
            name: "Perempuan",
            value: summary.kader_by_gender.perempuan,
            color: "#EC4899",
        },
    ];

    // Data untuk distribusi jabatan
    const jabatanData = [
        {
            name: "Anggota Biasa",
            value: summary.kader_by_role.anggota_biasa,
            color: "#8B5CF6",
        },
        {
            name: "Jabatan Struktural",
            value: summary.kader_by_role.jabatan_struktural,
            color: "#F59E0B",
        },
    ];

    const COLORS = ["#10B981", "#EF4444", "#3B82F6", "#8B5CF6", "#F59E0B"];

    // Custom Tooltip yang lebih informatif
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl">
                    <p className="font-semibold text-gray-900">{label}</p>
                    {payload.map((entry, index) => (
                        <p
                            key={index}
                            className="text-sm"
                            style={{ color: entry.color }}
                        >
                            {entry.name}:{" "}
                            <span className="font-bold">{entry.value}</span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Custom Label untuk Pie Chart
    const renderCustomLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        name,
        value,
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                className="font-semibold text-xs"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard Super Admin DPW
                    </h2>
                    <div className="text-sm text-gray-600">
                        {new Date().toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Section dengan Summary */}
                    <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold">
                                    Selamat Datang, {auth.user.name}!
                                </h1>
                                <p className="mt-2 text-blue-100">
                                    Overview lengkap sistem manajemen kader
                                    Nasdem Aceh
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Statistik Cards dengan Enhancement */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statCards.map((card, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className={`h-2 ${card.color}`}></div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                {card.title}
                                            </p>
                                            <p className="text-4xl font-bold text-gray-900 mt-2">
                                                {card.value}
                                            </p>
                                            <div className="mt-3 flex items-center space-x-2">
                                                <span className="text-xs text-gray-600">
                                                    {card.subtitle}
                                                </span>
                                                {card.percentage && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                        {card.percentage}% Aktif
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`p-4 rounded-xl ${card.color} text-white shadow-lg`}
                                        >
                                            {card.icon}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Charts Section - Redesigned */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Bar Chart - DPD dengan Kader Terbanyak - Takes 2 columns */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        DPD dengan Kader Terbanyak
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Top 5 DPD berdasarkan jumlah kader
                                    </p>
                                </div>
                                <div className="bg-blue-50 rounded-lg px-4 py-2">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {charts.top_dpd?.length || 0}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        DPD
                                    </div>
                                </div>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={charts.top_dpd}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 60,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#f0f0f0"
                                        />
                                        <XAxis
                                            dataKey="nama_dpd"
                                            angle={-45}
                                            textAnchor="end"
                                            height={100}
                                            interval={0}
                                            fontSize={11}
                                            stroke="#6b7280"
                                        />
                                        <YAxis stroke="#6b7280" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar
                                            dataKey="total_kader"
                                            name="Jumlah Kader"
                                            fill="url(#colorGradient)"
                                            radius={[8, 8, 0, 0]}
                                        >
                                            {charts.top_dpd?.map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={
                                                            COLORS[
                                                                index %
                                                                    COLORS.length
                                                            ]
                                                        }
                                                    />
                                                )
                                            )}
                                        </Bar>
                                        <defs>
                                            <linearGradient
                                                id="colorGradient"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor="#3B82F6"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#3B82F6"
                                                    stopOpacity={0.4}
                                                />
                                            </linearGradient>
                                        </defs>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Status Overview - Compact Cards */}
                        <div className="space-y-6">
                            {/* Status Kader Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Status Kader
                                </h3>
                                <div className="space-y-3">
                                    {kaderStatusData.map((item, index) => {
                                        const total =
                                            statistics.kader_aktif +
                                            statistics.kader_non_aktif;
                                        const percentage =
                                            total > 0
                                                ? (
                                                      (item.value / total) *
                                                      100
                                                  ).toFixed(1)
                                                : 0;
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                item.color,
                                                        }}
                                                    ></div>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {item.name}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {item.value}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {percentage}%
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-semibold text-gray-900">
                                            Total Kader
                                        </span>
                                        <span className="font-bold text-gray-900">
                                            {statistics.total_kader}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Admin Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Status Admin
                                </h3>
                                <div className="space-y-3">
                                    {adminStatusData.map((item, index) => {
                                        const total =
                                            statistics.admin_aktif +
                                            statistics.admin_non_aktif;
                                        const percentage =
                                            total > 0
                                                ? (
                                                      (item.value / total) *
                                                      100
                                                  ).toFixed(1)
                                                : 0;
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                item.color,
                                                        }}
                                                    ></div>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {item.name}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {item.value}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {percentage}%
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-semibold text-gray-900">
                                            Total Admin
                                        </span>
                                        <span className="font-bold text-gray-900">
                                            {statistics.total_admin}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Distribusi Detail Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Gender Distribution dengan Pie Chart */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">
                                Distribusi Gender
                            </h3>
                            <div className="h-56">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={genderData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={renderCustomLabel}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {genderData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.color}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 space-y-2">
                                {genderData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{
                                                    backgroundColor: item.color,
                                                }}
                                            ></div>
                                            <span className="text-gray-700">
                                                {item.name}
                                            </span>
                                        </div>
                                        <span className="font-semibold text-gray-900">
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Jabatan Distribution dengan Pie Chart */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">
                                Distribusi Jabatan
                            </h3>
                            <div className="h-56">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={jabatanData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={renderCustomLabel}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {jabatanData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.color}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 space-y-2">
                                {jabatanData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{
                                                    backgroundColor: item.color,
                                                }}
                                            ></div>
                                            <span className="text-gray-700">
                                                {item.name}
                                            </span>
                                        </div>
                                        <span className="font-semibold text-gray-900">
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Key Metrics Card */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                            <h3 className="text-lg font-bold mb-6">
                                Metrik Penting
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-white/90">
                                            Rasio Kader/DPD
                                        </span>
                                        <div className="text-2xl font-bold">
                                            {statistics.total_dpd > 0
                                                ? Math.round(
                                                      statistics.total_kader /
                                                          statistics.total_dpd
                                                  )
                                                : 0}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-white/90">
                                            Tingkat Aktivitas
                                        </span>
                                        <div className="text-2xl font-bold">
                                            {statistics.total_kader > 0
                                                ? (
                                                      (statistics.kader_aktif /
                                                          statistics.total_kader) *
                                                      100
                                                  ).toFixed(0)
                                                : 0}
                                            %
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-white/90">
                                            Ratio Struktural
                                        </span>
                                        <div className="text-2xl font-bold">
                                            {statistics.total_kader > 0
                                                ? (
                                                      (summary.kader_by_role
                                                          .jabatan_struktural /
                                                          statistics.total_kader) *
                                                      100
                                                  ).toFixed(0)
                                                : 0}
                                            %
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activities dengan Design Baru */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Kaders */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-white">
                                        Kader Terbaru
                                    </h3>
                                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white font-medium">
                                        {recent_activities.kaders?.length || 0}{" "}
                                        Kader
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recent_activities.kaders?.map(
                                        (kader, index) => (
                                            <div
                                                key={kader.id}
                                                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                                            >
                                                <div className="flex-shrink-0">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                                        {kader.nama_lengkap
                                                            ?.charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-900 truncate">
                                                        {kader.nama_lengkap}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {kader.dpc?.dpd
                                                            ?.nama_dpd ||
                                                            "Belum terdaftar"}
                                                    </p>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        <span
                                                            className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                                                                kader.status_keanggotaan ===
                                                                "Aktif"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-gray-100 text-gray-800"
                                                            }`}
                                                        >
                                                            {
                                                                kader.status_keanggotaan
                                                            }
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(
                                                                kader.created_at
                                                            ).toLocaleDateString(
                                                                "id-ID"
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Recent Admins */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-white">
                                        Admin Terbaru
                                    </h3>
                                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white font-medium">
                                        {recent_activities.admins?.length || 0}{" "}
                                        Admin
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recent_activities.admins?.map(
                                        (admin, index) => (
                                            <div
                                                key={admin.id}
                                                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                                            >
                                                <div className="flex-shrink-0">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                                                        {admin.name
                                                            ?.charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-900 truncate">
                                                        {admin.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1 truncate">
                                                        {admin.email}
                                                    </p>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        <span
                                                            className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                                                                admin.role ===
                                                                "DPW"
                                                                    ? "bg-purple-100 text-purple-800"
                                                                    : admin.role ===
                                                                      "Admin DPD"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : "bg-green-100 text-green-800"
                                                            }`}
                                                        >
                                                            {admin.role}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(
                                                                admin.created_at
                                                            ).toLocaleDateString(
                                                                "id-ID"
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
