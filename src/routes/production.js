module.exports = [
    {
        route: 'production/spinning/winding/winding-quality-sampling',
        name: 'winding-quality-sampling',
        moduleId: './modules/production/spinning/winding/winding-quality-sampling/index',
        nav: true,
        title: 'Quality Hasil Produksi Spinning',
        auth: true,
        settings: {
            group: "production",
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'production/spinning/winding/winding-quality-sampling/report',
        name: 'winding-quality-sampling-report',
        moduleId: './modules/production/spinning/winding/reports/winding-quality-sampling-report/index',
        nav: true,
        title: 'Laporan Quality Hasil Produksi Spinning',
        auth: true,
        settings: {
            group: "production",
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/winding/winding-production-output',
        name: 'winding-production-output',
        moduleId: './modules/production/spinning/winding/winding-production-output/index',
        nav: true,
        title: 'Output Hasil Produksi Spinning',
        auth: true,
        settings: {
            group: "production",
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/winding/reports/daily-spinning-production-report',
        name: 'daily-spinning-production-report',
        moduleId: './modules/production/spinning/winding/reports/daily-spinning-production-report/index',
        nav: true,
        title: 'Monitoring Output Hasil Produksi Spinning',
        auth: true,
        settings: {
            group: "production",
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/finishing-printing/daily-operation',
        name: 'dailys',
        moduleId: './modules/production/finishing-printing/daily-operation/index',
        nav: true,
        title: 'Monitoring Operasional Harian',
        auth: true,
        settings: {
            group: "production",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/finishing-printing/reports/daily-operation-report',
        name: 'report-dailys',
        moduleId: './modules/production/finishing-printing/reports/daily-operation-report/index',
        nav: true,
        title: 'Laporan Monitoring Operasional Harian',
        auth: true,
        settings: {
            group: "production",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/finishing-printing/monitoring-event',
        name: 'monitoring-event',
        moduleId: './modules/production/finishing-printing/monitoring-event/index',
        nav: true,
        title: 'Monitoring Event',
        auth: true,
        settings: {
            group: "production",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/finishing-printing/reports/monitoring-event-report',
        name: 'report-monitoring-events',
        moduleId: './modules/production/finishing-printing/reports/monitoring-event-report/index',
        nav: true,
        title: 'Report Monitoring Event',
        auth: true,
        settings: {
            group: "production",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }

    },
    {
        route: 'production/finishing-printing/monitoring-specification-machine',
        name: 'monitoring-specification-machine',
        moduleId: './modules/production/finishing-printing/monitoring-specification-machine/index',
        nav: true,
        title: 'Monitoring Spesifikasi Mesin',
        auth: true,
        settings: {
            group: "production",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/finishing-printing/reports/monitoring-specification-machine-report',
        name: 'monitoring-specification-machine-report',
        moduleId: './modules/production/finishing-printing/reports/monitoring-specification-machine-report/index',
        nav: true,
        title: 'Laporan Monitoring Spesifikasi Mesin',
        auth: true,
        settings: {
            group: "production",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/finishing-printing/kanban',
        name: 'kanban',
        moduleId: './modules/production/finishing-printing/kanban/index',
        nav: true,
        title: 'Kanban',
        auth: true,
        settings: {
            group: "production",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/finishing-printing/monitoring-kanban',
        name: 'monitoring-kanban',
        moduleId: './modules/production/finishing-printing/monitoring-kanban/index',
        nav: true,
        title: 'Monitoring Kanban',
        auth: true,
        settings: {
            group: "production",
            permission: {"C9": 1, "F1": 1, "F2": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/finishing-printing/quality-control/defect',
        name: 'report-dailys',
        moduleId: './modules/production/finishing-printing/quality-control/defect/index',
        nav: true,
        title: 'Pencatatan Pemeriksaan Kain',
        auth: true,
        settings: {
            group: "production",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'finishing-printing/reports/fabric-quality-control-report',
        name: 'fabric-quality-control-report',
        moduleId: './modules/production/finishing-printing/reports/fabric-quality-control-report/index',
        nav: true,
        title: 'Laporan Pemeriksaan Kain',
        auth: true,
        settings: {
            group: "production",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/finishing-printing/packing',
        name: 'packing',
        moduleId: './modules/production/finishing-printing/packing/index',
        nav: true,
        title: 'Daftar Packing',
        auth: true,
        settings: {
            group: "production",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/finishing-printing/inspection-lot-color',
        name: 'inspection-lot-colors',
        moduleId: './modules/production/finishing-printing/inspection-lot-color/index',
        nav: true,
        title: 'Pencatatan Pemeriksaan Lot Warna',
        auth: true,
        settings: {
            group: "production",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'finishing-printing/reports/inspection-lot-color-report',
        name: 'inspection-lot-color-report',
        moduleId: './modules/production/finishing-printing/reports/inspection-lot-color-report/index',
        nav: true,
        title: 'Laporan Pemeriksaan Lot Warna',
        auth: true,
        settings: {
            group: "production",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'finishing-printing/reports/stock-movement-report',
        name: 'stock-movement-report',
        moduleId: './modules/production/finishing-printing/reports/stock-movement-report/index',
        nav: true,
        title: 'Laporan Stock Movement',
        auth: true,
        settings: {
            group: "production",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    }
    ]


