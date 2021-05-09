// Importing css
import '../css/style.css';
// Importing from different js file
import {
    addRow,
    addCol,
    delRow,
    delCol,

    exportToCSV
} from './dom-loader.js';
var isMouseDown, isHighlighted;
// Declaring number of rows and cols to be displayed on page load
var defrows = 8,
    defcolumns = 11;
var rowName = "A1",columnName = "1";
// Function to be called on page load 
var init = (event) => {

    loadTable(event);
    // Calculate height
    let windowHeight = window.innerHeight;
    let headerHeight = document.getElementById('header').clientHeight;
    let footerHeight = document.getElementById('footer').clientHeight;
    // Append total height to the window screen
    let totalHeight = windowHeight - headerHeight - footerHeight;
    document.getElementById("mainContent").setAttribute('style', 'min-height: ' + totalHeight + 'px');
}

window.onload = function (event) {
    init(event);
};
// Loads the Default Table on Page Load
var loadTable = (event) => {
    let tablearea = document.getElementById('table');
    let table = document.createElement('table');
    // Assign id to table
    table.setAttribute("id", "tableId");
    let tbody = document.createElement('tbody');
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let strCol = ["waiting","10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"];

    // Load for rows
    for (let i = 0; i <= defrows; i++) {
        let tr = document.createElement('tr');
        // Assign id to row
        tr.setAttribute("id", "tr_" + i);
        if (i > 0) {
            // Load for columns
            for (let j = 0; j <= defcolumns; j++) {
                let td = document.createElement('td');

                // td.addEventListener('mousedown', function () {
                //     if (event.isTrusted) {
                //         isMouseDown = true;
                //         td.classList.toggle("selected");
                //         isHighlighted = td.classList.contains("selected");
                //         if(td.classList.contains("formula") || td.classList.contains("highlight")) {
                //             td.classList.remove("selected");
                //         }
                //         return false;
                //     }
                // });

                // td.addEventListener('mouseover', function () {
                //     if (event.isTrusted) {
                //         if (isMouseDown) {
                //             td.classList.toggle("selected", isHighlighted);
                //         }
                //     }
                // });
                
                
                if (j > 0) {
                    eventHandlersTd(td, event);
                    // Makes all the cells except the first cell as an input
                    let x = document.createElement("INPUT");
                    x.setAttribute("type", "text");
                    x.addEventListener('input', function (evt) {
                        getRowsId(this.value);
                    });
                    td.appendChild(x);
                    // Assign id to cell
                    td.setAttribute("id", str.charAt(j - 1) + i);
                } else {
                    
                    // Adds numbers in the first column of each row
                    // td.addEventListener('dblclick', function (event) {
                    //     if (event.isTrusted) {
                    //         // td.classList.remove("selected");
                    //         td.classList.toggle("highlight");
                    //         removeRow(event);
                    //         // if(td.classList.contains("formula")) {
                    //         //     td.classList.remove("highlight");
                    //         // };
                    //     }
                    // });
                    let x = document.createTextNode(i);
                    td.appendChild(x);
               
                }
                tr.appendChild(td);
            }
        } else {
            for (let j = 0; j <= defcolumns; j++) {
                let th = document.createElement('th');
                if (j > 0) {
                    // th.addEventListener('dblclick', function (event) {
                    //     if (event.isTrusted) {
                    //         // td.classList.remove("selected");
                    //         th.classList.toggle("highlight");
                    //         if(th.getAttribute("id") != "-1"){
                    //             removeCol(event); 
                    //         }
                    //         // if(td.classList.contains("formula")) {
                    //         //     td.classList.remove("highlight");
                    //         // };
                    //     }
                    // });
                    // Adds alphabets as the nam5e of the columns
                    let x = document.createElement("INPUT");
                    x.setAttribute("type", "text");
                    x.value = strCol[j-1];
                    th.appendChild(x);
                } else {
                    // First column of first row is made empty
                    
                    let x = document.createTextNode("");
                    th.setAttribute("id", "-1")
                    th.appendChild(x);
                }
                tr.appendChild(th);
            }
        }
        tbody.appendChild(tr);
        table.appendChild(tbody);
    }
    tablearea.appendChild(table);
}

// Buttons used on the index page
addRow.addEventListener('click', insertRow);
addCol.addEventListener('click', insertColumn);
delRow.addEventListener('click', removeRow);
delCol.addEventListener('click', removeCol);


exportToCSV.addEventListener('click',exportTableToCSV);

document.onmouseup = myMouseUpHandler;

function myMouseUpHandler() {
    isMouseDown = false;
}

var eventHandlersTd = (td, event) => {
    //Double Click to select Cells to Delete
    td.addEventListener('dblclick', function (event) {
        if (event.isTrusted) {
            // td.classList.remove("selected");
            td.classList.toggle("highlight");
            // if(td.classList.contains("formula")) {
            //     td.classList.remove("highlight");
            // };
        }
    });
    //On Change of Event To Check for Arithmatic Operations
    
}

