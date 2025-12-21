@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')
    <!-- Breadcrumb -->
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title-md2 font-semibold text-gray-900 dark:text-white">
            Dashboard
        </h2>

        <nav>
            <ol class="flex items-center gap-2">
                <li>
                    <a class="font-medium text-gray-600 dark:text-gray-400" href="{{ route('dashboard') }}">Dashboard</a>
                </li>
            </ol>
        </nav>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <!-- Card Item -->
        <div class="rounded-sm border border-gray-200 bg-white px-7.5 py-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <svg class="fill-blue-600 dark:fill-blue-400" width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z" fill=""/>
                    <path d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z" fill=""/>
                </svg>
            </div>

            <div class="mt-4 flex items-end justify-between">
                <div>
                    <h4 class="text-title-md font-bold text-gray-900 dark:text-white">
                        3.456
                    </h4>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Total views</span>
                </div>

                <span class="flex items-center gap-1 text-sm font-medium text-green-600">
                    0.43%
                    <svg class="fill-current" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" fill=""/>
                    </svg>
                </span>
            </div>
        </div>

        <!-- Card Item -->
        <div class="rounded-sm border border-gray-200 bg-white px-7.5 py-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <svg class="fill-green-600 dark:fill-green-400" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 3.02816 21.3813 3.96566 21.3813H18C18.9719 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.4907 19.8344 18.0344 19.8344H3.96566C3.50941 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z" fill=""/>
                    <path d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.18139 8.35313 8.18139 6.80625C8.18139 6.6 8.21577 6.42813 8.25014 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73764 5.87813C6.66889 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z" fill=""/>
                </svg>
            </div>

            <div class="mt-4 flex items-end justify-between">
                <div>
                    <h4 class="text-title-md font-bold text-gray-900 dark:text-white">
                        $45,2K
                    </h4>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Profit</span>
                </div>

                <span class="flex items-center gap-1 text-sm font-medium text-green-600">
                    4.35%
                    <svg class="fill-current" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" fill=""/>
                    </svg>
                </span>
            </div>
        </div>

        <!-- Card Item -->
        <div class="rounded-sm border border-gray-200 bg-white px-7.5 py-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <svg class="fill-purple-600 dark:fill-purple-400" width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z" fill=""/>
                    <path d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z" fill=""/>
                    <path d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z" fill=""/>
                </svg>
            </div>

            <div class="mt-4 flex items-end justify-between">
                <div>
                    <h4 class="text-title-md font-bold text-gray-900 dark:text-white">
                        2.450
                    </h4>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Product</span>
                </div>

                <span class="flex items-center gap-1 text-sm font-medium text-green-600">
                    2.59%
                    <svg class="fill-current" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" fill=""/>
                    </svg>
                </span>
            </div>
        </div>

        <!-- Card Item -->
        <div class="rounded-sm border border-gray-200 bg-white px-7.5 py-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <svg class="fill-red-600 dark:fill-red-400" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z" fill=""/>
                    <path d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z" fill=""/>
                    <path d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C13.4375 14.7812 13.8844 14.4375 14.0219 13.9562L16.9125 2.26874C16.9125 2.19999 16.9125 2.16562 16.9812 2.16562H19.0062C19.4187 2.16562 19.8312 1.75312 19.8312 1.34062C19.8312 0.928119 19.4187 0.618744 19.0062 0.618744ZM13.0219 13.2C12.9875 13.2344 12.9531 13.2344 12.9187 13.2344H3.46873C3.43436 13.2344 3.39998 13.2344 3.36561 13.2L1.36873 7.56249H14.7094L13.0219 13.2Z" fill=""/>
                </svg>
            </div>

            <div class="mt-4 flex items-end justify-between">
                <div>
                    <h4 class="text-title-md font-bold text-gray-900 dark:text-white">
                        3.456
                    </h4>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</span>
                </div>

                <span class="flex items-center gap-1 text-sm font-medium text-red-600">
                    0.95%
                    <svg class="fill-current" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z" fill=""/>
                    </svg>
                </span>
            </div>
        </div>
    </div>

    <!-- Charts and Tables Section -->
    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <!-- Chart -->
        <div class="col-span-12 rounded-sm border border-gray-200 bg-white px-5 pb-5 pt-7.5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:col-span-8">
            <div class="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div class="flex w-full flex-wrap gap-3 sm:gap-5">
                    <div class="flex min-w-47.5">
                        <span class="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-blue-600">
                            <span class="block h-2.5 w-full max-w-2.5 rounded-full bg-blue-600"></span>
                        </span>
                        <div class="w-full">
                            <p class="font-semibold text-blue-600">Total Revenue</p>
                            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">12.04.2022 - 12.05.2022</p>
                        </div>
                    </div>
                    <div class="flex min-w-47.5">
                        <span class="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-green-600">
                            <span class="block h-2.5 w-full max-w-2.5 rounded-full bg-green-600"></span>
                        </span>
                        <div class="w-full">
                            <p class="font-semibold text-green-600">Total Sales</p>
                            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">12.04.2022 - 12.05.2022</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div id="chartOne" class="-ml-5"></div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="col-span-12 rounded-sm border border-gray-200 bg-white px-5 pb-5 pt-7.5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:px-7.5 xl:col-span-4">
            <h4 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
            </h4>

            <div>
                <div class="flex items-center gap-3 border-b border-gray-200 pb-5 dark:border-gray-700">
                    <div class="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <svg class="fill-blue-600" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18Z" fill=""/>
                            <path d="M11 5H9V11H15V9H11V5Z" fill=""/>
                        </svg>
                    </div>
                    <div class="flex-1">
                        <h5 class="font-semibold text-gray-900 dark:text-white">
                            New user registered
                        </h5>
                        <span class="text-sm text-gray-600 dark:text-gray-400">2 min ago</span>
                    </div>
                </div>

                <div class="flex items-center gap-3 border-b border-gray-200 py-5 dark:border-gray-700">
                    <div class="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <svg class="fill-green-600" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18Z" fill=""/>
                            <path d="M14.7071 6.29289L8 13L5.29289 10.2929L6.70711 8.87868L8 10.1716L13.2929 4.87868L14.7071 6.29289Z" fill=""/>
                        </svg>
                    </div>
                    <div class="flex-1">
                        <h5 class="font-semibold text-gray-900 dark:text-white">
                            New order received
                        </h5>
                        <span class="text-sm text-gray-600 dark:text-gray-400">15 min ago</span>
                    </div>
                </div>

                <div class="flex items-center gap-3 pt-5">
                    <div class="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <svg class="fill-purple-600" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18Z" fill=""/>
                            <path d="M10 5C9.44772 5 9 5.44772 9 6V10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10V6C11 5.44772 10.5523 5 10 5Z" fill=""/>
                            <path d="M10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13Z" fill=""/>
                        </svg>
                    </div>
                    <div class="flex-1">
                        <h5 class="font-semibold text-gray-900 dark:text-white">
                            System update completed
                        </h5>
                        <span class="text-sm text-gray-600 dark:text-gray-400">1 hour ago</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
