import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var $:any;

@Injectable()
export class ExportTable {
  public tmpColDelim = String.fromCharCode(11) // vertical tab character
  public tmpRowDelim = String.fromCharCode(0) // null character

  // actual delimiter characters for CSV format
  public colDelim = '","'
  public rowDelim = '"\r\n"';

  constructor() {}

  exportToCSV(table?: any, filename?: string) {
    table = table || $('table');
    filename = filename || 'export.csv';

    let $headers = table.find('tr:has(th)');
    let $rows = table.find('tr:has(td)');

    // Grab text from table into CSV formatted string
    var csvContent = '"';
    csvContent += this.formatRows($headers.map(this.grabRow));
    csvContent += this.rowDelim;
    csvContent += this.formatRows($rows.map(this.grabRow)) + '"';

    var blob = new Blob([csvContent], { "type": 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob)
    { // IE 10+
      navigator.msSaveBlob(blob, filename);
    }
    else //create a link and click it
    {
      var link = document.createElement("a");
      if (link.download !== undefined) // feature detection
      {
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  formatRows(rows){
    return rows.get().join(this.tmpRowDelim)
    .split(this.tmpRowDelim).join(this.rowDelim)
    .split(this.tmpColDelim).join(this.colDelim);
  }

  // Grab and format a row from the table
  grabRow(i,row){
    var $row = $(row);
    var $cols = $row.find('td');
    if(!$cols.length) $cols = $row.find('th');

    return $cols.map(this.grabCol).get().join(this.tmpColDelim);
  }

  // Grab and format a column from the table
  grabCol(j,col){
    var $col = $(col),
    $text = $col.text().replace(/\s+/g, " ");

    return $text.replace('"', '""'); // escape double quotes
  }
}
