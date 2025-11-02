import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
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
    // Data untuk statistik cards
    const statCards = [
        {
            title: "Total DPD",
            value: statistics.total_dpd,
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
            color: "bg-blue-500",
        },
        {
            title: "Total DPC",
            value: statistics.total_dpc,
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
            color: "bg-green-500",
        },
        {
            title: "Total Kader",
            value: statistics.total_kader,
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
            color: "bg-purple-500",
        },
        {
            title: "Total Admin",
            value: statistics.total_admin,
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
            color: "bg-orange-500",
        },
    ];

    // Data untuk status kader
    const kaderStatusData = [
        { name: "Aktif", value: statistics.kader_aktif },
        { name: "Non Aktif", value: statistics.kader_non_aktif },
    ];

    // Data untuk status admin
    const adminStatusData = [
        { name: "Aktif", value: statistics.admin_aktif },
        { name: "Non Aktif", value: statistics.admin_non_aktif },
    ];

    // Warna untuk pie charts
    const COLORS = ["#10B981", "#EF4444", "#3B82F6", "#8B5CF6", "#F59E0B"];

    // Format tooltip untuk charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-gray-600">
                        {payload[0].name}: {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard Super Admin DPW
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Selamat Datang, {auth.user.name}!
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Overview lengkap sistem manajemen kader Nasdem Aceh
                        </p>
                    </div>

                    {/* Statistik Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statCards.map((card, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            {card.title}
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">
                                            {card.value}
                                        </p>
                                    </div>
                                    <div
                                        className={`p-3 rounded-full ${card.color} text-white`}
                                    >
                                        {card.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Bar Chart - 5 DPD dengan Kader Terbanyak */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                5 DPD dengan Kader Terbanyak
                            </h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={charts.top_dpd}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="nama_dpd"
                                            angle={-45}
                                            textAnchor="end"
                                            height={80}
                                            interval={0}
                                            fontSize={12}
                                        />
                                        <YAxis />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend />
                                        <Bar
                                            dataKey="total_kader"
                                            name="Jumlah Kader"
                                            fill="#3B82F6"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Pie Charts Row */}
                        <div className="space-y-6">
                            {/* Status Kader */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Status Kader
                                </h3>
                                <div className="h-40">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>
                                            <Pie
                                                data={kaderStatusData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) =>
                                                    `${name} (${(
                                                        percent * 100
                                                    ).toFixed(0)}%)`
                                                }
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {kaderStatusData.map(
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
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Status Admin */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Status Admin
                                </h3>
                                <div className="h-40">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>
                                            <Pie
                                                data={adminStatusData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) =>
                                                    `${name} (${(
                                                        percent * 100
                                                    ).toFixed(0)}%)`
                                                }
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {adminStatusData.map(
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
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Gender Distribution */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Distribusi Gender Kader
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Laki-laki
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        {summary.kader_by_gender.laki_laki}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Perempuan
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        {summary.kader_by_gender.perempuan}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Jabatan Distribution */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Distribusi Jabatan
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Anggota Biasa
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        {summary.kader_by_role.anggota_biasa}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Jabatan Struktural
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        {
                                            summary.kader_by_role
                                                .jabatan_struktural
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Statistik Cepat
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Kader Aktif
                                    </span>
                                    <span className="font-semibold text-green-600">
                                        {statistics.kader_aktif}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Admin Aktif
                                    </span>
                                    <span className="font-semibold text-green-600">
                                        {statistics.admin_aktif}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Rasio Kader/DPD
                                    </span>
                                    <span className="font-semibold text-blue-600">
                                        {statistics.total_dpd > 0
                                            ? Math.round(
                                                  statistics.total_kader /
                                                      statistics.total_dpd
                                              )
                                            : 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Kaders */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Kader Terbaru
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recent_activities.kaders.map((kader) => (
                                        <div
                                            key={kader.id}
                                            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {kader.nama_lengkap}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {kader.dpc?.dpd?.nama_dpd ||
                                                        "Belum terdaftar"}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        kader.status_keanggotaan ===
                                                        "Aktif"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {kader.status_keanggotaan}
                                                </span>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(
                                                        kader.created_at
                                                    ).toLocaleDateString(
                                                        "id-ID"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Admins */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Admin Terbaru
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recent_activities.admins.map((admin) => (
                                        <div
                                            key={admin.id}
                                            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {admin.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {admin.email}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        admin.role === "DPW"
                                                            ? "bg-purple-100 text-purple-800"
                                                            : admin.role ===
                                                              "Admin DPD"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-green-100 text-green-800"
                                                    }`}
                                                >
                                                    {admin.role}
                                                </span>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(
                                                        admin.created_at
                                                    ).toLocaleDateString(
                                                        "id-ID"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
