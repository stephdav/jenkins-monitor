$(document).ready(function() {
	if (typeof(jmData) != 'undefined' && typeof(jmData.data) != 'undefined') {
		initBoard();
		updateBoard();
	}
});

var jsonpUrl = 'api/json?jsonp=?';
var pageContent = 'jenkinsMonitorContent';

function initBoard() {
	$('.pageTitle span.pull-left').text(jmData.title);
	$('#board').empty();
	$.each(jmData.data, function(i, jen) {
		$.each(jen.projects, function(j, prj) {
			prjId = prj.projectName + '-prj';
			var prjElt = '<div class="' + jmData.colSize + '"><div class="project prj-default" id="' + prjId + '"><div class="project-heading">' + prj.projectName + '</div><ul class="list-group">'
			$.each(prj.jobs, function(k, job) {
				jobId = job.jobName + "-j" + i;
				prjElt = prjElt + '<li class="list-group-item" id="' + jobId + '" data-jenkins-url="' + jen.jenkinsUrl + "job/" + job.jobName + '">' + job.jobName + '<img src="' + pageContent + '/images/health-40to59.png" class="img-responsive pull-right"></li>'
				if (typeof(job.reports) != 'undefined' && job.reports.length > 0) {
					$.each(job.reports, function(l, report) {
						prjElt = prjElt + '<li class="list-group-item report ' + jobId + ' ' + report + '" data-jenkins-url="' + jen.jenkinsUrl + 'job/' + job.jobName + '/lastCompletedBuild/' + report + 'Report">' + report + ':&nbsp;<span></span><img src="' + pageContent + '/images/empty32.png" class="img-responsive pull-right"></li>'
					});
				}
				if (typeof(job.results) != 'undefined' && job.results.length > 0) {
					$.each(job.results, function(l, result) {
						prjElt = prjElt + '<li class="list-group-item result ' + jobId + ' ' + result + '" data-jenkins-url="' + jen.jenkinsUrl + 'job/' + job.jobName + '/lastCompletedBuild/' + result + 'Result">' + result + ':&nbsp;<span></span><img src="' + pageContent + '/images/empty32.png" class="img-responsive pull-right"></li>'
					});
				}
			});
			prjElt = prjElt + '</ul></div></div>';
			$('#board').append(prjElt);								
		});
	});

	$("#board").on("click", ".project .list-group li", function() {
		var jUrl = $(this).data("jenkinsUrl");
		//window.location.replace(jUrl);
		window.open(jUrl, '_blank');
	});
}

function updateBoard() {
	$.each(jmData.data, function(i, jen) {
		$.each(jen.projects, function(j, prj) {
			prjId = prj.projectName + '-prj';
			// reset prj status
			$('#'+prjId).removeClass("prj-success prj-warning prj-danger prj-default").addClass("prj-default");
			$.each(prj.jobs, function(k, job) {
				jobId = job.jobName + "-j" + i;
				jobUrl = jen.jenkinsUrl + "job/" + job.jobName + "/";
				updateJob(prjId, jobId, jobUrl);
				if (typeof(job.reports) != 'undefined' && job.reports.length > 0) {
					updateReportJob(jobId, jobUrl, job.reports);
				}
				if (typeof(job.results) != 'undefined' && job.results.length > 0) {
					updateResultJob(jobId, jobUrl, job.results);
				}
			});
			// update prjStatus
		});
	});
	setTimeout("updateBoard();", jmData.timer);
}

