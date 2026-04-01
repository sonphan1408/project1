/// change-status
    const buttonChange = document.querySelectorAll("[button-change-status]");
    
    if(buttonChange.length > 0){
        const formChangeStatus = document.querySelector("#form-change-status");
        const path = formChangeStatus.getAttribute("data-path");
        buttonChange.forEach(button =>{
            button.addEventListener("click",() =>{
                const statusCurrent = button.getAttribute("data-status");
                const id = button.getAttribute("data-id");
                let statusChange = statusCurrent == "active" ? "inactive" :"active";
                const action = path + `/${statusChange}/${id}?_method=PATCH`;
                formChangeStatus.action = action;
                formChangeStatus.submit(); 

            })
        })  
    }

// end change-status

// delete-item
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length >0){
    buttonDelete.forEach(button => {
        button.addEventListener("click",()=>{
            const confirmDelete = confirm("Ban co muon xoa san pham nay dung khong")
            if(!confirmDelete){
                return;
            }else{
                const formDelete = document.querySelector("#form-delete");
                const id = button.getAttribute("data-id");
                const path = formDelete.getAttribute("data-path");
                const action = path + `/${id}?_method=DELETE`;
                formDelete.action = action;
                formDelete.submit();
    
            }
            

        })
    })
}




//end delete-item