//Function to Insert a Column
function insertColumn(event) {
    if (event.isTrusted) {
        let tablearea = document.getElementById('table');
        let tr = document.getElementsByTagName('tr');
        let length = tr.length;
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // Login to insert column in each row
        for (let i = 0; i < length; i++) {
            if (i > 0) {
                let td = tr[i].insertCell();

                // td.addEventListener('mousedown', function () {
                //     if (event.isTrusted) {
                //         isMouseDown = true;
                //         td.classList.toggle("selected");
                //         isHighlighted = td.classList.contains("selected");
                //         if(td.classList.contains("formula") || td.classList.contains("highlight")) {
                //             td.classList.remove("selected");
                //         }
                //         return false;
                //     }
                // });

                // td.addEventListener('mouseover', function () {
                //     if (event.isTrusted) {
                //         if (isMouseDown) {
                //             td.classList.toggle("selected", isHighlighted);
                //         }
                //     }
                // });
        
                eventHandlersTd(td);
                // Make cell as an input element
                let x = document.createElement("INPUT");
                x.setAttribute("type", "text");
                td.appendChild(x);
                // Assign id to cell
                td.setAttribute("id", str.charAt(tr[0].cells.length - 2) + i);
            } else {
                displayColumnName(tr[i])
            }
        }
    }
}
function displayColumnName(cell) {
    columnName = prompt("enter Column Name");
   if (columnName != null) {
            let th = document.createElement("th");
            // Columns in first row will be assigned by a letter
            let x = document.createTextNode(columnName);
            th.appendChild(x);
            cell.appendChild(th);
            cell.setAttribute("id",columnName)
 }
}

//Function to Insert Row
function insertRow(event) {
    if (event.isTrusted) {
        let table = document.getElementById('tableId');
        let rowCount = table.rows.length;
        let row = table.insertRow(rowCount);
        // Assign id to row
        row.setAttribute("id", "tr_" + rowCount);
        // Add cells in each newly added row
        for (let i = 0; i < table.rows[0].cells.length; i++) {
            createCell(row.insertCell(i), i, rowCount);
        }
    }
}
//Insert the cells
function createCell(cell, count, rowCount) {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // If its not the first column, make cell as an input type
    if (count > 0) {
        let x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        cell.appendChild(x);
        // Assign id to each cell
        
        cell.setAttribute("id", str.charAt(count - 1) + rowCount);
    } else {
        // If first cell of the row, assign the number as the position of the row
        displayRowName(cell)

    }
    

    // cell.addEventListener('mousedown', function () {
    //     if (event.isTrusted) {
    //         isMouseDown = true;
    //         cell.classList.toggle("selected");
    //         isHighlighted = cell.classList.contains("selected");
    //         if(td.classList.contains("formula") || td.classList.contains("highlight")) {
    //             td.classList.remove("selected");
    //         }
    //         return false;
    //     }
    // });

    // cell.addEventListener('mouseover', function () {
    //     if (event.isTrusted) {
    //         if (isMouseDown) {
    //             cell.classList.toggle("selected", isHighlighted);
    //         }
    //     }
    // });

    eventHandlersTd(cell);
}
function displayRowName(cell) {
    rowName = prompt("enter Row Name");
   if (rowName != null) {
    // cell.addEventListener('dblclick', function (event) {
    //     if (event.isTrusted) {
    //         // td.classList.remove("selected");
    //         cell.classList.toggle("highlight");
    //         removeRow(event);
    //         // if(td.classList.contains("formula")) {
    //         //     td.classList.remove("highlight");
    //         // };
    //     }
    // });
       let x = document.createTextNode(rowName);
       cell.appendChild(x);
       cell.setAttribute("id",rowName)
 }
}
//Deletes the Row and Updates the Table with Headers and Cells Ids
function removeRow(event) {
    if (event.isTrusted) {
        let table = document.getElementById('tableId');
        let selectedCells = document.getElementsByClassName("highlight");
        // Check if the row is selected
        if (selectedCells.length > 0) {
            let r = selectedCells[0].parentNode.id;
            // Get the row id
            let s = r.split("_");
            table.deleteRow(s[1]);

            // let l = parseInt(s[1]);
            // // Update the text of the first cell of each row
            // for (let i = l + 1; i <= table.rows.length; i++) {
            //     //console.log("Rows length"+ table.rows.length);
            //     let rw = document.getElementById("tr_" + i);
            //     rw.setAttribute("id", "tr_" + (i - 1));
            //     //for(let j = 0; j <= table.rows.length; j++){
            //     let cells = rw.getElementsByTagName("td");
            //     cells[0].innerText = i - 1;
            //     //defrows--;
            //     //console.log(cells[1].id);
            //     // Update the id of each cells
            //     for (let j = 1; j < cells.length; j++) {
            //         let ind = cells[j].id;
            //         // console.log(ind);
            //         let alpha = ind.split("");
            //         let regex = /[+-]?\d+(?:\.\d+)?/g;
                    
            //         let match = regex.exec(ind);
                   
            //         let new_id = alpha[0] + (match[0] - 1);


            //         cells[j].setAttribute("id", new_id);

            //     }
            // }
            // This function is called when cells are updated
        // If row not selected
        } else {
            document.getElementById("result").style.display = "block";
            document.getElementById("result").style.color = "red";
            document.getElementById("result").innerHTML = "Please select the cell first";
            setTimeout(function () {
                document.getElementById("result").style.display = "none";
            }, 3500);
        }
    }
}
//Deletes the Columns and Updates the Headers and Cell Ids
function removeCol(event) {
    if (event.isTrusted) {
        let table = document.getElementById('tableId');
        let selectedCells = document.getElementsByClassName("highlight");
        // Check if column is selected
        if (selectedCells.length > 0) {
            let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let col = selectedCells[0].id;
            let colInd = col.split("");
            let ind = str.indexOf(colInd[0]);
            let rowsDom = document.getElementsByTagName("tr");
            // Delete the particular column position from all the rows
            for (let i = 0; i < table.rows.length; i++) {
                rowsDom[i].deleteCell(ind + 1);
                if (i > 0) {
                    let colDom = rowsDom[i].getElementsByTagName("td");
                    // Assign id to all the cells
                    for (let m = ind + 1; m < colDom.length; m++) {
                        let indexCol = colDom[m].id;
                        let alpha = indexCol.split("");
                        let regex = /[+-]?\d+(?:\.\d+)?/g;
                        let match = regex.exec(indexCol);
                        regex.leftIndex = 0;
                        let new_id = str[m - 1] + (match[0]);
                        colDom[m].setAttribute("id", new_id);
                    }
                }
            }
            // Reassign the letter as the name to the header of the table
            // let head = document.getElementsByTagName("th");
            // for (let j = ind + 1; j < head.length; j++) {
            //     head[j].innerText = str[j - 1];
            // }
            // // This function is called when cells are updated            
            // updateOperation();
        // If column not selected 
        } else {
            document.getElementById("result").style.display = "block";
            document.getElementById("result").style.color = "red";
            document.getElementById("result").innerHTML = "Please select the cell first";
            setTimeout(function () {
                document.getElementById("result").style.display = "none";
            }, 3500);
        }
    }
}


