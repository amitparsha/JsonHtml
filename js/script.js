//getting data from json file and calling tableOeration init method to initialise JS object.
getData=()=>{
  let xhr = new XMLHttpRequest();
  let data;
  xhr.open('GET','../data/users.json');
  xhr.overrideMimeType("application/json");
  //calling init method of tableOperation to get data after loading
    xhr.onload = function(){
        data = this.responseText;
        data = JSON.parse(data);
        tableOperation.init(data);
    }
xhr.send();
}

//creating IIFE(Immediately Invoked Function Expression) with closure
tableOperation = (function () {
    let new_data;
    
    return {
        init:function(data){
            new_data = data;
        },
        createHeader: function(){
            let table = document.getElementById("myTable"),row,celli,nameArray;
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
            let ref = this,row_id,cancelButton,saveButton,dataArray,cells,cells_length,i;
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
            //craeting clone of cells
            dataArray = new Array();
            cells = table.rows.item(row_id).cells;
            cells_length = cells.length-2;
            
            for(i=0;i<cells_length;i++){
                dataArray.push(cells.item(i).innerText);
            }
           
            cancelButton.onclick = function(){
                //revert the process as to change again to edit and copy the previous data to selected row
                for(i=0;i<cells_length;i++){
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
                    ref.edit(row);

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
            let table,ref = this,row, cell,buttonnode,buttonnode1,nameField,i;
            table=this.createHeader();
            
            for (i=1;i<=new_data.length;i++)
            {
                row = table.insertRow(i);
                row.id = i;
                nameField = Object.values(new_data[i-1]);
                for(j=0;j<nameField.length;j++)
                {
                    cell = row.insertCell(j);
                    cell.innerHTML = nameField[j];
                    cell.style.padding = "5px";
                    cell.style.border = "thin solid #000000";
   
                }
                
                buttonnode1= document.createElement('input');
                buttonnode1.setAttribute('type','button');
                buttonnode1.setAttribute('name','EDIT');
                buttonnode1.setAttribute('value','EDIT');
                buttonnode1.style.fontWeight = "900";
                buttonnode1.style.padding = "5px";
                
                buttonnode1.style.backgroundColor = "#ccebff";
                row.insertCell(7).appendChild(buttonnode1);
                
                buttonnode= document.createElement('input');
                buttonnode.setAttribute('type','button');
                buttonnode.setAttribute('name','DELETE');
                buttonnode.setAttribute('value','DELETE');
                buttonnode.style.padding = "5px";
                buttonnode.style.backgroundColor = "#ff6666";
                buttonnode.style.fontWeight = "900";
                row.insertCell(8).appendChild(buttonnode);
                
                buttonnode1.onclick = function (){
                    ref.edit(this.parentNode.parentNode);
                }
                buttonnode.onclick = function (){
                    document.getElementById("myTable").deleteRow(this.parentNode.parentNode.rowIndex);
                }   
                
                
                
            }
                document.getElementById("btn_load").textContent = "Refresh Data"; 
                document.getElementById("btn_load").style.fontWeight = "900";
        }
    }

})();

        
           













    