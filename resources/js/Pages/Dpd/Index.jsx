import { Head, Link } from "@inertiajs/react";
import { useMemo } from "react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

// Terima props 'dpds' dan 'auth' dari DpdController
export default function Index({ auth, dpds }) {
    // --- INI PERUBAHAN 1: Kita hitung SEMUA statistik ---
    const { activeCount, inactiveCount, totalDpcs, totalKaders, totalAdmins } =
        useMemo(() => {
            const active = dpds.filter((d) => d.status === "active").length;
            const inactive = dpds.length - active;
            const dpcs = dpds.reduce(
                (sum, dpd) => sum + (dpd.dpcs_count || 0),
                0
            );
            const kaders = dpds.reduce(
                (sum, dpd) => sum + (dpd.kaders_count || 0),
                0
            );
            const admins = dpds.reduce(
                (sum, dpd) => sum + (dpd.users_count || 0),
                0
            );

            return {
                activeCount: active,
                inactiveCount: inactive,
                totalDpcs: dpcs,
                totalKaders: kaders,
                totalAdmins: admins,
            };
        }, [dpds]);
    // --- BATAS PERUBAHAN 1 ---

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manajemen DPD
                </h2>
            }
        >
            <Head title="Manajemen DPD" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header dengan Statistik */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Data DPD
                                </h1>
                                <p className="mt-2 text-sm text-gray-600">
                                    Kelola data Dewan Pimpinan Daerah
                                    (Kabupaten/Kota)
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <Link
                                    href={route("dpds.create")}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Tambah DPD
                                </Link>
                            </div>
                        </div>

                        {/* --- PERUBAHAN 2: Statistik Cards jadi 6 --- */}
                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total DPD
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                        {dpds.length}
                                    </dd>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total DPC
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-green-600">
                                        {totalDpcs}
                                    </dd>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total Kader
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-blue-600">
                                        {totalKaders}
                                    </dd>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total Admin
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-purple-600">
                                        {totalAdmins}
                                    </dd>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Status Aktif
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-green-600">
                                        {activeCount}
                                    </dd>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Status Tidak Aktif
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-red-600">
                                        {inactiveCount}
                                    </dd>
                                </div>
                            </div>
                        </div>
                        {/* --- BATAS PERUBAHAN 2 --- */}
                    </div>

                    {/* Tabel yang Diimprove */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Daftar DPD
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Daftar lengkap Dewan Pimpinan Daerah
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    {/* --- PERUBAHAN 3: Tambah Kolom KETUA --- */}
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            no
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama DPD
                                        </th>
                                        {/* KETUA DITAMBAHKAN DI SINI */}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ketua
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Lokasi
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Statistik
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tanggal Dibuat
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                    {/* --- BATAS PERUBAHAN 3 --- */}
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dpds.map((dpd, index) => (
                                        <tr
                                            key={dpd.id}
                                            className="hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {index + 1}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                            <span className="text-indigo-800 font-semibold text-sm">
                                                                {dpd.nama_dpd.charAt(
                                                                    0
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {dpd.nama_dpd}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* --- PERUBAHAN 4: Isi Kolom KETUA --- */}
                                            {/* Pastikan di Controller kau ada kirim dpd.ketua */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {dpd.ketua || "Belum diisi"}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Ketua DPD
                                                </div>
                                            </td>
                                            {/* --- BATAS PERUBAHAN 4 --- */}

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {dpd.lokasi ||
                                                        "Belum diisi"}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex space-x-3">
                                                    <div className="text-center">
                                                        <div className="text-sm font-semibold text-green-600">
                                                            {dpd.dpcs_count ||
                                                                0}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            DPC
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-sm font-semibold text-blue-600">
                                                            {dpd.kaders_count ||
                                                                0}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Kader
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-sm font-semibold text-purple-600">
                                                            {dpd.users_count ||
                                                                0}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Admin
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        dpd.status === "active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {dpd.status === "active"
                                                        ? "Aktif"
                                                        : "Tidak Aktif"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(
                                                    dpd.created_at
                                                ).toLocaleDateString("id-ID")}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <Link
                                                        href={route(
                                                            "dpds.edit",
                                                            dpd.id
                                                        )}
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                                                    >
                                                        <svg
                                                            className="w-4 h-4 mr-1"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "dpds.destroy",
                                                            dpd.id
                                                        )}
                                                        method="delete"
                                                        as="button"
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                                                        onClick={(e) => {
                                                            if (
                                                                !confirm(
                                                                    "Apakah Anda yakin ingin menghapus DPD ini?"
                                                                )
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        <svg
                                                            className="w-4 h-4 mr-1"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                        Hapus
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {dpds.length === 0 && (
                                        <tr>
                                            {/* --- PERUBAHAN 5: Colspan jadi 8 (karena nambah 1 kolom) --- */}
                                            <td
                                                colSpan="8"
                                                className="px-6 py-12 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <svg
                                                        className="w-16 h-16 text-gray-400 mb-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        S
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                        Belum ada data DPD
                                                    </h3>
                                                    <p className="text-gray-500 mb-4">
                                                        Mulai dengan menambahkan
                                                        DPD pertama Anda.
                                                    </p>
                                                    <Link
                                                        href={route(
                                                            "dpds.create"
                                                        )}
                                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                    >
                                                        Tambah DPD Pertama
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination (jika ada) */}
                        {dpds.length > 0 && (
                            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Menampilkan{" "}
                                        <span className="font-medium">1</span>{" "}
                                        sampai{" "}
                                        <span className="font-medium">
                                            {dpds.length}
                                        </span>{" "}
                                        dari{" "}
                                        <span className="font-medium">
                                            {dpds.length}
                                        </span>{" "}
                                        hasil
                                    </div>
                                    {/* Tambahkan komponen pagination di sini */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
