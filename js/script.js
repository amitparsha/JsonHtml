//getting data from json file and calling tableOeration init method to initialise JS object.
getData=()=>{
    fetch('../data/users.json')
    .then(
        function(response) {
            if (response.status != 200) {
            console.log('Looks like there was a problem. Status Code: ' +
            response.status);
        return;
        }

// Examine the text in the response
        response.json()
        .then(function(data) {
            tableOperation.init(data);
            });
        }
    )
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
        });
}

//creating IIFE(Immediately Invoked Function Expression) with closure
tableOperation = (function () {
    let newData;
    
    return {
        init:function(data){
            newData = data;
        },
        createHeader: function(){
            let table = document.getElementById("myTable"),row, nameArray;
            table.innerHTML = "";
            //craeting table first row
            table.style.border = "thin solid #000000";
            
            nameArray = ['First Name','Middle Name','Last Name','Email','Phone Number','Role','Address'];
            row = table.insertRow(0);
            row.style.border = "thin solid #000000"
            for(i=0;i<7;i++)
            {
                cell =row.insertCell(i);
                cell.innerHTML = nameArray[i];
                cell.style.padding = '5px';
                cell.style.border = "thin solid #000000";
            }
            
           return table;
            
        },
        
        edit:function(row){
            let ref = this,row_id,cancelButton,saveButton,dataArray,cells,cellsLength,i;
            row.contentEditable = "true";
            row.style.backgroundColor = "#ccffff";
            row_id = row.rowIndex;
            table = document.getElementById("myTable");
            cancelButton = table.rows[row_id].cells.item(7).firstChild;
            saveButton = table.rows[row_id].cells.item(8).firstChild;
            cancelButton.setAttribute('name','Cancel');
            cancelButton.setAttribute('value','CANCEL');
            cancelButton.style.backgroundColor = "#ff9999";
            saveButton.setAttribute('name','save');
            saveButton.setAttribute('value','SAVE');
            saveButton.style.backgroundColor = " #adebad";
            //creating clone of cells
            dataArray = new Array();
            cells = table.rows.item(row_id).cells;
            cellsLength = cells.length-2;
            
            for(i=0;i<cellsLength;i++){
                dataArray.push(cells.item(i).innerText);
            }
           
            cancelButton.onclick = function(){
                //revert the process as to change again to edit and copy the previous data to selected row
                for(i=0;i<cellsLength;i++){
                    cells.item(i).innerText = dataArray[i];
                 }
                row.contentEditable = "false";
                row.style.backgroundColor = "#ffffff";
                cancelButton.setAttribute('name','edit');
                cancelButton.setAttribute('value','EDIT');
                cancelButton.style.backgroundColor = "#ccebff";
                saveButton.setAttribute('name','DELETE');
                saveButton.setAttribute('value','DELETE');
                saveButton.style.backgroundColor = "#ff6666";
                cancelButton.onclick = function() {
                    ref.edit(row)
                }
                saveButton.onclick = function(){
                    document.getElementById("myTable").deleteRow(row.rowIndex);
                }
                
            }
            saveButton.onclick = function() {
                row.contentEditable = "false";
                row.style.backgroundColor = "#ffffff";
                cancelButton.setAttribute('name','edit');
                cancelButton.setAttribute('value','EDIT');
                saveButton.setAttribute('name','DELETE');
                saveButton.setAttribute('value','DELETE');
                cancelButton.style.backgroundColor = "#ccebff";
                saveButton.style.backgroundColor= "#ff6666";
                cancelButton.onclick = function() {
                    ref.edit(row);

                }
                saveButton.onclick = function(){
                    document.getElementById("myTable").deleteRow(row.rowIndex);
                }
            }
            
        },
        createTable:function() {
            let table,ref = this,row, cell,buttonNode,buttonNode1,nameField,i;
            table=this.createHeader();
            
            for (i=1;i<=newData.length;i++)
            {
                row = table.insertRow(i);
                row.id = i;
                nameField = Object.values(newData[i-1]);
                for(j=0;j<nameField.length;j++)
                {
                    cell = row.insertCell(j);
                    cell.innerHTML = nameField[j];
                    cell.style.padding = "5px";
                    cell.style.border = "thin solid #000000";
                }
                
                buttonNode1= document.createElement('input');
                buttonNode1.setAttribute('type','button');
                buttonNode1.setAttribute('name','EDIT');
                buttonNode1.setAttribute('value','EDIT');
                buttonNode1.style.fontWeight = "900";
                buttonNode1.style.padding = "5px";
                
                buttonNode1.style.backgroundColor = "#ccebff";
                row.insertCell(7).appendChild(buttonNode1);
                
                buttonNode= document.createElement('input');
                buttonNode.setAttribute('type','button');
                buttonNode.setAttribute('name','DELETE');
                buttonNode.setAttribute('value','DELETE');
                buttonNode.style.padding = "5px";
                buttonNode.style.backgroundColor = "#ff6666";
                buttonNode.style.fontWeight = "900";
                row.insertCell(8).appendChild(buttonNode);
                
                buttonNode1.onclick = function (){
                    ref.edit(this.parentNode.parentNode);
                }
                buttonNode.onclick = function (){
                    document.getElementById("myTable").deleteRow(this.parentNode.parentNode.rowIndex);
                }   
                
                
                
            }
                document.getElementById("btn_load").textContent = "Refresh Data"; 
                document.getElementById("btn_load").style.fontWeight = "900";
        }
    }

})();

        
           













