
npm install
```

Once, all the dependencies are installed, run the below mentioned commands in separate terminals to start the server and build webpack that allows the project to load css and js files

```sh
npm start
npm run build
```

Then, open the browser and hit the url [http://localhost:5000/](http://localhost:5000/)

## How To Use The Application

### Add Row
Click on the **Add Row** Button. New row will be added as the last row.

### Add Column
Click on the **Add Column** Button. New column will be added as the last column.

### Delete Row
Double click on any cell of the row that you want to delete. Then click on **Delete Row** Button. The row will be deleted, and all the rows below that particular row will be updated with new row numbers.

### Delete Column
Double click on any cell of the column that you want to delete. Then click on **Delete Column** Button. The column will be deleted, and all the columns after that particular column will be updated with new column names.

### Perform Arithmetic Operations (+,-,*,/,%)
Randomly add numbers to any number of cells in the row and columns. Not necessary to fill in values in the all the cells. For example, you can put in values in few cells of one particular row and few cells of one particular column.
For example, after you select a cell, you can perform an operation on either a row or a column.
Now, select a cell where you want to display the output of any arithmetic operation. Type the formulas as shown below:

> To Calculate for Rows (Type the command in bold in the cell you selected)
- ADDITION Operation: **=sum(A3,E3)** Here, (A3,E3) is the range and the values of all the cells that fall in this range will be calculated.
- SUBTRACTION Operation: **=diff(A3,E3)**
- MULTIPLICATION Operation: **=mul(A3,E3)**
- DIVISION Operation: **=div(A3,E3)**
- MODULUS Operation: **=mod(A3,E3)**

> To Calculate for Columns (Type the command in bold in the cell you selected)
- ADDITION Operation: **=sum(A3,A9)** Here, (A3,A9) is the range and the values of all the cells that fall in this range will be calculated.
- SUBTRACTION Operation: **=diff(A3,A9)**
- MULTIPLICATION Operation: **=mul(A3,A9)**
- DIVISION Operation: **=div(A3,A9)**
- MODULUS Operation: **=mod(A3,A9)**

### Export Entries To CSV File
Click on the **Export HTML Table To CSV File** Button

