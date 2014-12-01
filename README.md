jenkins-monitor
===============

Html page to gather data of multiple jenkins.

Build status and weather, results and trend of plugin reports clearly visible.


**Configure the display in the file 'jenkinsMonitorContent/jenkinsMonitor-config.js'.**

* "title" is the upper-left title
* "colSize": is the bootstrap column width ("col-lg-4" => 3 columns, "col-lg-3" => 4 columns, "col-lg-2" => 6 columns)
* "timer": auto-refresh timer (in milliseconds)
* "data": array of "jenkins"
  * "jenkinsUrl": jenkins URL (with a '/' at the end)
  * "projects": array of job groups 
    * "projectName": a name for the panel
    * "jobs": array of jenkins jobs 
      * "jobName": name of the job in jenkins (=> URL : <jenkinsUrl>job/<jobName>)
      * "results": array of plugins result (=> URL : <jenkinsUrl>job/<jobName>/<result>Result). Example: "checkstyle", "dry", "findbugs", "pmd"...
      * "reports": array of reports (=> URL : <jenkinsUrl>job/<jobName>/<result>Report). Example: "test"
