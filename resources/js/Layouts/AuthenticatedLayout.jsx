import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [showFlash, setShowFlash] = useState(Boolean(flash?.message));

    useEffect(() => {
        setShowFlash(Boolean(flash?.message));
    }, [flash?.message]);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar untuk Desktop - UPDATED STYLE */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex w-64 flex-col">
                    <div className="flex flex-grow flex-col overflow-y-auto bg-gradient-to-b from-indigo-700 to-indigo-800 pt-5 pb-4 shadow-xl">
                        {/* Logo Section - UPDATED */}
                        <div className="flex flex-shrink-0 items-center px-4 mb-8">
                            <Link href="/">
                                <div className="h-12 w-12 rounded-xl bg-white p-1 shadow-lg ring-2 ring-white/20">
                                    <img
                                        src="/img/logo.jpg"
                                        alt="Logo"
                                        className="h-full w-full object-contain rounded-lg"
                                    />
                                </div>
                            </Link>
                            <div className="ml-3">
                                <h1 className="text-sm font-bold text-white leading-tight">
                                    Sistem Informasi
                                </h1>
                                <p className="text-xs text-indigo-100">
                                    Kader Nasdem Aceh
                                </p>
                            </div>
                        </div>

                        {/* Navigation - UPDATED STYLE */}
                        <nav className="mt-3 flex-1 space-y-2 px-3">
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="group flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <div
                                    className={`mr-3 p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors ${
                                        route().current("dashboard")
                                            ? "bg-white/20"
                                            : ""
                                    }`}
                                >
                                    <svg
                                        className="h-5 w-5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                </div>
                                <span className="text-white font-medium">
                                    Dashboard
                                </span>
                            </NavLink>

                            <NavLink
                                href={route("dpds.index")}
                                active={route().current("dpds.index")}
                                className="group flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <div
                                    className={`mr-3 p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors ${
                                        route().current("dpds.index")
                                            ? "bg-white/20"
                                            : ""
                                    }`}
                                >
                                    <svg
                                        className="h-5 w-5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-white font-medium">
                                    Manajemen DPD
                                </span>
                            </NavLink>

                            <NavLink
                                href={route("dpcs.index")}
                                active={route().current("dpcs.index")}
                                className="group flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <div
                                    className={`mr-3 p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors ${
                                        route().current("dpcs.index")
                                            ? "bg-white/20"
                                            : ""
                                    }`}
                                >
                                    <svg
                                        className="h-5 w-5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <span className="text-white font-medium">
                                    Manajemen DPC
                                </span>
                            </NavLink>

                            <NavLink
                                href={route("kaders.index")}
                                active={route().current("kaders.index")}
                                className="group flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <div
                                    className={`mr-3 p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors ${
                                        route().current("kaders.index")
                                            ? "bg-white/20"
                                            : ""
                                    }`}
                                >
                                    <svg
                                        className="h-5 w-5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-white font-medium">
                                    Manajemen Kader
                                </span>
                            </NavLink>
                            <NavLink
                                href={route("admins.index")}
                                active={route().current("admins.index")}
                                className="group flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span className="text-white font-medium">
                                    Manajemen Admin
                                </span>
                            </NavLink>
                        </nav>

                        {/* User Info Section - NEW */}
                        <div className="mt-auto px-3 py-4 border-t border-white/10">
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="ml-3 min-w-0 flex-1">
                                    <p className="text-sm font-medium text-white truncate">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-indigo-200 truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex w-0 flex-1 flex-col overflow-hidden">
                {/* Top Navigation Bar - UPDATED */}
                <div className="relative z-10 flex h-16 flex-shrink-0 bg-white shadow-sm border-b border-gray-200">
                    <button
                        className="border-r border-gray-200 px-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden transition-colors"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <div className="flex flex-1 justify-between px-4">
                        <div className="flex flex-1">
                            {/* Page Title for Mobile */}
                            <div className="lg:hidden flex items-center">
                                <h1 className="text-lg font-semibold text-gray-900">
                                    {header?.props?.children || "Dashboard"}
                                </h1>
                            </div>
                        </div>
                        <div className="ml-4 flex items-center lg:ml-6">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                                                <span className="text-xs font-bold text-indigo-700">
                                                    {user.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            </div>
                                            {user.name}
                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
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
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="text-red-600 hover:bg-red-50"
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
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto focus:outline-none bg-gray-50/30">
                    {header && (
                        <header className="bg-white shadow-sm border-b border-gray-200">
                            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}
                    <div className="py-6">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            {flash?.message && showFlash && (
                                <div className="mb-6 flex items-start justify-between rounded-lg border border-green-200 bg-green-50/80 p-4 text-sm text-green-800 shadow-sm backdrop-blur-sm">
                                    <div className="flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5 flex-shrink-0 mt-0.5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16Zm3.857-9.809a.75.75 0 10-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="ml-2 font-medium">
                                            {flash.message}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowFlash(false)}
                                        className="ml-3 inline-flex items-center rounded p-1 text-green-600 hover:bg-green-100 transition-colors focus:outline-none"
                                        aria-label="Dismiss notification"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            {children}
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar - UPDATED */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex lg:hidden">
                    <div
                        className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gradient-to-b from-indigo-700 to-indigo-800 pt-5 pb-4 shadow-xl">
                        <div className="absolute top-0 right-0 -mr-12 pt-4">
                            <button
                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 focus:outline-none focus:ring-2 focus:ring-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-shrink-0 items-center px-4 mb-8">
                            <div className="h-12 w-12 rounded-xl bg-white p-1 shadow-lg ring-2 ring-white/20">
                                <img
                                    src="/img/logo.jpg"
                                    alt="Logo"
                                    className="h-full w-full object-contain rounded-lg"
                                />
                            </div>
                            <div className="ml-3">
                                <h1 className="text-sm font-bold text-white leading-tight">
                                    Sistem Informasi
                                </h1>
                                <p className="text-xs text-indigo-100">
                                    Kader Nasdem Aceh
                                </p>
                            </div>
                        </div>

                        <nav className="mt-5 h-full flex-1 space-y-2 px-3">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="group flex items-center rounded-xl px-3 py-3 text-base font-medium text-white hover:bg-white/10"
                            >
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("dpds.index")}
                                active={route().current("dpds.index")}
                                className="group flex items-center rounded-xl px-3 py-3 text-base font-medium text-white hover:bg-white/10"
                            >
                                Manajemen DPD
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("dpcs.index")}
                                active={route().current("dpcs.index")}
                                className="group flex items-center rounded-xl px-3 py-3 text-base font-medium text-white hover:bg-white/10"
                            >
                                Manajemen DPC
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("kaders.index")}
                                active={route().current("kaders.index")}
                                className="group flex items-center rounded-xl px-3 py-3 text-base font-medium text-white hover:bg-white/10"
                            >
                                Manajemen Kader
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("admins.index")}
                                active={route().current("admins.index")}
                                className="group flex items-center rounded-xl px-3 py-3 text-base font-medium text-white hover:bg-white/10"
                            >
                                Manajemen Admin
                            </ResponsiveNavLink>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
}