function updateJob(prjId, jobId, jobUrl) {
	$('#'+jobId).removeClass("list-group-item-success list-group-item-warning list-group-item-danger").addClass("list-group-item-default");
	$('.report.'+jobId).removeClass("list-group-item-success list-group-item-warning list-group-item-danger").addClass("list-group-item-default");
	$('.result.'+jobId).removeClass("list-group-item-success list-group-item-warning list-group-item-danger").addClass("list-group-item-default");
	$.getJSON(jobUrl + jsonpUrl, function(data) {
		score = 100;
		icon = 'health-80plus.png';
		$.each(data.healthReport, function(i, hr) {
			if (hr.score < score) {
				score = hr.score;
				icon = hr.iconUrl;
			}
		});
		$('#'+jobId).find('img').attr("src", pageContent + '/images/' + icon);

		statusClass = '';
		if (data.color == 'blue' || data.color == 'blue_anime') {
			statusClass = 'list-group-item-success';
			updatePrjStatus(prjId, 1);
		} else if (data.color == 'yellow' || data.color == 'yellow_anime') {
			statusClass = 'list-group-item-warning';
			updatePrjStatus(prjId, 2);
		} else if (data.color == 'red' || data.color == 'red_anime') {
			statusClass = 'list-group-item-danger';
			updatePrjStatus(prjId, 3);
		} else {
			updatePrjStatus(prjId, 0);
		}
		$('#'+jobId).removeClass("list-group-item-success list-group-item-warning list-group-item-danger").addClass(statusClass);
		$('.report.'+jobId).removeClass("list-group-item-success list-group-item-warning list-group-item-danger").addClass(statusClass);
		$('.result.'+jobId).removeClass("list-group-item-success list-group-item-warning list-group-item-danger").addClass(statusClass);
	}).error(function( jqxhr, textStatus, error ) {
		var err = textStatus + ", " + error;
		console.log( "Request Failed: " + err );
	});
}
		
function updatePrjStatus(prjId, status) {
	prjStatus = 0;
	if ($('#'+prjId).hasClass('prj-success')) {
		prjStatus = 1;
	} else if ($('#'+prjId).hasClass('prj-warning')) {
		prjStatus = 2;
	} else if ($('#'+prjId).hasClass('prj-danger')) {
		prjStatus = 3;
	}
		
	if (prjStatus < status) {
		$('#'+prjId).removeClass("prj-success prj-warning prj-danger prj-default");
		if (status == 1) {
			$('#'+prjId).addClass("prj-success");
		} else if (status == 2) {
			$('#'+prjId).addClass("prj-warning");
		} else if (status == 3) {
			$('#'+prjId).addClass("prj-danger");
		} else if (status == 0) {
			$('#'+prjId).addClass("prj-default");
		}
	}
}

function updateReportJob(jobId, jobUrl, reports) {
	$.each(reports, function(l, report) {
		$.getJSON(jobUrl + "lastCompletedBuild/" + report + 'Report/' + jsonpUrl, function(data) {
			var delta = 0;
			var nbPass = 0;
			var nbTests = 0;
			var rep;

			if (typeof(data.childReports) != 'undefined' && data.childReports.length > 0) {
				$.each(data.childReports, function(a, childReport) {
					nbPass += childReport.result.passCount;
					nbTests += childReport.result.failCount;
					$.each(childReport.result.suites, function(i, suite) {
						$.each(suite.cases, function(j, tcase) {
							if (tcase.status == 'FIXED') {
								delta += 1;
							} else if (tcase.status == 'REGRESSION') {
								delta -= 1;
							}
						});
					});
				});
				nbTests = nbTests + nbPass;
				rep = nbPass + ' / ' + nbTests ;
			} else {
				nbPass = data.passCount;
				nbTests = data.failCount;
				$.each(data.suites, function(i, suite) {
					$.each(suite.cases, function(j, tcase) {
						if (tcase.status == 'FIXED') {
							delta += 1;
						} else if (tcase.status == 'REGRESSION') {
							delta -= 1;
						}
					});
				});
				nbTests += nbPass;
				rep = nbPass + ' / ' + nbTests ;
			}

			var icon='empty32.png';
			if (delta < 0) {
				icon='lessTests.png';
			} else if (delta > 0) {
				icon='moreTests.png';
			}
			$('.report.'+jobId+'.'+report).find('span').html(rep);
			$('.report.'+jobId+'.'+report).find('img').attr("src", pageContent + '/images/' + icon);
		});
	});
}

function updateResultJob(jobId, jobUrl, results) {
	$.each(results, function(l, result) {
		$.getJSON(jobUrl + "lastCompletedBuild/" + result + 'Result/' + jsonpUrl, function(data) {
			var delta = data.numberOfNewWarnings - data.numberOfFixedWarnings;
			var count = data.numberOfLowPriorityWarnings + data.numberOfNormalPriorityWarnings + data.numberOfHighPriorityWarnings;
			var icon='empty32.png';
			if (delta < 0) {
				icon='lessWarnings.png';
			} else if (delta > 0) {
				icon='moreWarnings.png';
			}
			$('.result.'+jobId+'.'+result).find('span').html(count);
			$('.result.'+jobId+'.'+result).find('img').attr("src", pageContent + '/images/' + icon);
		});
	});
}