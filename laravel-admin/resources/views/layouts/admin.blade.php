<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" x-data="{ darkMode: localStorage.getItem('darkMode') === 'true' }" x-init="$watch('darkMode', val => localStorage.setItem('darkMode', val))" :class="{ 'dark': darkMode }">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }} - @yield('title', 'Dashboard')</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased bg-gray-50 dark:bg-gray-900">
    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <aside id="sidebar" class="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-gray-800 lg:static lg:translate-x-0 -translate-x-full" x-data="{ sidebarOpen: false }">
            <!-- Sidebar Header -->
            <div class="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <a href="{{ route('dashboard') }}" class="flex items-center gap-2">
                    <x-application-logo class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                    <span class="text-xl font-bold text-gray-800 dark:text-white">{{ config('app.name') }}</span>
                </a>

                <button @click="sidebarOpen = false" class="block lg:hidden">
                    <svg class="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" fill=""/>
                    </svg>
                </button>
            </div>

            <!-- Sidebar Menu -->
            <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav class="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    <!-- Menu Group -->
                    <div>
                        <h3 class="mb-4 ml-4 text-sm font-semibold text-gray-400 dark:text-gray-500">MENU</h3>

                        <ul class="mb-6 flex flex-col gap-1.5">
                            <!-- Dashboard -->
                            <li>
                                <a href="{{ route('dashboard') }}" class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-gray-700 duration-300 ease-in-out hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 {{ request()->routeIs('dashboard') ? 'bg-gray-100 dark:bg-gray-700' : '' }}">
                                    <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z" fill=""/>
                                        <path d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z" fill=""/>
                                        <path d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z" fill=""/>
                                        <path d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z" fill=""/>
                                    </svg>
                                    Dashboard
                                </a>
                            </li>

                            <!-- Tables -->
                            <li>
                                <a href="{{ route('tables') }}" class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-gray-700 duration-300 ease-in-out hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 {{ request()->routeIs('tables') ? 'bg-gray-100 dark:bg-gray-700' : '' }}">
                                    <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_130_9756)">
                                            <path d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.5459 2.2501 17.5459H15.7501C16.7063 17.5459 17.4938 16.7584 17.4938 15.8021V2.3021C17.4938 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4271H11.3063V10.599H6.69385ZM11.3063 11.8365V15.3084H6.69385V11.8365H11.3063ZM1.74385 6.4271H5.45635V10.599H1.74385V6.4271ZM12.5438 6.4271H16.2563V10.599H12.5438V6.4271ZM2.2501 1.7959H15.7501C16.0313 1.7959 16.2563 2.0209 16.2563 2.3021V5.18335H1.74385V2.3021C1.74385 2.0209 1.9688 1.7959 2.2501 1.7959ZM1.74385 15.8021V11.8365H5.45635V15.3084H2.2501C1.9688 15.3084 1.74385 15.0834 1.74385 15.8021ZM15.7501 16.3084H12.5438V11.8365H16.2563V15.8021C16.2563 16.0834 16.0313 16.3084 15.7501 16.3084Z" fill=""/>
                                        </g>
                                    </svg>
                                    Tables
                                </a>
                            </li>

                            <!-- Charts -->
                            <li>
                                <a href="{{ route('charts') }}" class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-gray-700 duration-300 ease-in-out hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 {{ request()->routeIs('charts') ? 'bg-gray-100 dark:bg-gray-700' : '' }}">
                                    <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.8754 4.87544C15.3754 4.37544 14.6254 4.37544 14.1254 4.87544L11.5129 7.48794C11.0129 7.98794 11.0129 8.73794 11.5129 9.23794L13.1254 10.8504C13.6254 11.3504 14.3754 11.3504 14.8754 10.8504L17.4879 8.23794C17.9879 7.73794 17.9879 6.98794 17.4879 6.48794L15.8754 4.87544Z" fill=""/>
                                        <path d="M10.4254 9.23794L8.81289 7.62544C8.31289 7.12544 7.56289 7.12544 7.06289 7.62544L4.45039 10.2379C3.95039 10.7379 3.95039 11.4879 4.45039 11.9879L6.06289 13.6004C6.56289 14.1004 7.31289 14.1004 7.81289 13.6004L10.4254 10.9879C10.9254 10.4879 10.9254 9.73794 10.4254 9.23794Z" fill=""/>
                                        <path d="M2.43789 11.9879L0.825391 10.3754C0.325391 9.87544 0.325391 9.12544 0.825391 8.62544L3.43789 6.01294C3.93789 5.51294 4.68789 5.51294 5.18789 6.01294L6.80039 7.62544C7.30039 8.12544 7.30039 8.87544 6.80039 9.37544L4.18789 11.9879C3.68789 12.4879 2.93789 12.4879 2.43789 11.9879Z" fill=""/>
                                    </svg>
                                    Charts
                                </a>
                            </li>

                            <!-- UI Elements -->
                            <li>
                                <a href="{{ route('ui-elements') }}" class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-gray-700 duration-300 ease-in-out hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 {{ request()->routeIs('ui-elements') ? 'bg-gray-100 dark:bg-gray-700' : '' }}">
                                    <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 0H1.5C0.675 0 0 0.675 0 1.5V3.75C0 4.575 0.675 5.25 1.5 5.25H3.75C4.575 5.25 5.25 4.575 5.25 3.75V1.5C5.25 0.675 4.575 0 3.75 0Z" fill=""/>
                                        <path d="M10.5 0H8.25C7.425 0 6.75 0.675 6.75 1.5V3.75C6.75 4.575 7.425 5.25 8.25 5.25H10.5C11.325 5.25 12 4.575 12 3.75V1.5C12 0.675 11.325 0 10.5 0Z" fill=""/>
                                        <path d="M16.5 0H14.25C13.425 0 12.75 0.675 12.75 1.5V3.75C12.75 4.575 13.425 5.25 14.25 5.25H16.5C17.325 5.25 18 4.575 18 3.75V1.5C18 0.675 17.325 0 16.5 0Z" fill=""/>
                                        <path d="M3.75 6.75H1.5C0.675 6.75 0 7.425 0 8.25V10.5C0 11.325 0.675 12 1.5 12H3.75C4.575 12 5.25 11.325 5.25 10.5V8.25C5.25 7.425 4.575 6.75 3.75 6.75Z" fill=""/>
                                        <path d="M10.5 6.75H8.25C7.425 6.75 6.75 7.425 6.75 8.25V10.5C6.75 11.325 7.425 12 8.25 12H10.5C11.325 12 12 11.325 12 10.5V8.25C12 7.425 11.325 6.75 10.5 6.75Z" fill=""/>
                                        <path d="M16.5 6.75H14.25C13.425 6.75 12.75 7.425 12.75 8.25V10.5C12.75 11.325 13.425 12 14.25 12H16.5C17.325 12 18 11.325 18 10.5V8.25C18 7.425 17.325 6.75 16.5 6.75Z" fill=""/>
                                        <path d="M3.75 12.75H1.5C0.675 12.75 0 13.425 0 14.25V16.5C0 17.325 0.675 18 1.5 18H3.75C4.575 18 5.25 17.325 5.25 16.5V14.25C5.25 13.425 4.575 12.75 3.75 12.75Z" fill=""/>
                                        <path d="M10.5 12.75H8.25C7.425 12.75 6.75 13.425 6.75 14.25V16.5C6.75 17.325 7.425 18 8.25 18H10.5C11.325 18 12 17.325 12 16.5V14.25C12 13.425 11.325 12.75 10.5 12.75Z" fill=""/>
                                        <path d="M16.5 12.75H14.25C13.425 12.75 12.75 13.425 12.75 14.25V16.5C12.75 17.325 13.425 18 14.25 18H16.5C17.325 18 18 17.325 18 16.5V14.25C18 13.425 17.325 12.75 16.5 12.75Z" fill=""/>
                                    </svg>
                                    UI Elements
                                </a>
                            </li>

                            <!-- Calendar -->
                            <li>
                                <a href="{{ route('calendar') }}" class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-gray-700 duration-300 ease-in-out hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 {{ request()->routeIs('calendar') ? 'bg-gray-100 dark:bg-gray-700' : '' }}">
                                    <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.75 2.25H14.25V1.5C14.25 1.08579 13.9142 0.75 13.5 0.75C13.0858 0.75 12.75 1.08579 12.75 1.5V2.25H5.25V1.5C5.25 1.08579 4.91421 0.75 4.5 0.75C4.08579 0.75 3.75 1.08579 3.75 1.5V2.25H2.25C1.00736 2.25 0 3.25736 0 4.5V15.75C0 16.9926 1.00736 18 2.25 18H15.75C16.9926 18 18 16.9926 18 15.75V4.5C18 3.25736 16.9926 2.25 15.75 2.25ZM16.5 15.75C16.5 16.1642 16.1642 16.5 15.75 16.5H2.25C1.83579 16.5 1.5 16.1642 1.5 15.75V7.5H16.5V15.75ZM16.5 6H1.5V4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H3.75V4.5C3.75 4.91421 4.08579 5.25 4.5 5.25C4.91421 5.25 5.25 4.91421 5.25 4.5V3.75H12.75V4.5C12.75 4.91421 13.0858 5.25 13.5 5.25C13.9142 5.25 14.25 4.91421 14.25 4.5V3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5V6Z" fill=""/>
                                    </svg>
                                    Calendar
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Settings Group -->
                    <div>
                        <h3 class="mb-4 ml-4 text-sm font-semibold text-gray-400 dark:text-gray-500">SETTINGS</h3>

                        <ul class="mb-6 flex flex-col gap-1.5">
                            <!-- Profile -->
                            <li>
                                <a href="{{ route('profile.edit') }}" class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-gray-700 duration-300 ease-in-out hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 {{ request()->routeIs('profile.*') ? 'bg-gray-100 dark:bg-gray-700' : '' }}">
                                    <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.0002 0.618652C4.25645 0.618652 0.393945 4.48115 0.393945 9.22490C0.393945 13.9687 4.25645 17.8312 9.0002 17.8312C13.744 17.8312 17.6065 13.9687 17.6065 9.22490C17.6065 4.48115 13.744 0.618652 9.0002 0.618652ZM9.0002 3.93115C10.5877 3.93115 11.8752 5.21865 11.8752 6.80615C11.8752 8.39365 10.5877 9.68115 9.0002 9.68115C7.41270 9.68115 6.12520 8.39365 6.12520 6.80615C6.12520 5.21865 7.41270 3.93115 9.0002 3.93115ZM9.0002 15.7562C7.16895 15.7562 5.50020 15.0375 4.25645 13.8562C4.50645 12.5687 5.73145 11.5875 7.16895 11.5875H10.8314C12.2689 11.5875 13.494 12.5687 13.744 13.8562C12.5002 15.0375 10.8314 15.7562 9.0002 15.7562Z" fill=""/>
                                    </svg>
                                    Profile
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>

        <!-- Content Area -->
        <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <!-- Header -->
            <header class="sticky top-0 z-40 flex w-full bg-white drop-shadow-1 dark:bg-gray-800 dark:drop-shadow-none">
                <div class="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                    <div class="flex items-center gap-2 sm:gap-4 lg:hidden">
                        <!-- Hamburger Toggle Button -->
                        <button @click="sidebarOpen = !sidebarOpen" aria-controls="sidebar" class="z-50 block rounded-sm border border-gray-200 bg-white p-1.5 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:hidden">
                            <span class="relative block h-5.5 w-5.5 cursor-pointer">
                                <span class="du-block absolute right-0 h-full w-full">
                                    <span class="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-gray-900 delay-[0] duration-200 ease-in-out dark:bg-white" :class="!sidebarOpen && '!w-full delay-300'"></span>
                                    <span class="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-gray-900 delay-150 duration-200 ease-in-out dark:bg-white" :class="!sidebarOpen && '!w-full delay-400'"></span>
                                    <span class="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-gray-900 delay-200 duration-200 ease-in-out dark:bg-white" :class="!sidebarOpen && '!w-full delay-500'"></span>
                                </span>
                                <span class="absolute right-0 h-full w-full rotate-45">
                                    <span class="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-gray-900 delay-300 duration-200 ease-in-out dark:bg-white" :class="!sidebarOpen && '!h-0 !delay-[0]'"></span>
                                    <span class="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-gray-900 duration-200 ease-in-out dark:bg-white" :class="!sidebarOpen && '!h-0 !delay-200'"></span>
                                </span>
                            </span>
                        </button>
                    </div>

                    <div class="flex items-center gap-3 2xsm:gap-7">
                        <!-- Dark Mode Toggle -->
                        <button @click="darkMode = !darkMode" class="flex h-8.5 w-8.5 items-center justify-center rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <svg x-show="!darkMode" class="fill-current text-gray-700" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0C8.36819 0 8.66667 0.298477 8.66667 0.666667V2C8.66667 2.36819 8.36819 2.66667 8 2.66667C7.63181 2.66667 7.33333 2.36819 7.33333 2V0.666667C7.33333 0.298477 7.63181 0 8 0Z" fill=""/>
                                <path d="M8 13.3333C8.36819 13.3333 8.66667 13.6318 8.66667 14V15.3333C8.66667 15.7015 8.36819 16 8 16C7.63181 16 7.33333 15.7015 7.33333 15.3333V14C7.33333 13.6318 7.63181 13.3333 8 13.3333Z" fill=""/>
                                <path d="M13.6569 2.34315C13.9178 2.60401 13.9178 3.02633 13.6569 3.28719L12.714 4.23011C12.4531 4.49096 12.0308 4.49096 11.77 4.23011C11.5091 3.96925 11.5091 3.54693 11.77 3.28607L12.7129 2.34315C12.9738 2.08229 13.3961 2.08229 13.6569 2.34315Z" fill=""/>
                                <path d="M4.23011 11.77C4.49096 11.5091 4.49096 11.0868 4.23011 10.826C3.96925 10.5651 3.54693 10.5651 3.28607 10.826L2.34315 11.7689C2.08229 12.0297 2.08229 12.4521 2.34315 12.7129C2.60401 12.9738 3.02633 12.9738 3.28719 12.7129L4.23011 11.77Z" fill=""/>
                                <path d="M16 8C16 8.36819 15.7015 8.66667 15.3333 8.66667H14C13.6318 8.66667 13.3333 8.36819 13.3333 8C13.3333 7.63181 13.6318 7.33333 14 7.33333H15.3333C15.7015 7.33333 16 7.63181 16 8Z" fill=""/>
                                <path d="M2.66667 8C2.66667 8.36819 2.36819 8.66667 2 8.66667H0.666667C0.298477 8.66667 0 8.36819 0 8C0 7.63181 0.298477 7.33333 0.666667 7.33333H2C2.36819 7.33333 2.66667 7.63181 2.66667 8Z" fill=""/>
                                <path d="M13.6569 12.7129C13.9178 12.9738 13.9178 13.3961 13.6569 13.6569C13.3961 13.9178 12.9738 13.9178 12.7129 13.6569L11.77 12.714C11.5091 12.4531 11.5091 12.0308 11.77 11.77C12.0308 11.5091 12.4531 11.5091 12.714 11.77L13.6569 12.7129Z" fill=""/>
                                <path d="M4.23011 4.23011C4.49096 4.49096 4.49096 4.91328 4.23011 5.17414C3.96925 5.435 3.54693 5.435 3.28607 5.17414L2.34315 4.23122C2.08229 3.97036 2.08229 3.54804 2.34315 3.28718C2.60401 3.02633 3.02633 3.02633 3.28719 3.28718L4.23011 4.23011Z" fill=""/>
                                <path d="M8 4.66667C6.15905 4.66667 4.66667 6.15905 4.66667 8C4.66667 9.84095 6.15905 11.3333 8 11.3333C9.84095 11.3333 11.3333 9.84095 11.3333 8C11.3333 6.15905 9.84095 4.66667 8 4.66667Z" fill=""/>
                            </svg>
                            <svg x-show="darkMode" class="fill-current text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.3533 10.62C14.2466 10.44 13.9466 10.16 13.1999 10.2933C12.7866 10.3667 12.3666 10.4 11.9533 10.38C10.3933 10.3133 8.98659 9.6 8.00659 8.5C7.13993 7.53333 6.60659 6.27333 6.59993 4.91333C6.59993 4.15333 6.74659 3.42 7.04659 2.72666C7.33993 2.05333 7.13326 1.7 6.98659 1.55333C6.83326 1.4 6.47326 1.18666 5.76659 1.48C3.03993 2.62666 1.35326 5.36 1.55326 8.28666C1.75326 11.04 3.68659 13.3933 6.24659 14.28C6.85993 14.4933 7.50659 14.62 8.17326 14.6467C8.27993 14.6533 8.38659 14.66 8.49326 14.66C10.7266 14.66 12.8199 13.6067 14.1399 11.8133C14.5866 11.1933 14.4666 10.8 14.3533 10.62Z" fill=""/>
                            </svg>
                        </button>

                        <!-- User Area -->
                        <div class="relative" x-data="{ dropdownOpen: false }">
                            <button @click="dropdownOpen = ! dropdownOpen" class="flex items-center gap-4">
                                <span class="hidden text-right lg:block">
                                    <span class="block text-sm font-medium text-gray-900 dark:text-white">
                                        {{ Auth::user()->name }}
                                    </span>
                                    <span class="block text-xs">{{ Auth::user()->email }}</span>
                                </span>

                                <span class="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <span class="text-gray-700 dark:text-gray-300 font-semibold">{{ substr(Auth::user()->name, 0, 1) }}</span>
                                </span>

                                <svg class="hidden fill-current sm:block" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z" fill=""/>
                                </svg>
                            </button>

                            <!-- Dropdown Menu -->
                            <div x-show="dropdownOpen" @click.outside="dropdownOpen = false" class="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                                <ul class="flex flex-col overflow-y-auto border-b border-gray-200 dark:border-gray-700">
                                    <li>
                                        <a href="{{ route('profile.edit') }}" class="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-700 lg:text-base">
                                            <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z" fill=""/>
                                                <path d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.5375 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.5375Z" fill=""/>
                                            </svg>
                                            My Profile
                                        </a>
                                    </li>
                                </ul>
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button type="submit" class="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-700 lg:text-base w-full text-left">
                                        <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z" fill=""/>
                                            <path d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z" fill=""/>
                                        </svg>
                                        Log Out
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Main Content -->
            <main class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                @yield('content')
            </main>
        </div>
    </div>

    <!-- Alpine.js for interactivity -->
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
</body>
</html>
