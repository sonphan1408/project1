


// Permission
const tablePermission = document.querySelector("[table-permissions]");
// console.log(tablePermission);

if(tablePermission){
   
    const rows = tablePermission.querySelectorAll("[data-name]");
    const submitButton = document.querySelector("[button-submit]");
    submitButton.addEventListener("click",()=>{
        const permission = [];
        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            if(name == "id"){
                
                // console.log(inputs);
                inputs.forEach(item => {
                    const id = item.value;
                    permission.push({
                        id: id,
                        permissions: []
                    })
                    // console.log(permission);
            })
            }else{
                inputs.forEach((item , index) => {
                    if(item.checked){
                        // console.log(item);
                        permission[index].permissions.push(name);
                    }
                })

            }
          

        })
        
    const formPermission = document.querySelector("#form-change-permissions");
    if(formPermission){
        const inputPermisson = formPermission.querySelector("input[name ='permissions']");
        const data = JSON.stringify(permission);
        console.log(data);
        inputPermisson.value = data;
        formPermission.submit();
    }
    })
   

}

// End permission

// Add data permission
const dataPermissions = document.querySelector("[data-permissions]");
console.log(dataPermissions);
if(dataPermissions){
    const data = dataPermissions.getAttribute("data-permissions");
    // console.log(data);
    const defaultData = JSON.parse(data);
    const rows = tablePermission.querySelectorAll("[data-name]");
    console.log(defaultData )
    if(defaultData.length > 0){
        defaultData.forEach((item,index) => {
            const permissions = item.permissions;
            console.log(permissions);
            rows.forEach(row => {
                const name = row.getAttribute("data-name");
                permissions.forEach(permission => {
                    if(name == permission){
                        const inputs = row.querySelectorAll("input");
                        inputs[index].checked = true;
                    }
                })
            })

        } )
    }
  

}


// End add data permission