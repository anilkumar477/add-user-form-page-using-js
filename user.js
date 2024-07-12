let nameInputEl = document.getElementById("nameInput");
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailInputEl = document.getElementById("emailInput");
let emailErrMsgEl = document.getElementById("emailErrMsg");

let workingstatus = document.getElementById("status");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");

let addUserFormEl = document.getElementById("addUserForm");


let formData = {
    name:"",
    email:"",
    status:"Active",
    gender:"Male"
};

nameInputEl.addEventListener("blur",function(event){
    if(event.target.value === ""){
        nameErrMsgEl.textContent = "*Required";
    }else{
        nameErrMsgEl.textContent = "";
    }
    formData.name = event.target.value;
});

emailInputEl.addEventListener("blur",function(event){
    if(event.target.value === ""){
        emailErrMsgEl.textContent = "*Required";
    }else{
        emailErrMsgEl.textContent = "";
    }
    formData.email = event.target.value;
});

workingstatus.addEventListener("change",function(event){
    formData.status = event.target.value;
});

genderMaleEl.addEventListener("change",function(event){
    formData.gender = event.target.value;
});

genderFemaleEl.addEventListener("change",function(event){
    formData.gender = event.target.value;
});


function validateFormData(formData){
    let{name,email} = formData;

    if(name === ""){
        nameErrMsgEl.textContent = "*Required";
    }
    if(email === ""){
        emailErrMsgEl.textContent = "*Required";
    };
}


function submitValidateForm(formData){
    let url = "https://gorest.co.in/public-api/users";

    let options={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Access:"application/json",
            Authorization:"Bearer 00f3f8fde06120db02b587cc372c3d85510896e899b45774068bb750462acd9f"
        },
        body:JSON.stringify(formData)
    }

    fetch(url,options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        console.log(jsonData);

        if(jsonData.code === 402){
            if(jsonData.data[0].message === "has already been taken"){
                emailErrMsgEl.textContent = "Email Already Exists";
            }
        }
    })

};


addUserFormEl.addEventListener("submit",function(event){
    event.preventDefault();
    validateFormData(formData);
    submitValidateForm(formData)
})  