//Export to CSV Functions
function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], {
        type: "text/csv"
    });
    if (navigator.msSaveBlob) {    
        navigator.msSaveBlob(csvFile, filename);
    } else {

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    }
}
//Export CSV Main Function
function exportTableToCSV(event) {
    if (event.isTrusted) {
        let filename = 'spreadsheet.csv';
        let csv = [];
        let rows = document.querySelectorAll("table tr");

        for (let i = 0; i < rows.length; i++) {
            let row = [];
            if (i > 0) {
                let cols = rows[i].querySelectorAll("td");
                for (let j = 0; j <= cols.length; j++) {
                    if (j > 0) {
                        cols = rows[i].querySelectorAll("td input");
                        row.push(cols[j - 1].value);
                    } else {
                        row.push(cols[j].innerText);
                    }
                }
            } else {
                let cols = rows[i].querySelectorAll("th");
                for (let j = 0; j < cols.length; j++) {
                    row.push(cols[j].innerText);
                }
            }
            csv.push(row.join(","));
        }

        // Download CSV file
        downloadCSV(csv.join("\n"), filename);
    }
}

//get rows id
function getRowsId(names) {
    var input = names.split(',');

        let rows = document.querySelectorAll("table tr");
        let row = [];
        for (let i = 0; i < rows.length; i++) {
            
            if (i > 0) {
                let cols = rows[i].querySelectorAll("td");
                for (let j = 0; j <= cols.length; j++) {
                    if (j > 0) {
                        // cols = rows[i].querySelectorAll("td input");
                        // row.push(cols[j - 1].value);
                    } else {
                        row.push(cols[j].innerText);
                    }
                }
            }
            // csv.push(row.join(","));
            

        }
        console.log(row)
        var input = names.split(',');
        document.getElementById("result").innerHTML  = ""
            for(let i = 0;i<row.length;i++){
                if(input.includes(row[i])){
                    document.getElementById("result").innerHTML += "<span style='color: red;'>"+ row[i]+",</span>"
                }
                else{
                    document.getElementById("result").innerHTML +=  "<span style='color: black;'>"+ row[i]+",</span>" 
                }
            }
           
}

