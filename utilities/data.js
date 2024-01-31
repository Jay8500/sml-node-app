module.exports = {
    "architect": [
        {
            "get": [
                {
                    "instancename": "first"
                },
                {
                    "instancename": "second"
                },
                {
                    "instancename": "first-report",
                    "REPORT": true,
                    "reportCall": {
                        "reportName": {
                            "name": "Jay Fourth Report",
                            "mergeCells": "A1:C1",
                            "font": {
                                "bold": true,
                                "size": 20,
                                "underline": true,
                                "horizontal": 'center',
                                "color": { "argb": 'FF00FF00' },
                                "bgColor": { "argb": 'FF0000FF' },
                                "fgColor": { "argb": 'FFFFFF00' },
                            },
                            "alignment": { "vertical": 'middle', "horizontal": 'center' }
                        },
                        "headers": [
                            {
                                "cellNo": 'A4',
                                "columnWidth": 20,
                                "sno": 1,
                                "name": 'SNO',
                                "key": 'fn',
                                "font": {
                                    "bold": true,
                                    "size": 20,
                                    "underline": false,
                                    "vertical": 'right',
                                    "color": { "argb": 'FF00FF00' }
                                },
                                "alignment": {
                                    "vertical": 'middle',
                                    "horizontal": 'right'
                                }
                            },
                            {
                                "cellNo": 'B4',
                                "columnWidth": 20,
                                "sno": 2,
                                "name": 'Name',
                                "key": 'fn',
                                "font": {
                                    "bold": true,
                                    "size": 20,
                                    "underline": false,
                                    "vertical": 'right',
                                    "color": { "argb": 'ffff6347' }
                                },
                                "alignment": {
                                    "vertical": 'middle',
                                    "horizontal": 'left'
                                }
                            },
                            {
                                "cellNo": 'C4',
                                "columnWidth": 20,
                                "sno": 2,
                                "name": 'Age',
                                "key": 'fn',
                                "font": {
                                    "bold": true,
                                    "size": 20,
                                    "underline": false,
                                    "vertical": 'right',
                                    "color": { "argb": 'ffff6347' }
                                },
                                "alignment": {
                                    "vertical": 'middle',
                                    "horizontal": 'right'
                                }
                            }
                        ],
                        "data": [
                            {
                                sno: 1,
                                name: 'Leenattttttttttttgghgjhjhjhgjhgjghjghjghjhgjhg',
                                age: 12
                            },
                            {
                                sno: 2,
                                name: 'Jawan',
                                age: 34
                            },
                            {
                                sno: 3,
                                name: 'Bahubali',
                                age: 20
                            }
                        ]
                    }
                },
                {
                    "instancename": "second-report",
                    "REPORT": true,
                    "reportCall": {
                        "reportName": "Jay sixth Report",
                        "headers": [
                            {
                                sno: 1,
                                name: 'SNO',
                                key: 'fn'

                            },
                            {
                                sno: 2,
                                name: 'Name',
                                key: 'fn'
                            }
                        ],
                        "data": [
                            {
                                sno: 1,
                                name: 'Princess',
                            },
                            {
                                sno: 2,
                                name: 'Jawan'
                            },
                            {
                                sno: 3,
                                name: 'Bahubali'
                            }
                        ]
                    }
                }
            ],
            "post": [
                {
                    "instancename": "firstpost"
                },
                {
                    "instancename": "second"
                }
            ]
        }
    ]
};
