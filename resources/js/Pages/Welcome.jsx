import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Sistem Manajemen Kader - Partai NasDem Aceh" />

            {/* Background utama */}
            <div className="min-h-screen bg-gray-50 text-gray-900">
                {/* Header */}
                <header className="relative z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex justify-between items-center">
                            {/* Logo dan Brand */}
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                    <img
                                        src="/img/logo.jpg"
                                        alt="Logo NasDem"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-blue-900">
                                        SISTEM KADER NASDEM
                                    </h1>
                                    <p className="text-xs text-blue-700 opacity-90">
                                        PROVINSI ACEH
                                    </p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav>
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex space-x-3">
                                        <Link
                                            href={route("login")}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                                        >
                                            Masuk
                                        </Link>
                                        {/* <Link
                                            href={route("register")}
                                            className="bg-white text-blue-600 hover:bg-blue-50 border border-blue-600 px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                                        >
                                            Daftar
                                        </Link> */}
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section dengan Background Image */}
                <section
                    className="relative min-h-[70vh] flex items-center justify-center py-16"
                    style={{
                        backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.8), rgba(29, 78, 216, 0.8)), url('/img/background.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                    }}
                >
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center text-white">
                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                                SISTEM MANAJEMEN
                                <span className="block text-blue-200 mt-2">
                                    KADER PARTAI NASDEM
                                </span>
                                PROVINSI ACEH
                            </h1>

                            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed drop-shadow-md">
                                Platform terintegrasi untuk mengelola data kader
                                <span className="block">
                                    DPW, DPD, dan DPC Partai NasDem Aceh
                                </span>
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105"
                                    >
                                        🚀 Buka Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105"
                                        >
                                            Masuk Sistem
                                        </Link>
                                        {/* <Link
                                            href={route("register")}
                                            className="bg-transparent border-2 border-white text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 backdrop-blur-sm hover:shadow-2xl transform hover:-translate-y-1"
                                        >
                                            Daftar Kader
                                        </Link> */}
                                    </>
                                )}
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                    <div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">
                                            23
                                        </div>
                                        <div className="text-blue-200 text-sm">
                                            Kabupaten/Kota
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">
                                            289
                                        </div>
                                        <div className="text-blue-200 text-sm">
                                            Kecamatan
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">
                                            5,247
                                        </div>
                                        <div className="text-blue-200 text-sm">
                                            Kader Aktif
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">
                                            100%
                                        </div>
                                        <div className="text-blue-200 text-sm">
                                            Wilayah Tercover
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                                Struktur Management Kader
                            </h2>
                            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                                Sistem terintegrasi untuk mengelola kader dari
                                tingkat provinsi hingga kecamatan
                            </p>

                            <div className="grid md:grid-cols-3 gap-8">
                                {/* DPW Card */}
                                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                            <span className="text-3xl">🏛️</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4">
                                            DEWAN PIMPINAN WILAYAH
                                        </h3>
                                        <p className="text-blue-100 leading-relaxed">
                                            Management kader tingkat provinsi
                                            dengan akses monitoring dan
                                            koordinasi seluruh DPD dan DPC di
                                            wilayah Aceh
                                        </p>
                                        <div className="mt-6 text-blue-200 text-sm font-semibold">
                                            Tingkat Provinsi
                                        </div>
                                    </div>
                                </div>

                                {/* DPD Card */}
                                <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                            <span className="text-3xl">🏢</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4">
                                            DEWAN PIMPINAN DAERAH
                                        </h3>
                                        <p className="text-green-100 leading-relaxed">
                                            Management kader tingkat
                                            kabupaten/kota dengan monitoring dan
                                            koordinasi DPC di wilayah kerjanya
                                        </p>
                                        <div className="mt-6 text-green-200 text-sm font-semibold">
                                            Tingkat Kabupaten/Kota
                                        </div>
                                    </div>
                                </div>

                                {/* DPC Card */}
                                <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                            <span className="text-3xl">📍</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4">
                                            DEWAN PIMPINAN CABANG
                                        </h3>
                                        <p className="text-red-100 leading-relaxed">
                                            Management kader tingkat kecamatan
                                            dengan input data langsung dan
                                            monitoring perkembangan kader
                                        </p>
                                        <div className="mt-6 text-red-200 text-sm font-semibold">
                                            Tingkat Kecamatan
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center space-x-4 mb-6 md:mb-0">
                                <img
                                    src="/img/logo.jpg"
                                    alt="Logo NasDem"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                                />
                                <div>
                                    <div className="font-bold text-lg">
                                        PARTAI NASDEM ACEH
                                    </div>
                                    <div className="text-gray-400">
                                        Sistem Manajemen Kader Terpadu
                                    </div>
                                </div>
                            </div>

                            <div className="text-center md:text-right">
                                <div className="text-gray-400 mb-2">
                                    &copy; {new Date().getFullYear()} Dewan
                                    Pimpinan Wilayah Partai NasDem Aceh
                                </div>
                                <div className="text-sm text-gray-500">
                                    Seluruh hak cipta dilindungi undang-undang
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
