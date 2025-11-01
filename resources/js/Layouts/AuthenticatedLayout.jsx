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
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar untuk Desktop */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex w-64 flex-col">
                    <div className="flex flex-grow flex-col overflow-y-auto bg-indigo-700 pt-5 pb-4">
                        {/* Logo */}
                        <div className="flex flex-shrink-0 items-center px-4">
                            <Link href="/">
                                <div className="h-10 w-10 rounded bg-white p-1 shadow">
                                    <img
                                        src="/img/logo.jpg"
                                        alt="Logo"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            </Link>
                            <span className="ml-2 text-lg font-semibold text-white">
                                Sistem Informasi Kader Nasdem Aceh
                            </span>
                        </div>

                        {/* Navigation */}
                        <nav className="mt-3 flex-1 space-y-1 px-2">
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-white hover:bg-indigo-600"
                            >
                                <svg
                                    className="mr-3 h-6 w-6"
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
                                Dashboard
                            </NavLink>
                            <NavLink
                                href={route("dpds.index")}
                                active={route().current("dpds.index")}
                                className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-white hover:bg-indigo-600"
                            >
                                <svg
                                    className="mr-3 h-6 w-6"
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
                                Manajemen DPD
                            </NavLink>
                            <NavLink
                                href={route("dpcs.index")}
                                active={route().current("dpcs.index")}
                                className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-white hover:bg-indigo-600"
                            >
                                <svg
                                    className="mr-3 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2m-2 0h-8m-2 0h-2m-2 0v-3a2 2 0 012-2h12a2 2 0 012 2v3"
                                    />
                                </svg>
                                Manajemen DPC
                            </NavLink>
                            <NavLink
                                href={route("kaders .index")}
                                active={route().current("kaders.index")}
                                className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-white hover:bg-indigo-600"
                            >
                                <svg
                                    className="mr-3 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2m-2 0h-8m-2 0h-2m-2 0v-3a2 2 0 012-2h12a2 2 0 012 2v3"
                                    />
                                </svg>
                                Manajemen kaders
                            </NavLink>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex w-0 flex-1 flex-col overflow-hidden">
                {/* Top Navigation Bar */}
                <div className="relative z-10 flex h-16 flex-shrink-0 bg-white shadow">
                    <button
                        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
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
                        <div className="flex flex-1"></div>
                        <div className="ml-4 flex items-center lg:ml-6">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
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
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto focus:outline-none">
                    {header && (
                        <header className="bg-white shadow">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}
                    <div className="py-6">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            {flash?.message && showFlash && (
                                <div className="mb-4 flex items-start justify-between rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                                    <div className="flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5 flex-shrink-0"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16Zm3.857-9.809a.75.75 0 10-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="ml-2">
                                            {flash.message}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowFlash(false)}
                                        className="ml-3 inline-flex items-center rounded p-1 text-green-700 hover:bg-green-100 focus:outline-none"
                                        aria-label="Dismiss notification"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-5 w-5"
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

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex lg:hidden">
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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

                        <div className="flex flex-shrink-0 items-center px-4">
                            <div className="h-10 w-10 rounded bg-white p-1 shadow">
                                <img
                                    src="/img/logo.jpg"
                                    alt="Logo"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </div>

                        <nav className="mt-5 h-full flex-1 space-y-1 px-2">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-white hover:bg-indigo-600"
                            >
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("dpds.index")}
                                active={route().current("dpds.index")}
                                className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-white hover:bg-indigo-600"
                            >
                                Manajemen DPD
                            </ResponsiveNavLink>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
}
