import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
// import { useMemo } from "react"; <-- Dihapus karena tidak terpakai

// 1. KITA TAMBAHKAN 'dpcs' DI SINI BIAR GAK ERROR
export default function Index({ auth, dpcs }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manajemen DPC
                </h2>
            }
        >
            <Head title="Manajemen DPC" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header dengan Statistik */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Data DPC
                                </h1>
                                <p className="mt-2 text-sm text-gray-600">
                                    Kelola data Dewan Pimpinan Cabang
                                    (Kecamatan)
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <Link
                                    href={route("dpcs.create")}
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
                                    Tambah DPC
                                </Link>
                            </div>
                        </div>

                        {/* Statistik Cards */}
                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total DPC
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                        {/* Ini sekarang aman karena 'dpcs' sudah ada */}
                                        {dpcs.length}
                                    </dd>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Status Aktif
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-green-600">
                                        {
                                            dpcs.filter(
                                                (dpc) => dpc.status === "active"
                                            ).length
                                        }
                                    </dd>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total Kader
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-blue-600">
                                        {dpcs.reduce(
                                            (total, dpc) =>
                                                total + (dpc.kaders_count || 0),
                                            0
                                        )}
                                    </dd>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total Admin
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-purple-600">
                                        {dpcs.reduce(
                                            (total, dpc) =>
                                                total + (dpc.users_count || 0),
                                            0
                                        )}
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabel DPC */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Daftar DPC
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Daftar lengkap Dewan Pimpinan Cabang
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Nama DPC
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            DPD Induk
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Pengurus
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Statistik
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dpcs.map((dpc, index) => (
                                        <tr
                                            key={dpc.id}
                                            className="hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {index + 1}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <span className="text-blue-800 font-semibold text-sm">
                                                                {dpc.nama_dpc.charAt(
                                                                    0
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {dpc.nama_dpc}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {dpc.alamat
                                                                ? `${dpc.alamat.substring(
                                                                      0,
                                                                      30
                                                                  )}...`
                                                                : "Alamat belum diisi"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {dpc.dpd?.nama_dpd ||
                                                        "Tidak terdaftar"}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {dpc.dpd?.lokasi || ""}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center mb-1">
                                                    <svg
                                                        className="w-4 h-4 mr-1 text-green-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>
                                                    {dpc.ketua || "Belum ada"}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Ketua
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex space-x-3">
                                                    <div className="text-center">
                                                        <div className="text-sm font-semibold text-blue-600">
                                                            {dpc.kaders_count ||
                                                                0}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Kader
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-sm font-semibold text-purple-600">
                                                            {dpc.users_count ||
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
                                                        dpc.status === "active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {dpc.status === "active"
                                                        ? "Aktif"
                                                        : "Tidak Aktif"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    {/* 2. TOMBOL DETAIL KITA HAPUS KARENA RUTENYA GAK ADA */}

                                                    <Link
                                                        href={route(
                                                            "dpcs.edit",
                                                            dpc.id
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
                                                            "dpcs.destroy",
                                                            dpc.id
                                                        )}
                                                        method="delete"
                                                        as="button"
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                                                        onClick={(e) => {
                                                            if (
                                                                !confirm(
                                                                    "Apakah Anda yakin ingin menghapus DPC ini?"
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

                                    {dpcs.length === 0 && (
                                        <tr>
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
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                        />
                                                    </svg>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                        Belum ada data DPC
                                                    </h3>
                                                    <p className="text-gray-500 mb-4">
                                                        Mulai dengan menambahkan
                                                        DPC pertama Anda.
                                                    </p>
                                                    <Link
                                                        href={route(
                                                            "dpcs.create"
                                                        )}
                                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                    >
                                                        Tambah DPC Pertama
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {dpcs.length > 0 && (
                            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Menampilkan{" "}
                                        <span className="font-medium">1</span>{" "}
                                        sampai{" "}
                                        <span className="font-medium">
                                            {dpcs.length}
                                        </span>{" "}
                                        dari{" "}
                                        <span className="font-medium">
                                            {dpcs.length}
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
