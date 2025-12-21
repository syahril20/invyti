@extends('layouts.admin')

@section('title', 'Calendar')

@section('content')
    <!-- Breadcrumb -->
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title-md2 font-semibold text-gray-900 dark:text-white">
            Calendar
        </h2>

        <nav>
            <ol class="flex items-center gap-2">
                <li>
                    <a class="font-medium text-gray-600 dark:text-gray-400" href="{{ route('dashboard') }}">Dashboard /</a>
                </li>
                <li class="font-medium text-blue-600">Calendar</li>
            </ol>
        </nav>
    </div>

    <!-- Calendar -->
    <div class="rounded-sm border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div class="p-4 md:p-6 2xl:p-10">
            <div id="calendar"></div>
        </div>
    </div>

    <!-- FullCalendar CDN -->
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.9/index.global.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.9/index.global.min.js"></script>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const calendarEl = document.getElementById('calendar');
            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                events: [
                    {
                        title: 'Team Meeting',
                        start: '2025-01-15T10:00:00',
                        end: '2025-01-15T11:00:00',
                        backgroundColor: '#3b82f6'
                    },
                    {
                        title: 'Project Deadline',
                        start: '2025-01-20',
                        backgroundColor: '#ef4444'
                    },
                    {
                        title: 'Conference',
                        start: '2025-01-25',
                        end: '2025-01-27',
                        backgroundColor: '#10b981'
                    }
                ],
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                weekends: true
            });
            calendar.render();
        });
    </script>
@endsection
