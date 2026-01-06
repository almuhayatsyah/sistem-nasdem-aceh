import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div
            className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8"
            style={{
                backgroundImage: `url('/img/background.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}
        >
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <div className="flex flex-col items-center">
                            <img
                                src="/img/logo.jpg"
                                alt="Logo Partai NasDem"
                                className="h-20 w-20 rounded-full object-cover shadow-lg border-4 border-white/50 mb-4 backdrop-blur-sm"
                            />
                            <h1 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                                SISTEM MANAJEMEN KADER
                            </h1>
                            <p className="text-lg font-semibold text-white drop-shadow-lg">
                                PARTAI NASDEM
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Content Card - Transparan dengan Blur */}
                <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/30">
                    {children}
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-white/90 drop-shadow-md">
                        &copy; {new Date().getFullYear()} Partai NasDem
                    </p>
                </div>
            </div>
        </div>
    );
}
