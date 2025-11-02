import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, dpcs }) {
    const { data, setData, errors, post, processing } = useForm({
        dpc_id: "",
        nama_lengkap: "",
        nik: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        agama: "",
        pekerjaan: "",
        email: "",
        no_kta: "",
        tanggal_bergabung: "",
        status_keanggotaan: "Aktif",
        jabatan: "Anggota Biasa",
        alamat_ktp: "",
        alamat_domisili: "",
        no_hp: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("kaders.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Kader Baru
                </h2>
            }
        >
            <Head title="Tambah Kader Baru" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                            href={route("kaders.index")}
                                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                        >
                                            Data Kader
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
                                            Tambah Kader
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Form Tambah Kader Baru
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Isi semua informasi yang diperlukan untuk
                                menambahkan kader baru
                            </p>
                        </div>

                        <form onSubmit={submit} className="px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* DPC Selection */}
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
                                            setData("dpc_id", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Pilih DPC...</option>
                                        {dpcs.map((dpc) => (
                                            <option key={dpc.id} value={dpc.id}>
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

                                {/* Nama Lengkap */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="nama_lengkap"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        id="nama_lengkap"
                                        name="nama_lengkap"
                                        value={data.nama_lengkap}
                                        onChange={(e) =>
                                            setData(
                                                "nama_lengkap",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.nama_lengkap && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.nama_lengkap}
                                        </p>
                                    )}
                                </div>

                                {/* NIK */}
                                <div>
                                    <label
                                        htmlFor="nik"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        NIK
                                    </label>
                                    <input
                                        type="text"
                                        id="nik"
                                        name="nik"
                                        value={data.nik}
                                        onChange={(e) =>
                                            setData("nik", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.nik && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.nik}
                                        </p>
                                    )}
                                </div>

                                {/* No KTA */}
                                <div>
                                    <label
                                        htmlFor="no_kta"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        No. KTA
                                    </label>
                                    <input
                                        type="text"
                                        id="no_kta"
                                        name="no_kta"
                                        value={data.no_kta}
                                        onChange={(e) =>
                                            setData("no_kta", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.no_kta && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.no_kta}
                                        </p>
                                    )}
                                </div>

                                {/* Tempat Lahir */}
                                <div>
                                    <label
                                        htmlFor="tempat_lahir"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Tempat Lahir
                                    </label>
                                    <input
                                        type="text"
                                        id="tempat_lahir"
                                        name="tempat_lahir"
                                        value={data.tempat_lahir}
                                        onChange={(e) =>
                                            setData(
                                                "tempat_lahir",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.tempat_lahir && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.tempat_lahir}
                                        </p>
                                    )}
                                </div>

                                {/* Tanggal Lahir */}
                                <div>
                                    <label
                                        htmlFor="tanggal_lahir"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        type="date"
                                        id="tanggal_lahir"
                                        name="tanggal_lahir"
                                        value={data.tanggal_lahir}
                                        onChange={(e) =>
                                            setData(
                                                "tanggal_lahir",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.tanggal_lahir && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.tanggal_lahir}
                                        </p>
                                    )}
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <label
                                        htmlFor="jenis_kelamin"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Jenis Kelamin
                                    </label>
                                    <select
                                        id="jenis_kelamin"
                                        name="jenis_kelamin"
                                        value={data.jenis_kelamin}
                                        onChange={(e) =>
                                            setData(
                                                "jenis_kelamin",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">
                                            Pilih Jenis Kelamin
                                        </option>
                                        <option value="Laki-laki">
                                            Laki-laki
                                        </option>
                                        <option value="Perempuan">
                                            Perempuan
                                        </option>
                                    </select>
                                    {errors.jenis_kelamin && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.jenis_kelamin}
                                        </p>
                                    )}
                                </div>

                                {/* Agama */}
                                <div>
                                    <label
                                        htmlFor="agama"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Agama
                                    </label>
                                    <input
                                        type="text"
                                        id="agama"
                                        name="agama"
                                        value={data.agama}
                                        onChange={(e) =>
                                            setData("agama", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.agama && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.agama}
                                        </p>
                                    )}
                                </div>

                                {/* Pekerjaan */}
                                <div>
                                    <label
                                        htmlFor="pekerjaan"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Pekerjaan
                                    </label>
                                    <input
                                        type="text"
                                        id="pekerjaan"
                                        name="pekerjaan"
                                        value={data.pekerjaan}
                                        onChange={(e) =>
                                            setData("pekerjaan", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.pekerjaan && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.pekerjaan}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
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

                                {/* No HP */}
                                <div>
                                    <label
                                        htmlFor="no_hp"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        No. HP
                                    </label>
                                    <input
                                        type="text"
                                        id="no_hp"
                                        name="no_hp"
                                        value={data.no_hp}
                                        onChange={(e) =>
                                            setData("no_hp", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.no_hp && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.no_hp}
                                        </p>
                                    )}
                                </div>

                                {/* Jabatan */}
                                <div>
                                    <label
                                        htmlFor="jabatan"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Jabatan
                                    </label>
                                    <input
                                        type="text"
                                        id="jabatan"
                                        name="jabatan"
                                        value={data.jabatan}
                                        onChange={(e) =>
                                            setData("jabatan", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.jabatan && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.jabatan}
                                        </p>
                                    )}
                                </div>

                                {/* Status Keanggotaan */}
                                <div>
                                    <label
                                        htmlFor="status_keanggotaan"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Status Keanggotaan
                                    </label>
                                    <select
                                        id="status_keanggotaan"
                                        name="status_keanggotaan"
                                        value={data.status_keanggotaan}
                                        onChange={(e) =>
                                            setData(
                                                "status_keanggotaan",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="Aktif">Aktif</option>
                                        <option value="Tidak Aktif">
                                            Tidak Aktif
                                        </option>
                                        <option value="Meninggal Dunia">
                                            Meninggal Dunia
                                        </option>
                                        <option value="Pindah">Pindah</option>
                                        <option value="Dipecat">Dipecat</option>
                                    </select>
                                    {errors.status_keanggotaan && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.status_keanggotaan}
                                        </p>
                                    )}
                                </div>

                                {/* Tanggal Bergabung */}
                                <div>
                                    <label
                                        htmlFor="tanggal_bergabung"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Tanggal Bergabung
                                    </label>
                                    <input
                                        type="date"
                                        id="tanggal_bergabung"
                                        name="tanggal_bergabung"
                                        value={data.tanggal_bergabung}
                                        onChange={(e) =>
                                            setData(
                                                "tanggal_bergabung",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.tanggal_bergabung && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.tanggal_bergabung}
                                        </p>
                                    )}
                                </div>

                                {/* Alamat KTP */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="alamat_ktp"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Alamat KTP
                                    </label>
                                    <textarea
                                        id="alamat_ktp"
                                        name="alamat_ktp"
                                        rows={3}
                                        value={data.alamat_ktp}
                                        onChange={(e) =>
                                            setData(
                                                "alamat_ktp",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.alamat_ktp && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.alamat_ktp}
                                        </p>
                                    )}
                                </div>

                                {/* Alamat Domisili */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="alamat_domisili"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Alamat Domisili
                                    </label>
                                    <textarea
                                        id="alamat_domisili"
                                        name="alamat_domisili"
                                        rows={3}
                                        value={data.alamat_domisili}
                                        onChange={(e) =>
                                            setData(
                                                "alamat_domisili",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.alamat_domisili && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.alamat_domisili}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex justify-end space-x-3">
                                <Link
                                    href={route("kaders.index")}
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
                                        "Simpan Kader"
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
