var jmData = {
	"title": "TDF Service Center",
	"colSize": "col-lg-3",
	"timer": "60000",
	"data": [
		{	"jenkinsUrl": "http://10.78.216.18:8080/",
			"projects": [
				{	"projectName": "NSTG-ASF",
					"jobs": [
						{ "jobName": "ASF_ORDO_J4_J6" },
						{ "jobName": "ASF_DIFF_GIT_SYC" },
						{ "jobName": "ASF", "results": [ "findbugs" ] }
					]
				},
				{	"projectName": "NSTG-FH_NUM",
					"jobs": [
						{ "jobName": "FH_NUM_ORDO_J4_J6" },
						{ "jobName": "FH_NUM_DIFF_GIT_SYC" },
						{ "jobName": "FH_NUM", "results": [ "findbugs" ] }
					]
				},
				{	"projectName": "NSTG-MEDIATION",
					"jobs": [
						{ "jobName": "MEDIATION_ORDO_J7" },
						{ "jobName": "MEDIATION_DIFF_GIT_SYC" },
						{ "jobName": "MEDIATION", "results": [ "findbugs" ] }
					]
				},
				{	"projectName": "NSTG-RADIO",
					"jobs": [
						{ "jobName": "RADIO_ORDO_J4_J6" },
						{ "jobName": "RADIO_DIFF_GIT_SYC" },
						{ "jobName": "RADIO", "results": [ "findbugs" ] }
					]
				},
				{	"projectName": "NSTG-RSP",
					"jobs": [
						{ "jobName": "RSP_ORDO_J4_J6" },
						{ "jobName": "RSP_DIFF_GIT_SYC" },
						{ "jobName": "RSP", "results": [ "findbugs" ] }
					]
				},
				{	"projectName": "NSTG-TNT",
					"jobs": [
						{ "jobName": "TNT_ORDO_J4_J6" },
						{ "jobName": "TNT_DIFF_GIT_SYC" },
						{ "jobName": "TNT", "results": [ "findbugs" ] }
					]
				}
			]
		},
		{	"jenkinsUrl": "http://10.78.216.47:8080/",
			"projects": [
				{	"projectName": "CRISTAL",
					"jobs": [
						{ "jobName": "Cristal_Selenium" },
						{ "jobName": "Delivery" },
						{ "jobName": "New_Cristal", "results": [ "pmd", "checkstyle", "dry" ], "reports": [ "test" ] }
					]
				}
			]
		}
	]
};