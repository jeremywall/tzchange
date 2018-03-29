$(function() {
  var zones = moment.tz.names();
  var $tbody = $('<tbody/>');
  var nowMoment = moment();
  var rowsData = [];
  $.each(zones, function(index, zoneName) {
    var zone = moment.tz.zone(zoneName);
    var nextChangeIndex = _.sortedIndex(zone.untils, nowMoment.valueOf());
    var nextChangeEpochMillis = zone.untils[nextChangeIndex];
    if (_.isFinite(nextChangeEpochMillis)) {
      rowsData.push({
        zone: zone,
        nextChangeIndex: nextChangeIndex
      });
    }
  });
  rowsData = _.orderBy(rowsData, [function(rowData) { return rowData.zone.untils[rowData.nextChangeIndex]; }, 'zone.name'], ['asc', 'asc']);
  $.each(rowsData, function(index, rowData) {
    var nextChangeEpochMillis = rowData.zone.untils[rowData.nextChangeIndex];
    var nextChangeDiffSecs = Math.floor((nextChangeEpochMillis - nowMoment.valueOf()) / 1000);
    var nextChangeDiff = {
      d: Math.floor(nextChangeDiffSecs / 86400),
      h: Math.floor(nextChangeDiffSecs % 86400 / 3600) ,
      m: Math.floor(nextChangeDiffSecs % 86400 % 3600 / 60),
      s: Math.floor(nextChangeDiffSecs % 86400 % 3600 % 60)
    };
    var currOffsetMins = -1 * rowData.zone.offset(nowMoment.valueOf());
    var currOffset = {
      p: (currOffsetMins < 0) ? '-' : '+',
      h: Math.floor(Math.abs(currOffsetMins) / 60),
      m: Math.floor(Math.abs(currOffsetMins) % 60)
    };
    var nextOffsetMins = -1 * rowData.zone.offset(nextChangeEpochMillis);
    var nextOffset = {
      p: (nextOffsetMins < 0) ? '-' : '+',
      h: Math.floor(Math.abs(nextOffsetMins) / 60),
      m: Math.floor(Math.abs(nextOffsetMins) % 60)
    };
    var $tr = $('<tr/>')
    if (nextChangeDiff.d < 30) {
      $tr.addClass('danger');
    }
    $tr.append($('<td/>').text(nextChangeDiff.d + 'd ' + nextChangeDiff.h + 'h ' + nextChangeDiff.m + 'm ' + nextChangeDiff.s + 's '));
    $tr.append($('<td/>').text(nextChangeEpochMillis));
    $tr.append($('<td/>').text(rowData.zone.name));
    $tr.append($('<td/>').text('UTC' + currOffset.p + _.padStart(currOffset.h, 2, '0') + _.padStart(currOffset.m, 2, '0')));
    $tr.append($('<td/>').text('UTC' + nextOffset.p + _.padStart(nextOffset.h, 2, '0') + _.padStart(currOffset.m, 2, '0')));
    $tbody.append($tr);
  });

  var $thead = $('<thead/>').append(
    $('<tr/>')
      .append($('<th/>').text('Countdown'))
      .append($('<th/>').text('UTC Time of Change'))
      .append($('<th/>').text('Zone'))
      .append($('<th/>').text('Offset Before'))
      .append($('<th/>').text('Offset After'))
  );

  $('span#tz-data-version').text(moment.tz.dataVersion);
  $('table#countdown thead').replaceWith($thead);
  $('table#countdown tbody').replaceWith($tbody);
});
