@extends('layouts.admin')

@section('title', 'UI Elements')

@section('content')
    <!-- Breadcrumb -->
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title-md2 font-semibold text-gray-900 dark:text-white">
            UI Elements
        </h2>

        <nav>
            <ol class="flex items-center gap-2">
                <li>
                    <a class="font-medium text-gray-600 dark:text-gray-400" href="{{ route('dashboard') }}">Dashboard /</a>
                </li>
                <li class="font-medium text-blue-600">UI Elements</li>
            </ol>
        </nav>
    </div>

    <!-- Buttons -->
    <div class="rounded-sm border border-gray-200 bg-white p-7.5 shadow-sm dark:border-gray-700 dark:bg-gray-800 mb-6">
        <h4 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
            Buttons
        </h4>

        <div class="flex flex-wrap gap-3">
            <button class="inline-flex items-center justify-center rounded-md bg-blue-600 px-10 py-4 text-center font-medium text-white hover:bg-blue-700 lg:px-8 xl:px-10">
                Primary
            </button>
            <button class="inline-flex items-center justify-center rounded-md bg-green-600 px-10 py-4 text-center font-medium text-white hover:bg-green-700 lg:px-8 xl:px-10">
                Success
            </button>
            <button class="inline-flex items-center justify-center rounded-md bg-red-600 px-10 py-4 text-center font-medium text-white hover:bg-red-700 lg:px-8 xl:px-10">
                Danger
            </button>
            <button class="inline-flex items-center justify-center rounded-md bg-gray-600 px-10 py-4 text-center font-medium text-white hover:bg-gray-700 lg:px-8 xl:px-10">
                Secondary
            </button>
        </div>
    </div>

    <!-- Alerts -->
    <div class="rounded-sm border border-gray-200 bg-white p-7.5 shadow-sm dark:border-gray-700 dark:bg-gray-800 mb-6">
        <h4 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
            Alerts
        </h4>

        <div class="flex flex-col gap-4">
            <div class="flex w-full border-l-6 border-blue-600 bg-blue-100 px-7 py-8 shadow-md dark:bg-blue-900 dark:bg-opacity-30 md:p-9">
                <div class="mr-5 flex h-9 w-full max-w-9 items-center justify-center rounded-lg bg-blue-600">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351C7.29375 6.15174 6.94211 6.15174 6.59047 6.50351L1.94286 11.1508C1.61876 11.471 1.61876 11.9841 1.94286 12.3044C2.26696 12.6247 2.78 12.6247 3.10406 12.3044L6.4917 7.65579Z" fill="white"></path>
                        <path d="M6.4917 0.0519043L11.106 4.66056C11.2545 4.80894 11.4715 4.89607 11.6738 4.89607C11.8762 4.89607 12.0931 4.80894 12.2416 4.66056C12.5621 4.34051 12.5623 3.82767 12.2423 3.50713C12.2422 3.50706 12.2422 3.50699 12.2422 3.50692C12.242 3.50672 12.2418 3.50651 12.2416 3.5063L7.64539 -1.10092C7.29375 -1.45269 6.94211 -1.45269 6.59047 -1.10092L1.94286 3.50692C1.61876 3.82722 1.61876 4.34028 1.94286 4.66061C2.26696 4.98091 2.78 4.98091 3.10406 4.66061L6.4917 0.0519043Z" fill="white"></path>
                    </svg>
                </div>
                <div class="w-full">
                    <h5 class="mb-3 text-lg font-semibold text-blue-900 dark:text-blue-100">
                        Info Alert
                    </h5>
                    <p class="text-blue-800 dark:text-blue-200">
                        This is an info alert for displaying information.
                    </p>
                </div>
            </div>

            <div class="flex w-full border-l-6 border-green-600 bg-green-100 px-7 py-8 shadow-md dark:bg-green-900 dark:bg-opacity-30 md:p-9">
                <div class="mr-5 flex h-9 w-full max-w-9 items-center justify-center rounded-lg bg-green-600">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z" fill="white" stroke="white"></path>
                    </svg>
                </div>
                <div class="w-full">
                    <h5 class="mb-3 text-lg font-semibold text-green-900 dark:text-green-100">
                        Success Alert
                    </h5>
                    <p class="text-green-800 dark:text-green-200">
                        This is a success alert for positive actions.
                    </p>
                </div>
            </div>

            <div class="flex w-full border-l-6 border-red-600 bg-red-100 px-7 py-8 shadow-md dark:bg-red-900 dark:bg-opacity-30 md:p-9">
                <div class="mr-5 flex h-9 w-full max-w-9 items-center justify-center rounded-lg bg-red-600">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351C7.29375 6.15174 6.94211 6.15174 6.59047 6.50351L1.94286 11.1508C1.61876 11.471 1.61876 11.9841 1.94286 12.3044C2.26696 12.6247 2.78 12.6247 3.10406 12.3044L6.4917 7.65579Z" fill="white"></path>
                        <path d="M6.4917 0.0519043L11.106 4.66056C11.2545 4.80894 11.4715 4.89607 11.6738 4.89607C11.8762 4.89607 12.0931 4.80894 12.2416 4.66056C12.5621 4.34051 12.5623 3.82767 12.2423 3.50713C12.2422 3.50706 12.2422 3.50699 12.2422 3.50692C12.242 3.50672 12.2418 3.50651 12.2416 3.5063L7.64539 -1.10092C7.29375 -1.45269 6.94211 -1.45269 6.59047 -1.10092L1.94286 3.50692C1.61876 3.82722 1.61876 4.34028 1.94286 4.66061C2.26696 4.98091 2.78 4.98091 3.10406 4.66061L6.4917 0.0519043Z" fill="white"></path>
                    </svg>
                </div>
                <div class="w-full">
                    <h5 class="mb-3 text-lg font-semibold text-red-900 dark:text-red-100">
                        Error Alert
                    </h5>
                    <p class="text-red-800 dark:text-red-200">
                        This is an error alert for critical issues.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Form Elements -->
    <div class="rounded-sm border border-gray-200 bg-white p-7.5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h4 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
            Form Elements
        </h4>

        <form action="#">
            <div class="mb-4.5">
                <label class="mb-3 block text-sm font-medium text-gray-900 dark:text-white">
                    Full Name
                </label>
                <input
                    type="text"
                    placeholder="Enter your full name"
                    class="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 text-gray-900 outline-none transition focus:border-blue-600 active:border-blue-600 disabled:cursor-default disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-600"
                />
            </div>

            <div class="mb-4.5">
                <label class="mb-3 block text-sm font-medium text-gray-900 dark:text-white">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="Enter your email address"
                    class="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 text-gray-900 outline-none transition focus:border-blue-600 active:border-blue-600 disabled:cursor-default disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-600"
                />
            </div>

            <div class="mb-6">
                <label class="mb-3 block text-sm font-medium text-gray-900 dark:text-white">
                    Message
                </label>
                <textarea
                    rows="6"
                    placeholder="Type your message"
                    class="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 text-gray-900 outline-none transition focus:border-blue-600 active:border-blue-600 disabled:cursor-default disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-600"
                ></textarea>
            </div>

            <button class="flex w-full justify-center rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700">
                Send Message
            </button>
        </form>
    </div>
@endsection
