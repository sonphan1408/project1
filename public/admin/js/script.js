const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                const allKeys = Array.from(url.searchParams.keys());
                allKeys.forEach(item => {
                    url.searchParams.delete(item);
                })
                url.searchParams.set("status", status);
            } else {
                const allKeys = Array.from(url.searchParams.keys());
                allKeys.forEach(item => {
                    url.searchParams.delete(item);
                })
                // url.searchParams.delete("status");
            }
            window.location.href = url.href;
        })
    })

}
// searchform
const searchForm = document.querySelector("#form-search");
if (searchForm > 0) {

    let url = new URL(window.location.href)
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const keyword = e.target.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);


        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;

    })
}
// pagination 

const buttonPages = document.querySelectorAll("[button-page]");

if (buttonPages.length > 0) {
    let url = new URL(window.location.href)
    buttonPages.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-page");
            if (page) {
                url.searchParams.set("page", page);
            } else {
                url.searchParams.set("page", 1);
            }
            window.location.href = url.href;



        }

        )




    })
}

// end pagination 
// checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name = 'checkall']");
    const inputCheckId = checkboxMulti.querySelectorAll("input[name = 'id']");

    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputCheckId.forEach(input => {
                input.checked = true;
            })
        } else {
            inputCheckId.forEach(input => {
                input.checked = false;
            })
        }
    })

    inputCheckId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked").length;
            if (countChecked == inputCheckId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })


}
// end checkbox-multi


//form-multi
const formMulti = document.querySelector("[form-change-multi]");

if (formMulti) {
    formMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const typeChange = e.target.type.value;
        if (typeChange == "deleteAll") {
            const isconfirm = confirm("Ban co muon xoa khong");
            if (!isconfirm) {
                return;
            }
        }


        let ids = [];

        const inputIds = formMulti.querySelector("input[name = 'ids']");

        const inputChecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked");

        if (inputChecked.length > 0) {

            inputChecked.forEach(input => {

                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name = 'position']").value;
                    ids.push(`${input.value}-${position}`);
                    console.log(`${input.value}-${position}`);



                } else {
                    ids.push(input.value);
                }



            })

            inputIds.value = ids.join(",");

            formMulti.submit();

        } else {
            alert("Vui long chon it nhat mot san pham");
        }

    })
}
//end form-multi


//Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = showAlert.getAttribute("data-time");
    setTimeout(() => {

        showAlert.classList.add("alert-hidden");
    }, time);
}
const closeAlert = document.querySelector("[close-alert]");
if (closeAlert) {
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}


// End Show Alert

// image-preview
const imageForm = document.querySelector("[image-form]");
if (imageForm) {
    const imageInput = imageForm.querySelector("[image-input]");
    const imagePreview = imageForm.querySelector(".image-preview");
    console.log(imagePreview);
    imageForm.addEventListener("change", (e) => {
        const file = e.target.files[0];

        imagePreview.src = URL.createObjectURL(file);
    })
}
// end image-preview

// Sort
const boxSort = document.querySelector("[sort]");
let url = new URL(window.location.href);
if (boxSort) {
    const boxSelect = boxSort.querySelector("[name = 'sort']");
    if (boxSelect) {
        boxSelect.addEventListener("change", (e) => {
            const value = e.target.value;

            let [sortTitle, sortKey] = value.split("-");
            console.log(sortTitle);
            console.log(sortKey);

            url.searchParams.set("sortTitle", sortTitle);
            url.searchParams.set("sortKey", sortKey);
            window.location.href = url.href;



        })
    }

}

//Clear
const buttonClear = boxSort.querySelector("[sort-clear]");
const boxSelect = boxSort.querySelector("[name = 'sort']");
console.log(buttonClear);
if (buttonClear) {
    buttonClear.addEventListener("click", () => {
        url.searchParams.delete("sortTitle");
        url.searchParams.delete("sortKey");
        window.location.href = url.href;


    })
}


//End Clear

if (url.searchParams.has("sortTitle") && url.searchParams.has("sortKey")) {
    let sortTitle = url.searchParams.get("sortTitle");
    let sortKey = url.searchParams.get("sortKey");
    let sort = `${sortTitle}-${sortKey}`;
    const option = boxSelect.querySelector(`[value = "${sort}"]`);
    console.log(option);
    if (option) {
        option.selected = true;
    }
}


// End Sort