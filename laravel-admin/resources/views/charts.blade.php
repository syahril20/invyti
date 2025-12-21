@extends('layouts.admin')

@section('title', 'Charts')

@section('content')
    <!-- Breadcrumb -->
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title-md2 font-semibold text-gray-900 dark:text-white">
            Charts
        </h2>

        <nav>
            <ol class="flex items-center gap-2">
                <li>
                    <a class="font-medium text-gray-600 dark:text-gray-400" href="{{ route('dashboard') }}">Dashboard /</a>
                </li>
                <li class="font-medium text-blue-600">Charts</li>
            </ol>
        </nav>
    </div>

    <div class="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <!-- Bar Chart -->
        <div class="col-span-12 xl:col-span-6">
            <div class="rounded-sm border border-gray-200 bg-white px-5 pb-5 pt-7.5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:px-7.5">
                <div class="mb-3 justify-between gap-4 sm:flex">
                    <div>
                        <h5 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Bar Chart
                        </h5>
                    </div>
                </div>

                <div class="mb-2">
                    <div id="chartBar"></div>
                </div>
            </div>
        </div>

        <!-- Line Chart -->
        <div class="col-span-12 xl:col-span-6">
            <div class="rounded-sm border border-gray-200 bg-white px-5 pb-5 pt-7.5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:px-7.5">
                <div class="mb-3 justify-between gap-4 sm:flex">
                    <div>
                        <h5 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Line Chart
                        </h5>
                    </div>
                </div>

                <div class="mb-2">
                    <div id="chartLine"></div>
                </div>
            </div>
        </div>

        <!-- Area Chart -->
        <div class="col-span-12">
            <div class="rounded-sm border border-gray-200 bg-white px-5 pb-5 pt-7.5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:px-7.5">
                <div class="mb-3 justify-between gap-4 sm:flex">
                    <div>
                        <h5 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Area Chart
                        </h5>
                    </div>
                </div>

                <div class="mb-2">
                    <div id="chartArea"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- ApexCharts CDN -->
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script>
        // Bar Chart
        const barChartOptions = {
            series: [{
                name: 'Sales',
                data: [44, 55, 41, 67, 22, 43, 65]
            }],
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false
                }
            },
            colors: ['#3b82f6'],
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            theme: {
                mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            }
        };
        const barChart = new ApexCharts(document.querySelector("#chartBar"), barChartOptions);
        barChart.render();

        // Line Chart
        const lineChartOptions = {
            series: [{
                name: "Revenue",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            }],
            chart: {
                height: 350,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            colors: ['#10b981'],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
            },
            theme: {
                mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            }
        };
        const lineChart = new ApexCharts(document.querySelector("#chartLine"), lineChartOptions);
        lineChart.render();

        // Area Chart
        const areaChartOptions = {
            series: [{
                name: 'Product A',
                data: [31, 40, 28, 51, 42, 109, 100]
            }, {
                name: 'Product B',
                data: [11, 32, 45, 32, 34, 52, 41]
            }],
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            colors: ['#3b82f6', '#8b5cf6'],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
            },
            theme: {
                mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            }
        };
        const areaChart = new ApexCharts(document.querySelector("#chartArea"), areaChartOptions);
        areaChart.render();
    </script>
@endsection
