import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Edit({ auth, admin, dpds, dpcs }) {
    const { data, setData, errors, put, processing } = useForm({
        name: admin.name || "",
        email: admin.email || "",
        password: "",
        password_confirmation: "",
        role: admin.role || "",
        status: admin.status || "Aktif",
        dpd_id: admin.dpd_id || "",
        dpc_id: admin.dpc_id || "",
    });

    const [showDpdField, setShowDpdField] = useState(false);
    const [showDpcField, setShowDpcField] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    useEffect(() => {
        // Set visibility based on current role
        setShowDpdField(admin.role === "Admin DPD");
        setShowDpcField(admin.role === "Admin DPC");
    }, [admin.role]);

    const handleRoleChange = (role) => {
        setData("role", role);
        setShowDpdField(role === "Admin DPD");
        setShowDpcField(role === "Admin DPC");

        // Reset organization fields when role changes
        if (role !== "Admin DPD") setData("dpd_id", "");
        if (role !== "Admin DPC") setData("dpc_id", "");
    };

    const submit = (e) => {
        e.preventDefault();
        put(route("admins.update", admin.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Data Admin
                </h2>
            }
        >
            <Head title="Edit Data Admin" />

            <div className="py-8">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-4">
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <svg
                                            className="flex-shrink-0 h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg
                                            className="flex-shrink-0 h-5 w-5 text-gray-300"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                        </svg>
                                        <Link
                                            href={route("admins.index")}
                                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                        >
                                            Data Admin
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg
                                            className="flex-shrink-0 h-5 w-5 text-gray-300"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                        </svg>
                                        <span className="ml-4 text-sm font-medium text-gray-400">
                                            Edit {admin.name}
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Info Admin */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 text-blue-400 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-sm text-blue-700">
                                Sedang mengedit data admin:{" "}
                                <strong>{admin.name}</strong> - {admin.email}
                            </p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Form Edit Data Admin
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Perbarui informasi admin sesuai kebutuhan
                            </p>
                        </div>

                        <form onSubmit={submit} className="px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Nama Lengkap */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Fields - Optional */}
                                <div className="sm:col-span-2">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Ubah Password
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPasswordFields(
                                                    !showPasswordFields
                                                )
                                            }
                                            className="text-sm text-indigo-600 hover:text-indigo-500"
                                        >
                                            {showPasswordFields
                                                ? "Sembunyikan"
                                                : "Ubah Password"}
                                        </button>
                                    </div>

                                    {showPasswordFields && (
                                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="password"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Password Baru
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={data.password}
                                                    onChange={(e) =>
                                                        setData(
                                                            "password",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="Kosongkan jika tidak diubah"
                                                />
                                                {errors.password && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors.password}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="password_confirmation"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Konfirmasi Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password_confirmation"
                                                    name="password_confirmation"
                                                    value={
                                                        data.password_confirmation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "password_confirmation",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="Konfirmasi password baru"
                                                />
                                                {errors.password_confirmation && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {
                                                            errors.password_confirmation
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Role */}
                                <div>
                                    <label
                                        htmlFor="role"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={data.role}
                                        onChange={(e) =>
                                            handleRoleChange(e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Pilih Role</option>
                                        <option value="DPW">DPW</option>
                                        <option value="Admin DPD">
                                            Admin DPD
                                        </option>
                                        <option value="Admin DPC">
                                            Admin DPC
                                        </option>
                                    </select>
                                    {errors.role && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.role}
                                        </p>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <label
                                        htmlFor="status"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="Aktif">Aktif</option>
                                        <option value="Nonaktif">
                                            Nonaktif
                                        </option>
                                    </select>
                                    {errors.status && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>

                                {/* DPD Field - Conditional */}
                                {showDpdField && (
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="dpd_id"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            DPD
                                        </label>
                                        <select
                                            id="dpd_id"
                                            name="dpd_id"
                                            value={data.dpd_id}
                                            onChange={(e) =>
                                                setData(
                                                    "dpd_id",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Pilih DPD</option>
                                            {dpds.map((dpd) => (
                                                <option
                                                    key={dpd.id}
                                                    value={dpd.id}
                                                >
                                                    {dpd.nama_dpd}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.dpd_id && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.dpd_id}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* DPC Field - Conditional */}
                                {showDpcField && (
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="dpc_id"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            DPC
                                        </label>
                                        <select
                                            id="dpc_id"
                                            name="dpc_id"
                                            value={data.dpc_id}
                                            onChange={(e) =>
                                                setData(
                                                    "dpc_id",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Pilih DPC</option>
                                            {dpcs.map((dpc) => (
                                                <option
                                                    key={dpc.id}
                                                    value={dpc.id}
                                                >
                                                    {dpc.nama_dpc}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.dpc_id && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.dpc_id}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex justify-end space-x-3">
                                <Link
                                    href={route("admins.index")}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        "Perbarui Data"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
