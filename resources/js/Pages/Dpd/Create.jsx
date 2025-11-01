import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_dpd: "",
        lokasi: "",
        alamat: "",
        telepon: "",
        email: "",
        ketua: "",
        sekretaris: "",
        bendahara: "",
        status: "active",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("dpds.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manajemen DPD
                </h2>
            }
        >
            <Head title="Tambah DPD Baru" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Tambah DPD Baru
                                </h1>
                                <p className="mt-2 text-sm text-gray-600">
                                    Tambahkan data Dewan Pimpinan Daerah baru
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <Link
                                    href={route("dpds.index")}
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
                                    Kembali ke Daftar
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Form Tambah DPD
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Isi data DPD baru di bawah ini
                            </p>
                        </div>

                        <form onSubmit={submit} className="px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Nama DPD */}
                                <div className="sm:col-span-2">
                                    <InputLabel
                                        htmlFor="nama_dpd"
                                        value="Nama DPD *"
                                    />
                                    <TextInput
                                        id="nama_dpd"
                                        name="nama_dpd"
                                        value={data.nama_dpd}
                                        className="mt-1 block w-full"
                                        autoComplete="nama_dpd"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("nama_dpd", e.target.value)
                                        }
                                        placeholder="Contoh: DPD Partai Nasdem Aceh Barat Daya"
                                        required
                                    />
                                    <InputError
                                        message={errors.nama_dpd}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Lokasi */}
                                <div>
                                    <InputLabel
                                        htmlFor="lokasi"
                                        value="Lokasi / Wilayah"
                                    />
                                    <TextInput
                                        id="lokasi"
                                        name="lokasi"
                                        value={data.lokasi}
                                        className="mt-1 block w-full"
                                        autoComplete="lokasi"
                                        onChange={(e) =>
                                            setData("lokasi", e.target.value)
                                        }
                                        placeholder="Contoh: Blangpidie"
                                    />
                                    <InputError
                                        message={errors.lokasi}
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
                                        placeholder="Contoh: 021-1234567"
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
                                        placeholder="Contoh: dpd.jaksel@example.com"
                                    />
                                    <InputError
                                        message={errors.email}
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
                                        placeholder="Alamat lengkap kantor DPD..."
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
                                                    placeholder="Nama ketua DPD"
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
                                                    placeholder="Nama sekretaris DPD"
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
                                                    placeholder="Nama bendahara DPD"
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
                                    href={route("dpds.index")}
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
                                                    : "M12 4v16m8-8H4"
                                            }
                                        />
                                    </svg>
                                    {processing ? "Menyimpan..." : "Simpan DPD"}
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
                                        benar sebelum disimpan.
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
