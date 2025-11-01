import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, kaders }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manajemen Kader
                </h2>
            }
        >
            <Head title="Manajemen Kader" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Data Kader
                                </h1>
                                <p className="mt-2 text-sm text-gray-600">
                                    Kelola semua data anggota (kader) yang
                                    terdaftar
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <Link
                                    href={route("kaders.create")}
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
                                    Tambah Kader
                                </Link>
                            </div>
                        </div>

                        {/* Statistik Cards */}
                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total Kader
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                        {kaders.length}
                                    </dd>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Kader Aktif
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-green-600">
                                        {
                                            kaders.filter(
                                                (kader) =>
                                                    kader.status_keanggotaan ===
                                                    "Aktif"
                                            ).length
                                        }
                                    </dd>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Kader Tidak Aktif
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-orange-600">
                                        {
                                            kaders.filter(
                                                (kader) =>
                                                    kader.status_keanggotaan !==
                                                    "Aktif"
                                            ).length
                                        }
                                    </dd>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Jabatan Struktural
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-blue-600">
                                        {
                                            kaders.filter(
                                                (kader) =>
                                                    kader.jabatan &&
                                                    kader.jabatan !==
                                                        "Anggota Biasa"
                                            ).length
                                        }
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabel Kader */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Daftar Kader
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Daftar lengkap semua kader yang terdaftar
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
                                            Kader
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Identitas
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Asal Organisasi
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Kontak
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Jabatan
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
                                    {kaders.map((kader, index) => (
                                        <tr
                                            key={kader.id}
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
                                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                            <span className="text-indigo-800 font-semibold text-sm">
                                                                {kader.nama_lengkap.charAt(
                                                                    0
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {kader.nama_lengkap}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {kader.email ||
                                                                "Email belum diisi"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {kader.no_kta ||
                                                        "No KTA belum diisi"}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    NIK:{" "}
                                                    {kader.nik ||
                                                        "NIK belum diisi"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {kader.dpc?.nama_dpc ||
                                                        "Belum terdaftar"}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {kader.dpc?.dpd?.nama_dpd ||
                                                        "Belum terdaftar"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {kader.no_hp || "-"}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {kader.alamat
                                                        ? `${kader.alamat.substring(
                                                              0,
                                                              20
                                                          )}...`
                                                        : "Alamat belum diisi"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {kader.jabatan ||
                                                        "Anggota Biasa"}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Bergabung:{" "}
                                                    {kader.tanggal_bergabung
                                                        ? new Date(
                                                              kader.tanggal_bergabung
                                                          ).toLocaleDateString(
                                                              "id-ID"
                                                          )
                                                        : "-"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        kader.status_keanggotaan ===
                                                        "Aktif"
                                                            ? "bg-green-100 text-green-800"
                                                            : kader.status_keanggotaan ===
                                                              "Tidak Aktif"
                                                            ? "bg-red-100 text-red-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {kader.status_keanggotaan ||
                                                        "Belum Diverifikasi"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <Link
                                                        href={route(
                                                            "kaders.show",
                                                            kader.id
                                                        )}
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
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
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                        Detail
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "kaders.edit",
                                                            kader.id
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
                                                            "kaders.destroy",
                                                            kader.id
                                                        )}
                                                        method="delete"
                                                        as="button"
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                                                        onClick={(e) => {
                                                            if (
                                                                !confirm(
                                                                    "Apakah Anda yakin ingin menghapus (mengarsip) kader ini?"
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

                                    {kaders.length === 0 && (
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
                                                            d="M17 20h5v-2a3 3 0 00-5.356-2.13l-2.644 2.644M11 16v-4a4 4 0 10-8 0v4h8zM3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                                                        />
                                                    </svg>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                        Belum ada data Kader
                                                    </h3>
                                                    <p className="text-gray-500 mb-4">
                                                        Mulai dengan menambahkan
                                                        kader pertama Anda.
                                                    </p>
                                                    <Link
                                                        href={route(
                                                            "kaders.create"
                                                        )}
                                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                    >
                                                        Tambah Kader Pertama
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {kaders.length > 0 && (
                            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Menampilkan{" "}
                                        <span className="font-medium">1</span>{" "}
                                        sampai{" "}
                                        <span className="font-medium">
                                            {kaders.length}
                                        </span>{" "}
                                        dari{" "}
                                        <span className="font-medium">
                                            {kaders.length}
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
