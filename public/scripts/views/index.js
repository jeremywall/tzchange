$(function() {
  var zones = moment.tz.names();
  var $tbody = $('<tbody/>');
  var epochMillis = Date.now();
  var rowsData = [];
  $.each(zones, function(index, zoneName) {
    var zone = moment.tz.zone(zoneName);
    var nextChangeIndex = _.sortedIndex(zone.untils, epochMillis);
    var nextChangeEpochMillis = zone.untils[nextChangeIndex];
    if (_.isFinite(nextChangeEpochMillis)) {
      rowsData.push({
        zoneName: zoneName,
        nextChangeEpochMillis: nextChangeEpochMillis
      });
    }
  });
  rowsData = _.orderBy(rowsData, ['nextChangeEpochMillis', 'zoneName'], ['asc', 'asc']);
  $.each(rowsData, function(index, rowData) {
    var $tr = $('<tr/>')
    var diffSecs = Math.floor((rowData.nextChangeEpochMillis - epochMillis) / 1000);
    var diff = {
      d: Math.floor(diffSecs / 86400),
      h: Math.floor(diffSecs % 86400 / 3600) ,
      m: Math.floor(diffSecs % 86400 % 3600 / 60),
      s: Math.floor(diffSecs % 86400 % 3600 % 60)
    };
    if (diff.d < 30) {
      $tr.addClass('danger');
    }
    $tr.append($('<td/>').text(diff.d + 'd ' + diff.h + 'h ' + diff.m + 'm ' + diff.s + 's'));
    $tr.append($('<td/>').text(rowData.zoneName));
    $tbody.append($tr);
  });

  var $thead = $('<thead/>').append(
    $('<tr/>').append($('<th/>').text('Countdown')).append($('<th/>').text('Zone'))
  );

  $('table#countdown thead').replaceWith($thead);
  $('table#countdown tbody').replaceWith($tbody);
});