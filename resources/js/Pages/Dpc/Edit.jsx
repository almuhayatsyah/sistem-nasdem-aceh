import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, dpc, dpds }) {
    const pageHeader = `Edit DPC - ${dpc.nama_dpc}`;

    const { data, setData, put, processing, errors } = useForm({
        nama_dpc: dpc.nama_dpc || "",
        dpd_id: dpc.dpd_id || "",
        alamat: dpc.alamat || "",
        telepon: dpc.telepon || "",
        email: dpc.email || "",
        ketua: dpc.ketua || "",
        sekretaris: dpc.sekretaris || "",
        bendahara: dpc.bendahara || "",
        status: dpc.status || "active",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("dpcs.update", dpc.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manajemen DPC
                </h2>
            }
        >
            <Head title={pageHeader} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Edit DPC
                                </h1>
                                <p className="mt-2 text-sm text-gray-600">
                                    Mengubah data Dewan Pimpinan Cabang{" "}
                                    {dpc.nama_dpc}
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <Link
                                    href={route("dpcs.index")}
                                    className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
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
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
                                    Kembali
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Form Edit DPC
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Perbarui data DPC di bawah ini
                            </p>
                        </div>

                        <form onSubmit={submit} className="px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Nama DPC */}
                                <div className="sm:col-span-2">
                                    <InputLabel
                                        htmlFor="nama_dpc"
                                        value="Nama DPC *"
                                    />
                                    <TextInput
                                        id="nama_dpc"
                                        name="nama_dpc"
                                        value={data.nama_dpc}
                                        className="mt-1 block w-full"
                                        autoComplete="nama_dpc"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("nama_dpc", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.nama_dpc}
                                        className="mt-2"
                                    />
                                </div>

                                {/* DPD Induk */}
                                <div>
                                    <InputLabel
                                        htmlFor="dpd_id"
                                        value="DPD Induk *"
                                    />
                                    <select
                                        id="dpd_id"
                                        name="dpd_id"
                                        value={data.dpd_id}
                                        onChange={(e) =>
                                            setData("dpd_id", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="">
                                            -- Pilih DPD --
                                        </option>
                                        {dpds.map((dpd) => (
                                            <option key={dpd.id} value={dpd.id}>
                                                {dpd.nama_dpd}{" "}
                                                {dpd.lokasi
                                                    ? `- ${dpd.lokasi}`
                                                    : ""}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.dpd_id}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="Status"
                                    />
                                    <select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="active">Aktif</option>
                                        <option value="inactive">
                                            Tidak Aktif
                                        </option>
                                    </select>
                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Telepon */}
                                <div>
                                    <InputLabel
                                        htmlFor="telepon"
                                        value="Telepon"
                                    />
                                    <TextInput
                                        id="telepon"
                                        name="telepon"
                                        value={data.telepon}
                                        className="mt-1 block w-full"
                                        autoComplete="telepon"
                                        onChange={(e) =>
                                            setData("telepon", e.target.value)
                                        }
                                        placeholder="Contoh: 021-7654321"
                                    />
                                    <InputError
                                        message={errors.telepon}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="email"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="Contoh: dpc.cilandak@example.com"
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Alamat */}
                                <div className="sm:col-span-2">
                                    <InputLabel
                                        htmlFor="alamat"
                                        value="Alamat Lengkap"
                                    />
                                    <textarea
                                        id="alamat"
                                        name="alamat"
                                        value={data.alamat}
                                        rows={3}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setData("alamat", e.target.value)
                                        }
                                        placeholder="Alamat lengkap kantor DPC..."
                                    />
                                    <InputError
                                        message={errors.alamat}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Pengurus */}
                                <div className="sm:col-span-2">
                                    <div className="border-t border-gray-200 pt-6">
                                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                                            Data Pengurus
                                        </h4>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            <div>
                                                <InputLabel
                                                    htmlFor="ketua"
                                                    value="Ketua"
                                                />
                                                <TextInput
                                                    id="ketua"
                                                    name="ketua"
                                                    value={data.ketua}
                                                    className="mt-1 block w-full"
                                                    autoComplete="ketua"
                                                    onChange={(e) =>
                                                        setData(
                                                            "ketua",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Nama ketua DPC"
                                                />
                                                <InputError
                                                    message={errors.ketua}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="sekretaris"
                                                    value="Sekretaris"
                                                />
                                                <TextInput
                                                    id="sekretaris"
                                                    name="sekretaris"
                                                    value={data.sekretaris}
                                                    className="mt-1 block w-full"
                                                    autoComplete="sekretaris"
                                                    onChange={(e) =>
                                                        setData(
                                                            "sekretaris",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Nama sekretaris DPC"
                                                />
                                                <InputError
                                                    message={errors.sekretaris}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="bendahara"
                                                    value="Bendahara"
                                                />
                                                <TextInput
                                                    id="bendahara"
                                                    name="bendahara"
                                                    value={data.bendahara}
                                                    className="mt-1 block w-full"
                                                    autoComplete="bendahara"
                                                    onChange={(e) =>
                                                        setData(
                                                            "bendahara",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Nama bendahara DPC"
                                                />
                                                <InputError
                                                    message={errors.bendahara}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end mt-8 pt-6 border-t border-gray-200">
                                <Link
                                    href={route("dpcs.index")}
                                    className="inline-flex items-center px-6 py-3 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150 mr-4"
                                >
                                    Batal
                                </Link>

                                <PrimaryButton
                                    disabled={processing}
                                    className="inline-flex items-center px-6 py-3 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-25"
                                >
                                    <svg
                                        className={`w-4 h-4 mr-2 ${
                                            processing ? "animate-spin" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={
                                                processing
                                                    ? "M12 2v4m0 12v4m8-10h-4M6 12H2"
                                                    : "M5 13l4 4L19 7"
                                            }
                                        />
                                    </svg>
                                    {processing
                                        ? "Memperbarui..."
                                        : "Update DPC"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    {/* Info Section */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-blue-400"
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
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">
                                    Informasi
                                </h3>
                                <div className="mt-2 text-sm text-blue-700">
                                    <p>
                                        Field dengan tanda (*) wajib diisi.
                                        Pastikan data yang dimasukkan sudah
                                        benar sebelum diperbarui.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
