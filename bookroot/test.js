var a =
{
    "/html/app1.html": {
        "main": [
            {
                "src": "/static/js/app/app1.js",
                "dest": "../dest/static/js/app/app1_file_version.js",
                "deps": [
                    "/static/js/libs1/1.js",
                    "/static/js/libs1/2.js"
                ]
            }
        ],
        "async": [
            {
                "src": "/static/js/app/app1.js",
                "dest": "../dest/static/js/app/app1_file_version.js",
                "deps": [
                    "/static/js/libs1/1.js",
                    "/static/js/libs1/2.js"
                ]
            }
        ],
        "js": [
            {
                "dest": "../dest/static/js/jquery_file_version.js",
                "deps": [
                    "/static/js/3rd/jquery.js"
                ]
            }
        ],
        "css": [
            {
                "dest": "../dest/static/css/css1_file_version.css",
                "deps": [
                    {
                        "src": "/static/css/libs/0-normalize.css",
                        "res": []
                    },
                    {
                        "src": "/static/css/libs/1-base.css",
                        "res": []
                    }
                ]
            },
            {
                "dest": "../dest/static/css/css2_file_version.css",
                "deps": [
                    {
                        "src": "/static/css/modules/erp/header.css",
                        "res": [
                            "/static/img/modules/front/public.png"
                        ]
                    },
                    {
                        "src": "/static/css/modules/erp/sidebar.css",
                        "res": [
                            "/static/img/modules/erp/sidebar_icon.png"
                        ]
                    },
                    {
                        "src": "/static/css/modules/erp/footer.css",
                        "res": [
                            "/static/img/modules/front/public.png"
                        ]
                    }
                ]
            }
        ]
    }
}