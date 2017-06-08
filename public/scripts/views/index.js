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
    var diff = Math.floor((rowData.nextChangeEpochMillis - epochMillis) / 1000);
    $tr.append($('<td/>').text(
      Math.floor(diff / 86400) + 'd ' +
      Math.floor(diff % 86400 / 3600) + 'h ' +
      Math.floor(diff % 86400 % 3600 / 60) + 'm ' +
      Math.floor(diff % 86400 % 3600 % 60) + 's'
    ));
    $tr.append($('<td/>').text(rowData.zoneName));
    $tbody.append($tr);
  });
  $('table#countdown tbody').replaceWith($tbody);
});